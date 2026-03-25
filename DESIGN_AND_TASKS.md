# HitchhikerDiary — Design & Implementation Prompt

Purpose
- Create a single reference document with a clear brief, task checklist, acceptance criteria and progress log for improving the HitchhikerDiary Ghost theme to a mature, cinematic, content-first UI.

Context
- Owner: filmmaker (SRFTI alumnus) writing about cinema, travel across India, and politics.
- Current theme: Dawn override files in `theme-overrides/dawn/` (see `default.hbs`, `index.hbs`, `partials/zen-single-page.hbs`, `partials/hero-cinema-carousel.hbs`).
- Problems to solve: childish UI, missing post metadata (date/author/reading time), some posts rendering full content on homepage, weak visual hierarchy, inconsistent image handling, lack of tags/hashtags.

High-level goals
- Mature, cinematic look: desaturated palette, strong serif titles, restrained sans body, filmic image crops, subtle textures.
- Content-first: show post metadata, consistent excerpts, visible tags/hashtags, readable card layouts.
- Accessibility: good alt text, aria labels, keyboard controls for carousel.
- Maintain Ghost best practices (use `plaintext`, `custom_excerpt`, `feature_image`, `tags`, `primary_author`, `published_at`).

Files to edit (primary)
- `theme-overrides/dawn/default.hbs` — global layout + CSS + hero inclusion
- `theme-overrides/dawn/partials/zen-single-page.hbs` — homepage single-page content and post list
- `theme-overrides/dawn/partials/hero-cinema-carousel.hbs` — homepage hero carousel

Tasks (pick one at a time)
- [ ] Create this design & tasks doc (current)
- [ ] Add post metadata to homepage post cards (date, author, reading time, tags)
- [ ] Ensure homepage uses `custom_excerpt` or `plaintext words="..."` (max 32 words) instead of full content
- [ ] Add tags/hashtags beneath excerpts (limit display to 3 tags)
- [ ] Style updates in `default.hbs`:
  - [ ] Cinematic palette (examples below)
  - [ ] Serif title styles + body font stack
  - [ ] Card border / shadow adjustments
  - [ ] Image aspect-ratio enforcement and object-fit
- [ ] Hero carousel improvements:
  - [ ] Stronger overlay gradient, monochrome filter on images
  - [ ] Keyboard and accessible controls, aria attributes
  - [ ] Replace bright pill links with minimal links
- [ ] Fix any logic rendering full posts on homepage
- [ ] Add unit visual tests / manual QA checklist and document results
- [ ] Create a single PR with descriptive commits and screenshots

Cinematic visual suggestions (start points)
- Palette: #0F1113 (nearly-black), #EDEBE8 (off-white), #C7C3BE (muted stone), accent #9A6B4E (film brown) or #7A8A91 (muted blue-gray)
- Title font: a serif like "Merriweather" or system-serif fallback
- Body font: Inter / system-sans stack
- Image feel: grayscale(85%) contrast(108%) or desaturate + bleed to edges

Markup & template rules
- Use `{{#if custom_excerpt}} {{custom_excerpt}} {{else}} {{plaintext words="32"}} {{/if}}` for excerpts
- Show date: `{{date published_at format="MMMM D, YYYY"}}`
- Show author: `{{#if primary_author}}{{primary_author.name}}{{/if}}`
- Reading time: use `{{reading_time}}` or compute via `{{reading_time}}` helper if available
- Tags: `{{#foreach tags limit="3"}}<a href="{{url}}">{{name}}</a>{{/foreach}}`

Acceptance criteria
- Homepage shows all posts as cards with: feature image (consistent crop), title, date, author, reading time, excerpt (max 32 words), up to 3 tags
- No homepage card displays full post body
- Hero carousel renders with filmic overlay and accessible controls
- Visual style is desaturated, typographically stronger, and feels mature and cinematic

Testing / QA checklist
- [ ] Homepage loads within 1.5s on local dev (approx)
- [ ] Keyboard navigation works for carousel (tab/arrow)
- [ ] Images preserve aspect ratio and do not distort
- [ ] Metadata values render correctly for multiple sample posts
- [ ] Mobile responsive: hero, cards and typography scale correctly

Progress log (add entries below)
- [x] 2026-03-25 — Document created (by script)
- [x] 2026-03-25 — Added premium fonts (Playfair Display, Inter) and cinematic color palette
- [x] 2026-03-25 — Added post metadata (date, author, reading time, tags) to homepage cards
- [x] 2026-03-25 — Ensured excerpts use custom_excerpt or plaintext fallback (32 words max)
- [x] 2026-03-25 — Updated hero carousel with accessibility improvements and minimal links
- [x] 2026-03-25 — Fixed Docker configuration to mount theme files properly
- [x] 2026-03-25 — Created missing partials (icons/search, pswp) to resolve 400 errors
- [x] 2026-03-25 — Deployed changes to production via Git push
- [x] 2026-03-25 — **DEPRECATED Ghost frontend** - replaced with Next.js headless setup
- [x] 2026-03-25 — Created Next.js frontend with Ghost Content API integration
- [x] 2026-03-25 — Built cinematic Hero component with carousel functionality
- [x] 2026-03-25 — Created PostList component with metadata and tags
- [x] 2026-03-25 — Added responsive header and footer with navigation
- [x] 2026-03-25 — Configured Docker setup for Next.js + Ghost backend

Practical notes for commits
- Commit names: `feat(theme): add post metadata to home cards`, `style(theme): cinematic palette and typography`, `fix(theme): use excerpts on homepage`
- Include before/after screenshots in PR description
- Keep each change focused and atomic

Questions / decisions needed
- [ ] Preferred serif font (provide name or use system serif)
- [ ] Preferred accent color (brown / blue-gray / other)
- [ ] Do you want image placeholders replaced or left as-is in `hero-cinema-carousel.hbs`?

End of document

