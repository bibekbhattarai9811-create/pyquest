/* PyQuest — Python runner (Web Worker)
 *
 * Loads Pyodide (CPython compiled to WebAssembly) from the jsDelivr CDN and
 * runs learner code off the main thread, so a bad loop never freezes the page.
 *
 * Message in  : { type: "run", id, code, check }
 * Messages out: { type: "booting" }
 *               { type: "ready" }
 *               { type: "result", id, stdout, error, checkPassed }
 */

/* global loadPyodide */

const PYODIDE_VERSION = "0.29.4";
const INDEX_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

importScripts(INDEX_URL + "pyodide.js");

let pyodidePromise = null;
const outputBuffer = { text: "" };

async function boot() {
  const pyodide = await loadPyodide({ indexURL: INDEX_URL });
  pyodide.setStdout({ batched: (s) => (outputBuffer.text += s + "\n") });
  pyodide.setStderr({ batched: (s) => (outputBuffer.text += s + "\n") });
  return pyodide;
}

function normalize(value) {
  return String(value)
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\s+$/g, "")
    .replace(/^\s+/g, "");
}

function formatError(err) {
  const message = String(err && err.message ? err.message : err);
  const lines = message.split("\n");
  const header = "Traceback (most recent call last):";
  const start = lines.findIndex((l) => l.includes(header));
  if (start === -1) return message.trim();

  // Pyodide wraps execution in its own frames (_pyodide/_base.py, CodeRunner,
  // eval, compile...). Keep only from the first frame in the learner's code.
  const execAt = lines.findIndex((l, i) => i > start && l.includes('File "<exec>"'));
  const kept =
    execAt === -1
      ? [header, ...lines.slice(start + 1)]
      : [header, ...lines.slice(execAt)];
  return kept.join("\n").replace(/"<exec>"/g, '"main.py"').trim();
}

self.onmessage = async (event) => {
  const msg = event.data;
  if (!msg || msg.type !== "run") return;
  const { id, code, check } = msg;

  if (!pyodidePromise) {
    self.postMessage({ type: "booting" });
    pyodidePromise = boot();
  }

  let pyodide;
  try {
    pyodide = await pyodidePromise;
  } catch (err) {
    pyodidePromise = null;
    self.postMessage({
      type: "result",
      id,
      stdout: "",
      error: "Could not load Python. Check your internet connection and try again.\n" + String(err),
      checkPassed: check ? false : null,
    });
    return;
  }

  self.postMessage({ type: "ready" });

  outputBuffer.text = "";
  let error = null;
  let checkPassed = check ? false : null;

  const namespace = pyodide.toPy({});
  try {
    await pyodide.runPythonAsync(code || "", { globals: namespace });

    if (!error && check) {
      if (check.kind === "output") {
        checkPassed = normalize(outputBuffer.text) === normalize(check.expected);
      } else if (check.kind === "test") {
        try {
          await pyodide.runPythonAsync(check.code, { globals: namespace });
          checkPassed = true;
        } catch {
          checkPassed = false;
        }
      }
    }
  } catch (err) {
    error = formatError(err);
    checkPassed = check ? false : null;
  } finally {
    try {
      namespace.destroy();
    } catch {
      /* ignore */
    }
  }

  self.postMessage({ type: "result", id, stdout: outputBuffer.text, error, checkPassed });
};
