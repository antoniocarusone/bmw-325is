# KLAUS — 1990 BMW E30 325is listing site

A single static site to sell Klaus. No build step, no dependencies — just open `index.html`.

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
All copy is plain text in `index.html` — price, contact email, location,
disclosures, the story. Search for what you want to change.

## 4. Publish (free options)
Pick one:

- **Netlify Drop** — go to https://app.netlify.com/drop and drag this whole
  folder in. Instant URL.
- **GitHub Pages** — create a repo, upload these files, enable Pages in
  Settings → Pages (deploy from `main`, root).
- **Vercel** — `vercel` CLI, or import the repo at vercel.com.

All three are free for a static site like this.

## Tips
- Keep photos under ~500 KB each (resize to ~2000px wide) so the page loads fast.
- Alpine White shows reflections — shoot in open shade or golden hour.
