// Display labels only. Canonical tags remain in frontmatter, URLs and search data.
export const tagLabels: Record<string, string> = {
  area: "Територія",
  catholicism: "Римо-католицизм",
  city: "Місто",
  "civil-registry": "Державна реєстрація актів цивільного стану",
  defunct: "Припинило існування",
  "eastern-orthodox": "Православ’я",
  governorate: "Губернія",
  "greek-catholic": "Греко-католицизм",
  hamlet: "Присілок",
  judaism: "Юдаїзм",
  khutir: "Хутір",
  monastery: "Монастир",
  oblast: "Область",
  orthodox: "Православ’я",
  raion: "Район",
  suburb: "Передмістя",
  town: "Містечко",
  uezd: "Повіт",
  village: "Село",
  volost: "Волость",
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
  abstract: "Короткий виклад",
  summary: "Короткий виклад",
  tldr: "Короткий виклад",
  info: "Інформація",
  todo: "Завдання",
  tip: "Порада",
  hint: "Порада",
  important: "Важливо",
  success: "Успішно",
  check: "Успішно",
  done: "Виконано",
  question: "Питання",
  help: "Допомога",
  faq: "Поширені питання",
  warning: "Застереження",
  caution: "Обережно",
  attention: "Увага",
  failure: "Невдача",
  fail: "Невдача",
  missing: "Відсутнє",
  danger: "Небезпека",
  error: "Помилка",
  bug: "Помилка",
  example: "Приклад",
  quote: "Цитата",
  cite: "Цитата",
  figure: "Ілюстрація",
};
