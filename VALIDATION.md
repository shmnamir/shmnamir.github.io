# PR 1 validation and release notes

## Review fixes — 2026-10-06

- GA4 uses the documented Arguments command queue for G-P1GXT99RF2. Initialization is idempotent and events cannot interrupt the portfolio if an existing tag throws.
- Production analytics is enabled only on www.amirshamani.com and amirshamani.com. Local and preview hosts neither initialize the queue nor load the Google script.
- The enhanced contact form uses the documented FormSubmit AJAX endpoint. generate_lead is sent only after an HTTP-success response with an explicit boolean true or string "true" success field. This means provider acceptance, not verified email delivery.
- A rejected response, invalid JSON, network failure, timeout or honeypot never generates a lead. The UI keeps entered text on failure, blocks concurrent submissions, and permits a manual retry. There is no automatic retry of an uncertain submission.
- Client navigation after acceptance preserves the analytics queue. The thank-you page no longer emits conversion events or reads a pending-submit flag. Direct visits and refreshes do not create leads. No session storage is required.
- Native POST remains as the no-JavaScript fallback. That fallback does not record a confirmed lead. The existing honeypot is retained; no _captcha=false override has been added. The AJAX path uses FormSubmit's server-side checks instead of the previous hosted browser flow.
- No contact name, email address or message is passed to analytics.
- A read-only pull_request workflow performs npm ci, build and tests on Node 22 without publishing. The separate main-branch workflow still publishes after merge.

## Completed locally

- npm run build: passed, including TypeScript and static export of /, /thank-you/, robots and sitemap.
- npm test: 14 behavioral tests passed plus static export verification.
- Tests cover the queue object type and measurement ID, initialization once, preview/SSR suppression, broken analytics, deferred acceptance, provider errors, malformed JSON, timeouts, honeypot and unavailable storage. External requests are mocked; tests send no email or production analytics.
- Export checks verify the homepage canonical and indexability, thank-you noindex/nofollow and canonical, exclusion from the sitemap, and exactly one hero-image preload.
- Relative to main 73ae519, image preloads fell from 12 to 1 (11 removed); checked HTML asset references fell from 56 to 45. These counts are not a measured Core Web Vitals improvement.
- Runtime code and export were built with Node 24 and existing dependencies. The PR workflow provides the separate clean-install Node 22 check.

## Release verification still required

- Observe the clean GitHub Actions result for the updated PR head before merging.
- Verify real page_view, project/CV/YouTube interactions and a consented contact submission with Tag Assistant / GA4 DebugView on the production hostname. Host filtering intentionally disables production analytics on a preview URL.
- Verify that the FormSubmit endpoint is activated for the deployed site and that an accepted submission reaches the inbox. Provider acceptance and GA event delivery are distinct checks.
- No live email was submitted and no GA4 account-level settings or key-event configuration were changed during this work. Browser end-to-end verification was unavailable locally because the browser download did not complete successfully.

References: https://developers.google.com/tag-platform/gtagjs and https://formsubmit.co/ajax-documentation
