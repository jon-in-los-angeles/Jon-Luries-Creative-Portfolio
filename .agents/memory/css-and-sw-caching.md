---
name: CSS variable format & service worker caching
description: Two quirks in this portfolio site — CSS vars store full hsl() values, and the PWA service worker aggressively caches
---

## CSS variables are full hsl() values
The custom properties in `index.css` (e.g. `--gray-900`, `--accent`) store complete `hsl(...)` values, NOT raw component lists.
**Why:** Wrapping them again (`hsl(var(--x))` or `hsla(var(--x), 0.5)`) produces invalid CSS that fails silently at computed-value time — elements render with no background/inherited color, looking like "missing" UI (this hid a hero button entirely).
**How to apply:** Use `var(--x)` directly; for alpha use `color-mix(in srgb, var(--x) N%, transparent)`.

## Service worker hides changes
The site is a PWA with a service worker. It was cache-first (now network-first with offline fallback, as of July 2026). Any change to visuals may be masked by stale SW cache in the preview browser — bump `CACHE_NAME` in `client/public/sw.js` when in doubt, and remember `cache.addAll()` rejects (blocking SW install) if any pre-cache URL 404s — icons are `.svg`, not `.png`.
