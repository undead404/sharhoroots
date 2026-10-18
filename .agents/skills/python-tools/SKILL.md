---
name: python-tools
description: Set up, run, test, or manage any Python code or dependencies in this repository. Load before every Python-related task; the uv project is isolated here so Cloudflare Pages does not detect Python at the vault root.
---

# Repository Python tooling

This repository's Python project lives in this skill directory to keep Python configuration out of the Cloudflare Pages build root. Always use `uv`; do not rely on system Python or install packages with `pip`.

## Setup and commands

- Restore the locked environment with `uv sync --locked --project .agents/skills/python-tools`.
- Run Python commands and scripts with `uv run --project .agents/skills/python-tools python ...` (for example, `uv run --project .agents/skills/python-tools python path/to/script.py`).
- Add dependencies with `uv add --project .agents/skills/python-tools <package>` and commit the resulting `pyproject.toml` and `uv.lock` changes in this directory.
- Pillow's package name is `Pillow`; import it as `PIL` (for example, `from PIL import Image`).

The Python version pin, project metadata, and lockfile are all kept beside this skill. Do not add Python project marker files such as `pyproject.toml`, `requirements.txt`, or `.python-version` to the repository root; doing so makes Cloudflare Pages provision Python and run Python dependency installation during the site build.
