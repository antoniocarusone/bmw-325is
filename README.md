# KLAUS — 1990 BMW E30 325is

A single static site documenting Klaus: history, specifications, service log and known issues. No build step, no dependencies — just open `index.html`.

## Files
- `index.html` — all the content (copy lives here)
- `styles.css` — the BMW Motorsport / Neue Grafik styling
- `script.js` — gallery, lightbox, animations, and the **photo list**
- `images/` — drop your photos here

## 1. Add your photos
1. Put your image files in the `images/` folder.
2. Open `script.js` and edit the `PHOTOS` array near the top — set each
   `src` to your filename and write a short `alt` description.
   - `span` controls tile size: `"hero"`, `"wide"`, `"tall"`, or `""` (normal).
3. The hero image at the top of the page is `images/klaus-hero.jpg`
   (set in `index.html`). Name your best front-3/4 shot that, or change the
   filename in `index.html`.

> Any image that isn't found shows a tasteful striped placeholder with the
> filename it's looking for — so nothing ever looks broken while you work.

## 2. Add service records
Open `index.html`, find the **Service History** section. There's a
copy-paste template in an HTML comment right above the list. Duplicate one
`<li class="log__item">` block per receipt and fill in the date, work, and
detail. `data-mileage` is optional and shows on the right.

## 3. Edit any text
All copy is plain text in `index.html` — specs, known issues, the story.
Search for what you want to change.

## 4. Publish
This site is hosted free on **GitHub Pages** at
<https://antoniocarusone.github.io/bmw-325is/>, served from the `main`
branch, root directory.

To publish an update:

```sh
git add -A && git commit -m "Update" && git push
```

The live site rebuilds about a minute after the push.

**Search engines:** `index.html` carries a `noindex, nofollow` meta tag, so the
page stays out of Google and other search results. Don't add a `robots.txt` to
block crawling — this is a *project* page, so `robots.txt` would have to live at
the domain root (a separate `antoniocarusone.github.io` repo) to be read at all,
and blocking the crawler would stop it from ever seeing the `noindex` tag.
Note the GitHub *repo* page is still public and indexable; only the site is not.

## Tips
- Keep photos under ~500 KB each (resize to ~2000px wide) so the page loads fast.
- Alpine White shows reflections — shoot in open shade or golden hour.
