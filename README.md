# PlotCaRe-temp

Next.js PlotKare site (static export) for **GitHub Pages**.

**Repository:** [amritpatro/PlotCaRe-temp](https://github.com/amritpatro/PlotCaRe-temp)

## Live site

After Pages is enabled and the workflow runs: **`https://amritpatro.github.io/PlotCaRe-temp/`**

## Push updates

```bash
cd "path/to/PLotKAre"
git remote add origin https://github.com/amritpatro/PlotCaRe-temp.git   # first time only
git push -u origin main
```

If `origin` already exists: `git remote set-url origin https://github.com/amritpatro/PlotCaRe-temp.git`

## Enable GitHub Pages (once)

1. Repo **Settings → Pages**
2. **Build and deployment** → Source: **GitHub Actions**
3. Open the **Actions** tab and confirm **Deploy to GitHub Pages** succeeds

## Local dev

```bash
cd webpage
npm install
npm run dev
```

Do not set `NEXT_PUBLIC_BASE_PATH` locally unless testing a subpath build.
