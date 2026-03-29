const SUPABASE_URL = "https://tgvsvqhioltwbujnvkwa.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRndnN2cWhpb2x0d2J1am52a3dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyMzUxODksImV4cCI6MjA4ODgxMTE4OX0.cuwpyA7Fh-67rqD_2056Ol0GckZXzHiP3NKQ3KNu-Qg";
const OG_IMAGE = "https://zhana.ge/og-image.png";
const SITE_TITLE = "ჟანა ანანიძე — პოეტი, პროზაიკოსი, მთარგმნელი";
const SITE_DESC = "ქართული სიტყვის ძალა — პოეზია, პროზა და თარგმანები ჟანა ანანიძისაგან.";

// Map URL path prefixes to Supabase tables
const ROUTE_TABLE_MAP = {
  "poetry":       "poems",
  "prose":        "prose",
  "reviews":      "reviews",
  "translations": "translations",
  "poems-en":     "poems_en",
};

// Detect social media / bot user agents
function isSocialBot(ua = "") {
  return /facebookexternalhit|twitterbot|linkedinbot|telegrambot|whatsapp|slackbot|discordbot|applebot|googlebot|bingbot|python-requests|axios|curl/i.test(ua);
}

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  const ua = request.headers.get("user-agent") || "";
  const segments = url.pathname.replace(/^\/|\/$/g, "").split("/");

  // Match /section/slug
  const section = segments[0];
  const slug    = segments[1];
  const table   = ROUTE_TABLE_MAP[section];

  // Skip if not a content item route
  if (!table || !slug) {
    return next();
  }

  // For real browsers: skip DB call and serve instantly
  // For bots: inject correct metadata
  if (!isSocialBot(ua)) {
    return next();
  }

  try {
    const sbUrl = `${SUPABASE_URL}/rest/v1/${table}?slug=eq.${encodeURIComponent(slug)}&select=title,content,date`;
    const res = await fetch(sbUrl, {
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      }
    });

    const data = await res.json();
    const item = (data && data.length > 0) ? data[0] : null;

    const title = item ? `${item.title} — ჟანა ანანიძე` : SITE_TITLE;
    const rawText = (item ? (item.content || "") : SITE_DESC)
      .replace(/<[^>]*>?/gm, " ")
      .replace(/\s+/g, " ")
      .trim();
    const desc = rawText.substring(0, 200) + (rawText.length > 200 ? "…" : "");
    const canonical = `https://zhana.ge${url.pathname}`;

    const response = await next();

    const newResponse = new HTMLRewriter()
      .on("title", {
        element(el) { el.setInnerContent(title); }
      })
      .on('meta[name="description"]', {
        element(el) { el.setAttribute("content", desc); }
      })
      .on('meta[property="og:title"]', {
        element(el) { el.setAttribute("content", title); }
      })
      .on('meta[property="og:description"]', {
        element(el) { el.setAttribute("content", desc); }
      })
      .on('meta[property="og:url"]', {
        element(el) { el.setAttribute("content", canonical); }
      })
      .on('meta[property="og:image"]', {
        element(el) { el.setAttribute("content", OG_IMAGE); }
      })
      .on('meta[property="og:image:width"]', {
        element(el) { el.setAttribute("content", "1200"); }
      })
      .on('meta[property="og:image:height"]', {
        element(el) { el.setAttribute("content", "630"); }
      })
      .on('meta[name="twitter:title"]', {
        element(el) { el.setAttribute("content", title); }
      })
      .on('meta[name="twitter:description"]', {
        element(el) { el.setAttribute("content", desc); }
      })
      .on('meta[name="twitter:image"]', {
        element(el) { el.setAttribute("content", OG_IMAGE); }
      })
      .on('link[rel="canonical"]', {
        element(el) { el.setAttribute("href", canonical); }
      })
      .transform(response);

    // Return with headers to prevent caching of bot-served HTML
    const headers = new Headers(newResponse.headers);
    headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    return new Response(newResponse.body, { status: newResponse.status, headers });

  } catch (err) {
    console.error("OG middleware error:", err);
    return next();
  }
}
