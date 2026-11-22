// Display labels only. Canonical tags remain in frontmatter, URLs and search data.
export const tagLabels: Record<string, string> = {
  area: "територія",
  catholicism: "римо-католицизм",
  city: "місто",
  "civil-registry": "рацс",
  defunct: "не-діє",
  "eastern-orthodox": "православ’я",
  governorate: "губернія",
  "greek-catholic": "греко-католицизм",
  hamlet: "присілок",
  judaism: "юдаїзм",
  khutir: "хутір",
  monastery: "монастир",
  oblast: "область",
  orthodox: "православ’я",
  raion: "район",
  suburb: "передмістя",
  town: "містечко",
  uezd: "повіт",
  village: "село",
  volost: "волость",
};

export function tagLabel(tag: string): string {
  return (
    tagLabels[tag] ??
    tag
      .split("/")
      .map((part) => tagLabels[part] ?? part)
      .join(" / ")
  );
}

export const searchLabels: Record<string, string> = {
  Search: "Пошук",
  "Шукати щось": "Пошук на сайті…",
  "Search results": "Результати пошуку",
  "Tag suggestions": "Підказки тегів",
  "No results.": "Нічого не знайдено.",
  "Try another search term?": "Спробуйте інший пошуковий запит.",
  "Filter by tag": "Фільтрувати за тегом",
  "No matching tags": "Відповідних тегів не знайдено",
};

export const calloutLabels: Record<string, string> = {
  note: "Примітка",
  abstract: "Автореферат",
  summary: "Підсумок",
  tldr: "Короткий виклад",
  info: "Інформація",
  todo: "Завдання",
  tip: "Порада",
  hint: "Підказка",
  important: "Важливо",
  success: "Успішно",
  check: "Галка",
  done: "Виконано",
  question: "Питання",
  help: "Допомога",
  faq: "ЧаПи",
  warning: "Застереження",
  caution: "Обережно",
  attention: "Увага",
  failure: "Невдача",
  fail: "Невдача",
  missing: "Відсутнє",
  danger: "Небезпека",
  error: "Помилка",
  bug: "Вада",
  example: "Приклад",
  quote: "Витяг",
  cite: "Цитата",
  figure: "Ілюстрація",
};
