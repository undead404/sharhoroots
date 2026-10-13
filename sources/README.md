# Reusable source records

Use this directory for short, tracked records of sources likely to be useful in more than one research task. Check these records before starting new web searches or downloads.

- Add one Markdown record per reusable source, based on [`TEMPLATE.md`](TEMPLATE.md). Use a stable, readable filename or identifier.
- Record enough to find and identify the source again: title, creator, date/edition, source type, stable URL or shelfmark, relevant coverage/locators, access notes, and citation details. Include a local path under `books/` only when a local copy exists.
- Do not create a record for every one-off search result. Update a record when a source's stable URL, access behavior, or useful local copy changes.
- A record is a retrieval aid, not evidence. For each research claim, inspect the source itself and cite the exact page, folio, image, or other locator actually checked. A catalog record describes the catalog entry, not an uninspected work.
- Large or intentionally retained source copies belong under the gitignored `books/` directory. Temporary downloads, extracted text, and command output belong under the gitignored `.agent-work/` directory. Neither directory is published or committed.
- Respect access restrictions. Do not bypass logins, CAPTCHAs, paywalls, or explicit restrictions; follow the bounded access and selective human-retrieval process in the `research-facts` skill.

The `books/` and `.agent-work/` directories are local-only and may not exist until needed. Keep metadata and useful retrieval notes here so they remain available across clones without committing large or restricted files.
