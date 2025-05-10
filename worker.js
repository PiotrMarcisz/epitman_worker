export default {
  async fetch(request, env, ctx) {
    const userAgent = request.headers.get("user-agent") || "";

    const isBot = /Googlebot|Bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot|facebot|facebookexternalhit|Twitterbot|LinkedInBot/i.test(userAgent);

    const originalUrl = new URL(request.url);
    const targetUrl = originalUrl.href;
    const prerenderBase = "https://service.prerender.io/";

    if (isBot) {
      const prerenderUrl = prerenderBase + encodeURIComponent(targetUrl);
      return fetch(prerenderUrl, {
        headers: {
          "X-Prerender-Token": env.PRERENDER_TOKEN // bezpieczne użycie zmiennej środowiskowej
        }
      });
    }

    return fetch(request);
  }
};
