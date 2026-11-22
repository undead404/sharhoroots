import { searchLabels, tagLabel } from "./uk";

// Community search currently hardcodes its dynamic messages. Adapt its DOM output,
// leaving data-tag, search queries, click handlers and the content index intact.
function localizeSearch(search: Element) {
  for (const element of search.querySelectorAll(
    "[aria-label], [placeholder]",
  )) {
    for (const attribute of ["aria-label", "placeholder"]) {
      const value = element.getAttribute(attribute);
      if (value && searchLabels[value])
        element.setAttribute(attribute, searchLabels[value]);
    }
  }
  for (const element of search.querySelectorAll(".no-match h3, .no-match p")) {
    const value = element.textContent ?? "";
    if (searchLabels[value]) element.textContent = searchLabels[value];
  }
  for (const element of search.querySelectorAll(
    ".tag-suggestion-item[data-tag]",
  )) {
    const label = `#${tagLabel(element.getAttribute("data-tag")!)}`;
    if (element.textContent !== label) element.textContent = label;
  }
  for (const element of search.querySelectorAll(".result-card .tags p")) {
    const value = element.textContent ?? "";
    const label = value.startsWith("#")
      ? `#${tagLabel(value.slice(1))}`
      : value;
    if (value !== label) element.textContent = label;
  }
}

let observers: MutationObserver[] = [];
function install() {
  for (const observer of observers) observer.disconnect();
  observers = [];
  if (document.documentElement.lang !== "uk") return;
  for (const search of document.querySelectorAll(".search")) {
    localizeSearch(search);
    const observer = new MutationObserver(() => localizeSearch(search));
    observer.observe(search, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["aria-label", "placeholder"],
    });
    observers.push(observer);
  }
}

document.addEventListener("nav", install);
document.addEventListener("render", install);
install();
