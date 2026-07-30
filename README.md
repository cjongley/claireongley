# Claire — profile site

A small, single-page profile site: a mix of work (AI agents at Inner West
Council) and personal (Bargello quilting, board games, gaming), with a
generative "Bargello wave" pattern as the signature visual — click
"Shuffle the pattern" to regenerate it.

## Files

- `index.html` — page content and structure
- `style.css` — colours, type, layout
- `script.js` — draws the wave dividers

## Before you publish

Open `index.html` and update the three placeholder links near the
bottom (`Say hi` section):

```html
<li><a href="mailto:you@example.com">Email</a></li>
<li><a href="https://github.com/yourusername" target="_blank" rel="noopener">GitHub</a></li>
<li><a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener">LinkedIn</a></li>
```

Feel free to edit any of the wording too — it's a starting draft, not
a script to stick to.

## Publishing with GitHub Pages

**Option A — a brand-new repo just for this site**

1. On GitHub, click **New repository**.
   - If you want it at `https://yourusername.github.io`, name the repo
     exactly `yourusername.github.io` (replace with your actual GitHub
     username). This makes it your "root" site with no extra path.
   - Otherwise, name it anything, e.g. `profile-site` — it'll be served
     at `https://yourusername.github.io/profile-site`.
2. Don't initialise it with a README (you're uploading your own files).
3. On the new repo's page, click **uploading an existing file**, drag
   in `index.html`, `style.css`, and `script.js`, and commit.
4. Go to **Settings → Pages**.
5. Under **Source**, choose **Deploy from a branch**.
6. Under **Branch**, choose `main` and folder `/ (root)`, then **Save**.
7. GitHub will give you the live URL within a minute or two (also shown
   at the top of the Pages settings screen once it's built).

**Option B — from your computer with git**

```bash
git init
git add index.html style.css script.js README.md
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/yourusername/REPO_NAME.git
git push -u origin main
```

Then do steps 4–7 above in the repo's **Settings → Pages**.

## Custom domain (optional)

If you own a domain, add it under **Settings → Pages → Custom domain**,
then create a `CNAME` record with your DNS provider pointing to
`yourusername.github.io`. GitHub Pages handles HTTPS automatically once
the DNS check passes.
