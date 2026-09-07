# KLAUS — 1990 BMW E30 325is

A single static site documenting Klaus: history, specifications, service log and known issues. No build step, no dependencies — just open `index.html`.

## Files
- `index.html` — all the content (copy lives here)
- `styles.css` — the BMW Motorsport / Neue Grafik styling
- `script.js` — scroll reveals and the odometer animation
- `images/` — the hero photo, plus the archive of car photos

## 1. The hero photo
The one image the page displays is `images/klaus-hero.jpg`, set in
`index.html`. Swap the file (or change the filename in `index.html`) to
change it.

> If the image isn't found, it shows a striped placeholder naming the file
> it's looking for — so nothing ever looks broken while you work.

The rest of `images/` is no longer displayed on the page; the photo gallery
was removed. The files are kept as an archive.

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

**When you edit `styles.css`, bump the version in `index.html`:**
`<link rel="stylesheet" href="styles.css?v=3" />` → `?v=4`. GitHub Pages
serves CSS with `cache-control: max-age=600`, so without this your browser
can keep using the old stylesheet for 10 minutes after a push.

`script.js` carries the same `?v=N` buster, for the same reason. Bump it on
any JS change — the odometer animation writes the mileage into the hero on
load, so a stale script paints the old number over the correct one.

**Search engines:** `index.html` carries a `noindex, nofollow` meta tag, so the
page stays out of Google and other search results. Don't add a `robots.txt` to
block crawling — this is a *project* page, so `robots.txt` would have to live at
the domain root (a separate `antoniocarusone.github.io` repo) to be read at all,
and blocking the crawler would stop it from ever seeing the `noindex` tag.
Note the GitHub *repo* page is still public and indexable; only the site is not.

## Tips
- Keep photos under ~500 KB each (resize to ~2000px wide) so the page loads fast.
- Alpine White shows reflections — shoot in open shade or golden hour.
