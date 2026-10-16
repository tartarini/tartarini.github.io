# tartarini.github.io

Source for https://tartarini.github.io — academic homepage.

A one-page academic site with:
- **ORCID, LinkedIn, website, Google Scholar, GitHub** profile buttons
- **Publications pulled live from ORCID** (update ORCID → the site updates; no rebuild)
- **Jupyter notebooks that run in the visitor's browser** (JupyterLite), plus optional Binder links

## 1. Personalise
Edit **`assets/config.js`** — name, bio, ORCID iD, LinkedIn URL, notebooks list.
Optional: add `assets/photo.jpg` and set `photo: "assets/photo.jpg"`.

## 2. Add notebooks
Drop `.ipynb` files into `notebooks/` and add an entry to `notebooks` in `config.js`.
In-browser notebooks support pure-Python packages plus NumPy, pandas, Matplotlib, SciPy, scikit-learn
(install them with `%pip install ...` in the first cell). For heavy or compiled dependencies,
list the packages in `binder/requirements.txt` (used by the "Binder" buttons).

## 3. Publish on GitHub Pages (free)
1. Create a GitHub repo named **`<username>.github.io`** (gives you `https://<username>.github.io`).
2. Push this folder to it.
3. Repo **Settings → Pages → Source: GitHub Actions**.
4. Every push to `main` rebuilds and deploys automatically (see `.github/workflows/deploy.yml`).

## 4. Link back
Add the site URL to your ORCID record (*Websites & social links*) and LinkedIn (*Contact info → Website*).

## Preview locally
```bash
pip install -r requirements.txt
jupyter lite build --contents notebooks --output-dir _site/lab
cp -r index.html assets notebooks _site/ && python -m http.server -d _site
```
