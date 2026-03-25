# HitchhikerDiary — Next.js Frontend Implementation

## ✅ COMPLETED: Architecture Migration

**Status**: Successfully migrated from Ghost theme to Next.js headless frontend

### Context
- Owner: filmmaker (SRFTI alumnus) writing about cinema, travel across India, and politics
- **Previous**: Ghost theme with Dawn overrides in `theme-overrides/dawn/` 
- **Current**: Next.js frontend consuming Ghost Content API (headless CMS)
- **Goal**: Mature, cinematic UI with full control over design and performance

### Architecture Overview
- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS (`/frontend`)
- **Backend**: Ghost 5 (headless CMS for content management)
- **API**: Ghost Content API integration
- **Design**: Cinematic palette, premium typography, responsive layout
- **Deployment**: Docker Compose with standalone Next.js builds

### Key Features Implemented
- Cinematic Hero component with carousel for featured posts
- PostList component with metadata (date, author, reading time, tags)  
- Premium typography (Playfair Display + Inter fonts)
- Responsive design with mobile-first approach
- Ghost Content API integration for posts, authors, tags
- SEO-friendly with Next.js built-in optimizations

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

Progress log (completed tasks)
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
- [x] 2026-03-25 — **REMOVED deprecated Ghost theme files** - cleaned up project structure
- [x] 2026-03-25 — Updated README and documentation for new architecture

## Next Steps (Optional Enhancements)

### Phase 2: Advanced Features
- [ ] Individual post pages (`/posts/[slug]`)
- [ ] Tag archive pages (`/tags/[slug]`)  
- [ ] Author profile pages (`/authors/[slug]`)
- [ ] Search functionality with Algolia or similar
- [ ] RSS feed generation
- [ ] Sitemap generation
- [ ] Open Graph meta tags for social sharing

### Phase 3: Performance & SEO
- [ ] Image optimization with Next.js Image component
- [ ] Static generation (ISR) for better performance
- [ ] CDN integration for media assets
- [ ] Analytics integration (Google Analytics, etc.)
- [ ] Performance monitoring

### Phase 4: Content Features  
- [ ] Newsletter signup integration
- [ ] Comments system (Disqus, etc.)
- [ ] Related posts suggestions
- [ ] Reading progress indicator
- [ ] Dark/light mode toggle
- [ ] Print-friendly styling

**Status**: ✅ **MIGRATION COMPLETE** - Ready for production deployment

