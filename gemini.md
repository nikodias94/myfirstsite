# myfirstsite — პროექტის მეხსიერება

## 🎯 პროექტის მიზანი
ლუსიას (მეუღლე) პოეზიის ვებსაიტი — ლამაზი, მინიმალისტური, ელეგანტური.

## 🏗️ არქიტექტურა
- **ფრონტენდი**: React + Vite → **Cloudflare Pages**-ზე deploy
- **ბექენდი**: **Supabase** (PostgreSQL DB, Auth, REST API)
- **MCP სერვერები**: `supabase-mcp-server` + `sequential-thinking`

## 📁 პროექტის სტრუქტურა
```
myfirstsite/
├── src/
│   ├── App.jsx                    # Router + ContentProvider wrapper
│   ├── context/ContentContext.jsx  # Global state (ახლა localStorage → Supabase)
│   ├── data/defaultContent.js      # Default/seed data
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Poetry.jsx             # ქართული პოეზია
│   │   ├── PoemsEn.jsx            # ინგლისური ლექსები
│   │   ├── Translations.jsx       # თარგმნები
│   │   ├── Reviews.jsx            # რეცენზიები
│   │   ├── Prose.jsx              # პროზა
│   │   ├── Admin.jsx              # ადმინ პანელი (CRUD)
│   │   └── Login.jsx              # ავტორიზაცია
│   └── components/
│       ├── Layout.jsx
│       ├── Navbar.jsx
│       ├── Footer.jsx
│       ├── PoemCard.jsx
│       └── ProtectedRoute.jsx
├── gemini.md                      # ← ეს ფაილი
├── vite.config.js
└── package.json
```

## 🗃️ კონტენტის კატეგორიები
| ID | ქართულად | გვერდი |
|----|---------|--------|
| `poems` | პოეზია | `/poetry` |
| `poemsEn` | ლექსები (En) | `/poems-en` |
| `translations` | თარგმანი | `/translations` |
| `reviews` | რეცენზია | `/reviews` |
| `prose` | პროზა | `/prose` |

ყველა ჩანაწერს აქვს: `id`, `title`, `content`, `date`

## 🔐 ავთენტიფიკაცია
- **ახლა**: hardcoded პაროლი (`lusia013`) → localStorage flag
- **გეგმა**: Supabase Auth — email/password login

## 🎨 დიზაინი
- Dark theme, gold accents (`#c9a96e`)
- Framer Motion ანიმაციები
- Lucide React iconები
- Georgian fonts

## 🗄️ Supabase კონფიგურაცია
- **Access Token**: `sbp_bdc3382c373827a1712968ebe2e724c8fcfb7a09`
- MCP config: `C:\Users\Niko\.gemini\antigravity\mcp_config.json`

## 📦 Dependencies
```json
{
  "react": "^18",
  "react-router-dom": "^6",
  "framer-motion": "latest",
  "lucide-react": "latest",
  "@supabase/supabase-js": "(დასამატებელი)"
}
```

## 🚀 Deploy
- **Cloudflare Pages**: GitHub-თან კავშირი ან Wrangler CLI
- Build command: `npm run build`
- Output dir: `dist/`
- `.wrangler/` directory exists (ადრე კონფიგურირებული)

## ✅ შესრულებული
- [x] React+Vite პროექტი შექმნილია
- [x] სრული UI (ყველა გვერდი + ადმინ პანელი)
- [x] localStorage-based state management
- [x] Supabase MCP დაყენებულია და მუშაობს
- [x] GitHub-ზე ატვირთული

## 🔜 შემდეგი ნაბიჯები
- [ ] Supabase-ში პროექტი შექმნა
- [ ] DB ტაბლების შექმნა (5 კატეგორია)
- [ ] Supabase Auth კონფიგურაცია
- [ ] `ContentContext.jsx` → Supabase API-ზე გადაწერა
- [ ] `.env` ფაილი (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
- [ ] Login.jsx → Supabase Auth-ზე გადაწერა
- [ ] Cloudflare Pages-ზე deploy (env variables სეტინგი)
