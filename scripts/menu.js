const PAGES = [
  { title: "generative art", href: "generative-art/" },
  { title: "about", href: "about/" }
];

const button = document.createElement("button");
button.className = "menu-button";
button.innerHTML = "&#9776;";
button.setAttribute("aria-label", "Menu");
document.body.appendChild(button);

const backdrop = document.createElement("div");
backdrop.className = "menu-backdrop";
document.body.appendChild(backdrop);

const drawer = document.createElement("div");
drawer.className = "menu-drawer";
drawer.innerHTML = `
  <div class="menu-drawer-content">
    <ul>
      ${PAGES.map((p) => `<li><a data-href="${p.href}">${p.title}</a></li>`).join("")}
    </ul>
  </div>
`;
document.body.appendChild(drawer);

const iframe = document.querySelector("iframe");

function openMenu() {
  drawer.classList.add("open");
  backdrop.classList.add("open");
}

function closeMenu() {
  drawer.classList.remove("open");
  backdrop.classList.remove("open");
}

button.addEventListener("click", () => {
  drawer.classList.contains("open") ? closeMenu() : openMenu();
});

backdrop.addEventListener("click", () => closeMenu());

drawer.addEventListener("click", (e) => {
  const a = e.target.closest("a[data-href]");
  if (!a) return;
  e.preventDefault();
  const href = a.dataset.href;
  if (iframe) {
    iframe.src = href;
    window.location.hash = href;
  }
  closeMenu();
});

if (iframe) {
  const hash = window.location.hash.slice(1);
  if (hash && PAGES.some((p) => p.href === hash)) {
    iframe.src = hash;
  }
}

window.addEventListener("hashchange", () => {
  if (!iframe) return;
  const hash = window.location.hash.slice(1);
  if (hash && PAGES.some((p) => p.href === hash)) {
    iframe.src = hash;
  }
});
