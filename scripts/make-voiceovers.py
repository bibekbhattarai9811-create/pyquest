"""
Turn every module-intro script in video-scripts/*.txt into an MP3 voiceover,
for free, using Microsoft Edge's neural voices via the `edge-tts` package.

    pip install edge-tts
    python scripts/make-voiceovers.py

Output: video-scripts/audio/01-....mp3 ... 12-....mp3

Change VOICE / RATE below. Some good English voices:
    en-US-GuyNeural      (warm male, US)
    en-US-AriaNeural     (clear female, US)
    en-US-JennyNeural    (friendly female, US)
    en-GB-RyanNeural     (male, UK)
    en-GB-SoniaNeural    (female, UK)
Full list:  edge-tts --list-voices
"""
import asyncio
import glob
import os

import edge_tts

VOICE = "en-US-GuyNeural"
RATE = "-4%"  # slightly slower than default; use "+0%" for normal

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "..", "video-scripts")
OUT = os.path.join(SRC, "audio")


async def main() -> None:
    os.makedirs(OUT, exist_ok=True)
    scripts = sorted(glob.glob(os.path.join(SRC, "*.txt")))
    if not scripts:
        print("No .txt scripts found in video-scripts/")
        return

    for path in scripts:
        name = os.path.splitext(os.path.basename(path))[0]
        text = open(path, encoding="utf-8").read().strip()
        if not text:
            continue
        out_path = os.path.join(OUT, f"{name}.mp3")
        print(f"  {name}  ->  {os.path.relpath(out_path, os.path.join(HERE, '..'))}")
        await edge_tts.Communicate(text, VOICE, rate=RATE).save(out_path)

    print(f"\nDone. {len(scripts)} file(s) in video-scripts/audio/")


if __name__ == "__main__":
    asyncio.run(main())
