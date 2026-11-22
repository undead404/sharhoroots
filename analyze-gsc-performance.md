Analyze the Google Search Console exports in `audits/gsc/` and audit this website's source code.

**Goal:** Identify and implement evidence-based technical SEO improvements that increase discoverability, indexing quality, and useful organic search traffic.

### Phase 1 — Data analysis

1. Parse all exported CSV files, accounting for their original report dates, filters, and dimensions.
2. Analyze clicks, impressions, CTR, and average position.
3. Identify pages with substantial impressions but disproportionately few clicks, considering ranking position and query intent.
4. Identify pages whose apparent search intent does not match their titles, descriptions, headings, or content.
5. Identify potential keyword cannibalization, missing internal links, and pages that deserve better discoverability.
6. Compare 28-day and 3-month performance using comparable daily averages, while accounting for partial periods and limited data.
7. Investigate indexing exclusions. Distinguish actionable problems from expected exclusions.

### Phase 2 — Source code audit

Inspect Quartz configuration, routing, generated metadata, sitemap generation, canonical URLs, robots directives, structured data, internal links, and HTML semantics.

For each important finding, correlate Search Console evidence with actual implementation details. Do not infer a technical defect from poor search performance alone.

Pay particular attention to:
- Ukrainian-language search queries and metadata
- Historical settlement names, spelling variants, and administrative changes
- Genealogical archival references and source citations
- The discoverability of individual settlements and historical documents
- Duplicate content and canonicalization
- Internal navigation between settlements, records, and related materials

Never manufacture historical information, change factual claims without evidence, or replace historically accurate terminology merely to target popular keywords.

### Phase 3 — Implement improvements

Prioritize verified defects and low-risk, high-value improvements.

For each change:
- Describe the supporting evidence.
- Explain the expected search or usability benefit.
- Implement the smallest maintainable change.
- Run relevant checks and builds.
- Avoid unnecessary dependencies or elaborate SEO infrastructure.

Do not automatically rewrite historical articles or change editorial content. Propose such changes for review.

### Phase 4 — Report

Create `audits/gsc/analysis.md` containing:
1. Executive summary
2. Data limitations and assumptions
3. Prioritized findings with affected URLs
4. Changes implemented, including files modified
5. Recommendations requiring editorial review
6. Changes that should not be made and why
7. Metrics to compare after Google has recrawled the affected pages

Distinguish observed facts, hypotheses, and verified fixes.

Do not claim that a code fix guarantees indexing, ranking improvements, or increased traffic.