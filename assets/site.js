(function () {
  const S = window.SITE;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  document.title = S.name;
  $("name").textContent = S.name;
  $("foot-name").textContent = S.name;
  $("title").textContent = S.title;
  $("affiliation").textContent = S.affiliation;
  $("bio").textContent = S.bio.replace(/\s+/g, " ").trim();
  $("year").textContent = new Date().getFullYear();
  $("email").textContent = S.email;
  $("email").href = "mailto:" + S.email;
  $("interests").innerHTML = (S.interests || []).map((i) => `<li>${esc(i)}</li>`).join("");

  const av = $("avatar");
  if (S.photo) av.style.backgroundImage = `url("${S.photo}")`;
  else av.textContent = S.name.replace(/^(Dr|Prof)\.?\s+/i, "").split(/\s+/).map((w) => w[0]).join("").slice(0, 2);

  // Profile links
  const icon = {
    orcid: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#a6ce39"/><path fill="#fff" d="M8.3 17.3H6.9V7.8h1.4zm-.7-10.8a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8zm2.6 1.3h3.8c3.6 0 5.2 2.6 5.2 4.8 0 2.4-1.9 4.8-5.2 4.8h-3.8zm1.4 8.3h2.3c3.2 0 3.9-2.4 3.9-3.5 0-1.8-1.2-3.5-3.9-3.5h-2.3z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.5V9h3.6zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z"/></svg>',
    website: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>',
    scholar: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3 1 9l11 6 9-4.9V17h2V9zM5 13.2v4L12 21l7-3.8v-4L12 17z"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3"/></svg>',
  };
  const links = [
    ["orcid", S.orcid && "https://orcid.org/" + S.orcid, "ORCID"],
    ["linkedin", S.linkedin, "LinkedIn"],
    ["website", S.website, "Website"],
    ["scholar", S.scholar, "Google Scholar"],
    ["github", S.github, "GitHub"],
  ].filter((l) => l[1]);
  $("links").innerHTML = links.map(([k, url, label]) =>
    `<a href="${esc(url)}" target="_blank" rel="noopener me">${icon[k]}${label}</a>`).join("");

  // Publications from the ORCID public API
  let pubs = [];
  function renderPubs(filter = "") {
    const f = filter.toLowerCase();
    const shown = pubs.filter((p) => !f || `${p.title} ${p.venue} ${p.year}`.toLowerCase().includes(f));
    if (!shown.length) { $("pubs").innerHTML = '<p class="muted">No publications found.</p>'; return; }
    let html = "", lastYear = null;
    for (const p of shown) {
      if (p.year !== lastYear) { html += `<div class="year">${esc(p.year || "Undated")}</div>`; lastYear = p.year; }
      const link = p.doi ? `https://doi.org/${p.doi}` : p.url;
      html += `<div class="pub">
        <div class="pub-title">${link ? `<a href="${esc(link)}" target="_blank" rel="noopener">${esc(p.title)}</a>` : esc(p.title)}</div>
        <div class="pub-meta">${esc([p.venue, p.type].filter(Boolean).join(" · "))}</div>
        ${p.doi ? `<div class="pub-links"><a href="https://doi.org/${esc(p.doi)}" target="_blank" rel="noopener">DOI: ${esc(p.doi)}</a></div>` : ""}
      </div>`;
    }
    $("pubs").innerHTML = html;
  }
  $("pub-filter").addEventListener("input", (e) => renderPubs(e.target.value));

  const extra = (S.extraPublications || []).map((p) => ({ ...p, year: String(p.year || "") }));
  const finish = () => {
    pubs = pubs.concat(extra).sort((a, b) => (b.year || "0").localeCompare(a.year || "0"));
    renderPubs();
  };

  if (S.orcid && !/^0000-0000-0000-0000$/.test(S.orcid)) {
    $("orcid-src").textContent = "Synced from ORCID ↗";
    $("orcid-src").href = "https://orcid.org/" + S.orcid;
    fetch(`https://pub.orcid.org/v3.0/${S.orcid}/works`, { headers: { Accept: "application/json" } })
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then((data) => {
        pubs = (data.group || []).map((g) => {
          const w = g["work-summary"][0];
          const ids = (g["external-ids"]?.["external-id"] || w["external-ids"]?.["external-id"] || []);
          const doi = ids.find((i) => i["external-id-type"] === "doi");
          return {
            title: w.title?.title?.value || "Untitled",
            venue: w["journal-title"]?.value || "",
            year: w["publication-date"]?.year?.value || "",
            type: (w.type || "").replace(/-/g, " "),
            doi: doi ? doi["external-id-value"].replace(/^https?:\/\/(dx\.)?doi\.org\//, "") : "",
            url: w.url?.value || "",
          };
        });
        finish();
      })
      .catch(() => {
        finish();
        if (!pubs.length) $("pubs").innerHTML =
          `<p class="muted">Couldn't reach ORCID right now. See the full list at <a href="https://orcid.org/${esc(S.orcid)}">orcid.org/${esc(S.orcid)}</a>.</p>`;
      });
  } else {
    finish();
    if (!pubs.length) $("pubs").innerHTML = '<p class="muted">Add your ORCID iD in <code>assets/config.js</code> to list publications automatically.</p>';
  }

  // Notebooks
  $("nb-list").innerHTML = (S.notebooks || []).map((nb) => {
    const run = `lab/notebooks/index.html?path=${encodeURIComponent(nb.file)}`;
    const binder = S.binderRepo &&
      `https://mybinder.org/v2/gh/${S.binderRepo}/HEAD?labpath=notebooks%2F${encodeURIComponent(nb.file)}`;
    return `<div class="card">
      <h3>${esc(nb.title)}</h3><p>${esc(nb.description)}</p>
      <div class="btns">
        <a class="btn" href="${run}" target="_blank" rel="noopener">▶ Run in browser</a>
        <a class="btn ghost" href="notebooks/${esc(nb.file)}" download>Download</a>
        ${binder ? `<a class="btn ghost" href="${binder}" target="_blank" rel="noopener">Binder</a>` : ""}
      </div></div>`;
  }).join("");
})();
