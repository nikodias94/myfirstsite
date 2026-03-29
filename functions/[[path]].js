const SUPABASE_URL = "https://tgvsvqhioltwbujnvkwa.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRndnN2cWhpb2x0d2J1am52a3dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyMzUxODksImV4cCI6MjA4ODgxMTE4OX0.cuwpyA7Fh-67rqD_2056Ol0GckZXzHiP3NKQ3KNu-Qg";

export async function onRequest(context) {
  const { request, next, env } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  // Define patterns for item pages
  // Routes are: /poetry/:slug, /prose/:slug, /reviews/:slug, /translations/:slug, /poems-en/:slug
  const patterns = [
    { regex: /^\/poetry\/([^/]+)$/, table: "poems" },
    { regex: /^\/prose\/([^/]+)$/, table: "prose" },
    { regex: /^\/reviews\/([^/]+)$/, table: "reviews" },
    { regex: /^\/translations\/([^/]+)$/, table: "translations" },
    { regex: /^\/poems-en\/([^/]+)$/, table: "poems_en" }
  ];

  let matched = null;
  for (const p of patterns) {
    const m = path.match(p.regex);
    if (m) {
      matched = { table: p.table, slug: m[1] };
      break;
    }
  }

  // If no match, just serve the normal asset
  if (!matched) {
    return next();
  }

  try {
    // Fetch data from Supabase REST API
    const sbUrl = `${SUPABASE_URL}/rest/v1/${matched.table}?slug=eq.${matched.slug}&select=title,content,date`;
    const res = await fetch(sbUrl, {
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
      }
    });

    const data = await res.json();
    if (!data || data.length === 0) {
      return next(); // Fallback if item not found
    }

    const item = data[0];
    const itemTitle = `${item.title} — ჟანა ანანიძე`;
    // Strip HTML for description
    const itemDesc = (item.content || "")
      .replace(/<[^>]*>?/gm, " ")
      .replace(/\s+/g, " ")
      .trim()
      .substring(0, 160) + "...";

    // Fetch the actual index.html from the origin
    const response = await next();
    
    // Inject metadata using HTMLRewriter
    return new HTMLRewriter()
      .on("title", {
        element(el) { el.setInnerContent(itemTitle); }
      })
      .on('meta[name="description"]', {
        element(el) { el.setAttribute("content", itemDesc); }
      })
      .on('meta[property="og:title"]', {
        element(el) { el.setAttribute("content", itemTitle); }
      })
      .on('meta[property="og:description"]', {
        element(el) { el.setAttribute("content", itemDesc); }
      })
      .on('meta[property="og:url"]', {
        element(el) { el.setAttribute("content", url.toString()); }
      })
      .on('meta[name="twitter:title"]', {
        element(el) { el.setAttribute("content", itemTitle); }
      })
      .on('meta[name="twitter:description"]', {
        element(el) { el.setAttribute("content", itemDesc); }
      })
      .transform(response);

  } catch (err) {
    console.error("Middleware error:", err);
    return next();
  }
}
