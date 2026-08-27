# Module intro video scripts

One `.txt` per module of the Python Basics track, numbered to match the module
order. Each is ~1 minute when read aloud.

## Making the videos (100% free)

### 1. Voiceover

**Fastest, no install** — [ttsmaker.com](https://ttsmaker.com): paste a script,
pick an English voice, Convert, Download the MP3. (Free, commercial use allowed.)

**Better quality, one command** (needs Python):

```bash
pip install edge-tts
python scripts/make-voiceovers.py
```

Writes `video-scripts/audio/01-....mp3` … `12-....mp3` using Microsoft Edge's
neural voices. Edit `VOICE` / `RATE` at the top of that script.

### 2. Slides + video — [Canva](https://canva.com) (free)

1. Create a design → **Video** (1920×1080).
2. 3–4 slides per module: a title, then slides with a code example.
   Nice code images: paste code into [ray.so](https://ray.so) → download PNG →
   drop on a slide.
3. **Uploads → Upload** the module's MP3, drag it onto the timeline.
4. Stretch the slides so the total length matches the audio.
5. **Share → Download → MP4 Video** (free, 1080p, no watermark).

*(Or use Clipchamp — built into Windows 11 — the same way.)*

### 3. Host + wire up

- Upload the MP4 to YouTube, set **Unlisted**, copy the link.
- In `src/lib/tracks/python-basics.ts`, set the module's `video:` to that link.
- `git push` — live in ~2 minutes.

## Editing a script

Just edit the `.txt`. Keep it plain spoken sentences (the tools read it verbatim).
Re-run `make-voiceovers.py` to regenerate that MP3.
