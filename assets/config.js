// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE — everything on the site comes from here.
// ─────────────────────────────────────────────────────────────
window.SITE = {
  name: "Dr Daniele Tartarini",
  title: "Researcher",            // TODO: your role, e.g. "Research Fellow"
  affiliation: "University of Sheffield",   // TODO: add department
  email: "d.tartarini@sheffield.ac.uk",
  photo: "",                      // e.g. "assets/photo.jpg" (leave "" for initials)

  bio: `I am a researcher at the University of Sheffield. Replace this
        paragraph with a short description of your research, background
        and current projects.`,

  interests: ["Research interest one", "Research interest two", "Research interest three"],

  // Profiles — leave any of these "" to hide the button
  orcid:    "0000-0002-8913-0156",
  linkedin: "https://www.linkedin.com/in/danieletartarini/",
  website:  "",                              // another personal site, if you have one
  scholar:  "",                              // Google Scholar profile URL
  github:   "https://github.com/tartarini",

  // Publications are pulled live from ORCID. Anything listed here is
  // shown as well (useful for items not yet on ORCID).
  extraPublications: [
    // { title: "Paper title", venue: "Journal", year: 2026, url: "https://doi.org/..." }
  ],

  // Notebooks in the /notebooks folder. They run in the visitor's browser
  // (JupyterLite) — no server needed. "binder" is optional: a link to a full
  // Python environment on mybinder.org for heavier notebooks.
  notebooks: [
    {
      file: "example.ipynb",
      title: "Example analysis",
      description: "A short demo: generate data, fit a curve and plot it with NumPy and Matplotlib."
    }
  ],
  binderRepo: "tartarini/tartarini.github.io",  // enables "Binder" buttons
};
