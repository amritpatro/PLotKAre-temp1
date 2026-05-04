# Plot Care Demo

Next.js site for PlotKare (landing, dashboard, admin). Static export for **GitHub Pages**.

## Live site (after you enable Pages)

`https://<your-username>.github.io/plot-care-demo/`

## Create the GitHub repo

1. On GitHub: **New repository**
2. Name: **`plot-care-demo`** (required for the default Pages URL and workflow `NEXT_PUBLIC_BASE_PATH`)
3. Description: e.g. `Plot Care Demo`
4. Public, no README/license (this repo already has files)
5. Create repository

## Push from your computer

```bash
cd "path/to/PLotKAre"
git remote add origin https://github.com/<YOUR_USERNAME>/plot-care-demo.git
git branch -M main
git push -u origin main
```

## Enable GitHub Pages

1. Repo **Settings → Pages**
2. **Build and deployment**: Source = **GitHub Actions**
3. After the first workflow run succeeds, open the site URL above.

If your repo name is **not** `plot-care-demo`, edit `.github/workflows/deploy-github-pages.yml` and set `NEXT_PUBLIC_BASE_PATH` to `/<your-repo-name>`.

## Local dev

```bash
cd webpage
npm install
npm run dev
```

Do **not** set `NEXT_PUBLIC_BASE_PATH` locally unless you are testing a subpath build.
