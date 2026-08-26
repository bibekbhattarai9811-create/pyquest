"use client";

import { useMemo, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView, keymap } from "@codemirror/view";
import { Prec } from "@codemirror/state";

const editorTheme = EditorView.theme({
  "&": { fontSize: "13.5px", backgroundColor: "transparent" },
  ".cm-gutters": { backgroundColor: "transparent", borderRight: "1px solid #2a3352" },
  ".cm-content": { fontFamily: "var(--font-mono)" },
  "&.cm-focused": { outline: "none" },
});

export default function CodeEditor({
  value,
  onChange,
  onRun,
  readOnly = false,
}: {
  value: string;
  onChange?: (value: string) => void;
  /** Fired on Ctrl/Cmd + Enter */
  onRun?: () => void;
  readOnly?: boolean;
}) {
  const onRunRef = useRef(onRun);
  onRunRef.current = onRun;

  const extensions = useMemo(
    () => [
      python(),
      editorTheme,
      EditorView.lineWrapping,
      Prec.highest(
        keymap.of([
          {
            key: "Mod-Enter",
            preventDefault: true,
            run: () => {
              onRunRef.current?.();
              return true;
            },
          },
        ]),
      ),
    ],
    [],
  );

  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      theme={oneDark}
      readOnly={readOnly}
      extensions={extensions}
      basicSetup={{
        lineNumbers: true,
        highlightActiveLine: !readOnly,
        highlightActiveLineGutter: !readOnly,
        foldGutter: false,
        indentOnInput: true,
      }}
      style={{ minHeight: "16rem" }}
    />
  );
}
