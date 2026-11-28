// Configuración del sitio: cambiar aquí si cambia la cuenta o se añade un juego.
const CFG = {
  github: "alesssro",
  repo: "alesssro.github.io",          // el mismo repositorio sirve la web (GitHub Pages) y los parches (Releases)
  kofi: "alesssro",                    // usuario de Ko-fi (ko-fi.com/<usuario>); vacío = botones ocultos
  // juego -> etiqueta del release y nombres de los archivos subidos
  juegos: {
    "knights-in-the-nightmare": { tag: "knights-in-the-nightmare-v1.0.2", win: "Parche-Knights-in-the-Nightmare-Espanol.exe", linux: "Parche-Knights-in-the-Nightmare-Espanol-Linux-SteamDeck" },
    "namco-x-capcom": { tag: "namco-x-capcom-v1.3", win: "Parche-Namco-x-Capcom-Espanol.exe", linux: "Parche-Namco-x-Capcom-Espanol-Linux-SteamDeck" },
    "stella-deus":    { tag: "stella-deus-v1.2",    win: "Parche-Stella-Deus-Espanol.exe",    linux: "Parche-Stella-Deus-Espanol-Linux-SteamDeck" },
    "vandal-hearts":  { tag: "vandal-hearts-v1.0",  win: "Parche-Vandal-Hearts-Espanol.exe",  linux: "Parche-Vandal-Hearts-Espanol-Linux-SteamDeck" },
    "eternal-eyes":   { tag: "eternal-eyes-v1.0",   win: "Parche-Eternal-Eyes-Espanol.exe",   linux: "Parche-Eternal-Eyes-Espanol-Linux-SteamDeck" },
  },
};

const base = `https://github.com/${CFG.github}/${CFG.repo}`;

// botones de descarga de cada juego (enlazan directamente a GitHub, que sirve los archivos desde su red mundial)
document.querySelectorAll(".descargas").forEach((caja) => {
  const j = CFG.juegos[caja.dataset.juego];
  if (!j) return;
  const url = (f) => `${base}/releases/download/${j.tag}/${f}`;
  const tam = caja.dataset.tam ? ` <small>${caja.dataset.tam}</small>` : "";
  caja.innerHTML =
    `<a class="boton descarga" href="${url(j.win)}">⬇ Windows${tam}</a>` +
    `<a class="boton descarga secundario" href="${url(j.linux)}">⬇ Linux / Steam Deck${tam}</a>` +
    `<a class="mini" href="${url(j.win.replace(".exe", ".xdelta"))}">Parche .xdelta</a>` +
    `<a class="mini" href="${base}/releases/tag/${j.tag}">Notas de la versión</a>`;
});

// Ko-fi (si aún no hay cuenta, se ocultan los botones y la sección de apoyo) y página de avisos
if (!CFG.kofi) {
  document.querySelectorAll("[data-kofi], #apoyar").forEach((e) => (e.style.display = "none"));
}
if (CFG.kofi) document.querySelectorAll("[data-kofi]").forEach((a) => {
  a.href = `https://ko-fi.com/${CFG.kofi}`;
  a.target = "_blank";
  a.rel = "noopener";
});
document.querySelectorAll("[data-github-issues]").forEach((a) => (a.href = `${base}/issues`));

// galería: clic en una captura para verla en grande
document.querySelectorAll(".galeria img").forEach((img) => {
  img.addEventListener("click", () => {
    const v = document.createElement("div");
    v.className = "visor";
    v.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
    v.addEventListener("click", () => v.remove());
    document.body.appendChild(v);
  });
});
