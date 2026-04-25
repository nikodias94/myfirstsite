# myfirstsite — პროექტის მეხსიერება

## 🎯 პროექტის მიზანი
ჟანა ანანიძის (ლუსია, მეუღლე) პოეზიის ვებსაიტი — ლამაზი, მინიმალისტური, ელეგანტური.
**Live URL**: https://zhana.ge (Cloudflare Pages)

## 🏗️ არქიტექტურა
- **ფრონტენდი**: React 19 + Vite 7 → **Cloudflare Pages**-ზე deploy
- **ბექენდი**: **Supabase** (PostgreSQL DB, Auth, REST API)
- **Edge Functions**: `notify-new-comment` (Supabase Edge Function)
- **CF Functions**: `functions/[[path]].js` — OG metadata injection (social bots-ისთვის)
- **CI/CD**: GitHub Actions → auto-deploy on push to `main`
- **MCP სერვერები**: `supabase-mcp-server` + `sequential-thinking`

## 📁 პროექტის სტრუქტურა
```
myfirstsite/
├── src/
│   ├── App.jsx                    # Router + Suspense + lazy loading
│   ├── main.jsx                   # Entry point
│   ├── index.css                  # Main design system (42KB)
│   ├── App.css                    # App-specific styles
│   ├── pages.css                  # Page-level styles
│   ├── responsive.css             # Responsive breakpoints
│   ├── context/ContentContext.jsx  # Global state → Supabase API
│   ├── lib/supabase.js            # Supabase client init
│   ├── data/defaultContent.js     # Fallback/seed data
│   ├── hooks/
│   │   ├── useSEO.js              # Dynamic SEO meta tags
│   │   ├── useTypingEffect.js     # Hero typing animation
│   │   └── useAutoOpenItem.js     # Auto-open item from URL slug
│   ├── pages/
│   │   ├── Home.jsx               # მთავარი (hero + about + books)
│   │   ├── Poetry.jsx             # ქართული პოეზია
│   │   ├── PoemsEn.jsx            # ინგლისური ლექსები
│   │   ├── Translations.jsx       # თარგმნები
│   │   ├── Reviews.jsx            # რეცენზიები
│   │   ├── Prose.jsx              # პროზა
│   │   ├── About.jsx              # ჩემ შესახებ
│   │   ├── Contact.jsx            # კონტაქტი (EmailJS)
│   │   ├── Admin.jsx              # ადმინ პანელი (CRUD, 54KB)
│   │   ├── Login.jsx              # ავტორიზაცია (Supabase Auth)
│   │   └── NotFound.jsx           # 404 გვერდი
│   └── components/
│       ├── Layout.jsx             # Main layout wrapper
│       ├── Navbar.jsx             # Dynamic navigation (DB-driven)
│       ├── Footer.jsx             # Footer (social links from DB)
│       ├── PoemCard.jsx           # Content card (likes + comments)
│       ├── PageHero.jsx           # Section hero banners
│       ├── SearchBar.jsx          # Content search
│       ├── ContentModal.jsx       # Content detail modal
│       ├── PoemOfDay.jsx          # Featured poem widget
│       ├── RichTextEditor.jsx     # TipTap rich text (admin)
│       ├── ErrorBoundary.jsx      # Error boundary
│       └── ProtectedRoute.jsx     # Supabase auth guard
├── functions/
│   └── [[path]].js                # CF Pages middleware (OG tags for bots)
├── public/
│   ├── favicon.png
│   ├── og-image.png
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   ├── create_admin.js            # Admin user creation script
│   └── generate_slugs.cjs         # Slug generation helper
├── .github/workflows/deploy.yml   # GitHub Actions CI/CD
├── deploy.bat                     # Manual deploy script (Windows)
├── deploy.cjs                     # Node deploy helper
├── .env                           # Environment variables
├── .env.example
├── gemini.md                      # ← ეს ფაილი
├── vite.config.js
└── package.json
```

## 🗄️ Supabase DB ტაბლები (Project: `tgvsvqhioltwbujnvkwa`)

| ტაბლა | აღწერა | RLS | რაოდენობა | სვეტები |
|--------|--------|-----|-----------|---------|
| `poems` | ქართული პოეზია | ✅ | 30 | id, title, content, date, created_at, slug |
| `poems_en` | ინგლისური ლექსები | ✅ | 0 | id, title, content, date, created_at, slug |
| `translations` | თარგმანები | ✅ | 0 | id, title, content, date, created_at, slug |
| `reviews` | რეცენზიები | ✅ | 9 | id, title, content, date, created_at, slug |
| `prose` | პროზა | ✅ | 0 | id, title, content, date, created_at, slug |
| `homepage_settings` | მთავარი გვერდის პარამეტრები | ✅ | 1 | name, bio, quote, hero_image_url, about_*, contact_*, typing_words, footer_text |
| `navigation_menu` | ნავიგაციის მენიუ | ✅ | 6 | id, title, path, order_index |
| `social_links` | სოციალური ბმულები | ✅ | 4 | id, platform_name, url, icon_name |
| `likes` | ლაიქები | ✅ | 33 | id, item_id, created_at |
| `comments` | კომენტარები | ✅ | 1 | id, item_id, author_name, author_email, content, is_approved |
| `books` | წიგნები | ✅ | 1 | id, title, description, cover_url, order_index |

## 🗃️ კონტენტის კატეგორიები
| ID | ქართულად | გვერდი | URL slug support |
|----|---------|--------|-----------------|
| `poems` | პოეზია | `/poetry` & `/poetry/:slug` | ✅ |
| `poemsEn` | ლექსები (En) | `/poems-en` & `/poems-en/:slug` | ✅ |
| `translations` | თარგმანი | `/translations` & `/translations/:slug` | ✅ |
| `reviews` | რეცენზია | `/reviews` & `/reviews/:slug` | ✅ |
| `prose` | პროზა | `/prose` & `/prose/:slug` | ✅ |
| `books` | წიგნები | მთავარ გვერდზე | — |

## 🔐 ავთენტიფიკაცია
- **Supabase Auth** — email/password login
- Login: `username@admin.com` + password
- `ProtectedRoute` → checks `supabase.auth.getSession()`
- Admin user created via `scripts/create_admin.js`

## 🎨 დიზაინი
- Dark theme, gold accents (`#c9a96e`)
- Framer Motion ანიმაციები
- Lucide React iconები
- Georgian fonts
- Typing effect (hero section)
- Glassmorphism, gradient orbs
- Responsive design (responsive.css)

## 🗄️ Supabase კონფიგურაცია
- **Project ID**: `tgvsvqhioltwbujnvkwa`
- **Project Name**: `myfirstsite-lucia`
- **Region**: `eu-central-1`
- **Status**: ACTIVE_HEALTHY
- **URL**: `https://tgvsvqhioltwbujnvkwa.supabase.co`
- **Access Token**: `sbp_bdc3382c373827a1712968ebe2e724c8fcfb7a09`
- **Edge Functions**: `notify-new-comment` (ACTIVE)

## 🌐 Cloudflare კონფიგურაცია
- **Account ID**: `25320828b3f2e2004ac4877cdecac442`
- **Pages Project**: `myfirstsite`
- **Custom Domain**: `zhana.ge`
- **API Token**: `NkmQgdQFxUU0o_fCvGYQ4ZmoLy8DrlCxBOKLELjP`
- **CF Function**: OG metadata injection (HTMLRewriter) for social bots

## 📦 Dependencies
```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-router-dom": "^7.13.0",
  "framer-motion": "^12.34.0",
  "lucide-react": "^0.563.0",
  "@supabase/supabase-js": "^2.99.1",
  "@emailjs/browser": "^4.4.1",
  "@tiptap/react": "^3.20.4",
  "@tiptap/starter-kit": "^3.20.4",
  "@tiptap/extension-link": "^3.20.4",
  "@tiptap/extension-underline": "^3.20.4",
  "dompurify": "^3.3.3"
}
```

## 🚀 Deploy
- **Primary**: GitHub Actions (`.github/workflows/deploy.yml`) — auto on push to `main`
- **Manual**: `deploy.bat` (build + git push + wrangler deploy)
- Build command: `npm run build`
- Output dir: `dist/`
- ENV secrets needed in GitHub: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`

## ✅ შესრულებული
- [x] React+Vite პროექტი შექმნილია
- [x] სრული UI (11 გვერდი + ადმინ პანელი)
- [x] Supabase პროექტი შექმნილია (`myfirstsite-lucia`, eu-central-1)
- [x] DB ტაბლები შექმნილია (11 ტაბლა, RLS ჩართული)
- [x] Supabase Auth კონფიგურაცია (email/password)
- [x] `ContentContext.jsx` → Supabase API-ზე გადაწერილი
- [x] `.env` ფაილი კონფიგურირებული
- [x] Login.jsx → Supabase Auth-ზე გადაწერილი
- [x] ProtectedRoute → Supabase session checking
- [x] Cloudflare Pages-ზე deploy (zhana.ge)
- [x] GitHub Actions CI/CD pipeline
- [x] SEO (meta tags, OG, sitemap, robots.txt)
- [x] CF Functions — OG metadata for social bots
- [x] Likes & Comments system
- [x] Edge Function: `notify-new-comment`
- [x] Books section (მთავარი გვერდი)
- [x] Dynamic navigation (DB-driven)
- [x] Social links (DB-driven)
- [x] Rich Text Editor (TipTap) admin-ში
- [x] URL slugs (SEO-friendly URLs)
- [x] Lazy loading (code splitting)
- [x] Contact page (EmailJS)
- [x] Search functionality
- [x] Supabase MCP დაყენებული

## 🔜 შესაძლო შემდეგი ნაბიჯები
- [ ] კონტენტის დამატება (თარგმანები, პროზა, ინგ. ლექსები)
- [ ] Image upload (Supabase Storage)
- [ ] Analytics integration
- [ ] Performance optimization (images, caching)
- [ ] PWA support
