const mobile = window.matchMedia("(max-width: 800px)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const triggerSelector = ".sidebar.left .explorer-toggle.mobile-explorer";
let openPanel: { close: () => void; dismiss: () => void } | undefined;

document.addEventListener("nav", () => {
  for (const trigger of document.querySelectorAll(triggerSelector)) {
    trigger.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener(
  "click",
  (event) => {
    if (!mobile.matches || !(event.target instanceof Element)) return;

    const trigger = event.target.closest<HTMLButtonElement>(triggerSelector);
    const explorer = trigger?.closest(".explorer");
    const sidebar = explorer?.closest(".sidebar.left");
    const treeId = trigger?.getAttribute("aria-controls");
    const tree = treeId && document.getElementById(treeId);
    if (!trigger || !explorer || !sidebar?.parentElement || !tree) return;

    // Use the same trigger for both states without toggling Quartz's desktop tree.
    event.stopPropagation();
    if (openPanel) {
      openPanel.dismiss();
      return;
    }

    const title = sidebar.querySelector(":scope > .page-title");
    const background = [
      ...sidebar.parentElement.children,
      ...sidebar.children,
    ].filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement &&
        element !== sidebar &&
        element !== explorer &&
        element !== title &&
        !element.inert,
    );
    for (const element of background) element.inert = true;

    const label = trigger.getAttribute("aria-label") || "Explorer";
    trigger.setAttribute("aria-expanded", "true");
    trigger.setAttribute(
      "aria-label",
      document.documentElement.lang === "uk"
        ? "Закрити провідник"
        : "Close explorer",
    );
    trigger.focus({ preventScroll: true });
    const positionTree = () => {
      const bottom = Math.max(
        trigger.getBoundingClientRect().bottom,
        title?.getBoundingClientRect().bottom ?? 0,
      );
      const rowGap = Number.parseFloat(getComputedStyle(sidebar).rowGap) || 0;
      tree.style.setProperty("--mobile-explorer-top", `${bottom + rowGap}px`);
    };
    positionTree();
    const layout = new ResizeObserver(positionTree);
    layout.observe(sidebar);
    tree.classList.add("mobile-explorer-panel");
    tree.setAttribute("aria-expanded", "true");
    const slide = tree.animate(
      [{ transform: "translateX(-100%)" }, { transform: "translateX(0)" }],
      {
        duration: reducedMotion.matches ? 0 : 220,
        easing: "ease-in-out",
        fill: "both",
      },
    );
    const close = () => {
      slide.onfinish = null;
      slide.cancel();
      layout.disconnect();
      tree.classList.remove("mobile-explorer-panel");
      tree.style.removeProperty("--mobile-explorer-top");
      tree.setAttribute("aria-expanded", "false");
      trigger.setAttribute("aria-expanded", "false");
      trigger.setAttribute("aria-label", label);
      for (const element of background) element.inert = false;
      openPanel = undefined;
      if (mobile.matches) trigger.focus({ preventScroll: true });
    };
    const dismiss = () => {
      if (reducedMotion.matches) {
        close();
      } else if (!slide.onfinish) {
        slide.onfinish = close;
        slide.reverse();
      }
    };
    openPanel = { close, dismiss };
    tree.querySelector(".active")?.scrollIntoView({ block: "nearest" });
  },
  { capture: true },
);

document.addEventListener(
  "keydown",
  (event) => {
    if (!openPanel) return;
    if (event.key === "Escape") {
      event.preventDefault();
      openPanel.dismiss();
    } else if (
      (event.ctrlKey || event.metaKey) &&
      event.key.toLowerCase() === "k"
    ) {
      openPanel.close();
    }
  },
  { capture: true },
);
document.addEventListener("prenav", () => openPanel?.close());
mobile.addEventListener("change", () => openPanel?.close());
