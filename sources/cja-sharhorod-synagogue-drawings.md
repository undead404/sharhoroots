---
schema_version: 1
id: SRC-cja-sharhorod-synagogue-drawings
title: "Drawings of the Great Synagogue in Sharhorod"
type: primary
language: "англійська"
url: "https://cja.huji.ac.il/browser.php?id=20264&mode=set"
local_copy: books/cja-sharhorod-synagogue/drawings
last_checked: "2026-11-27"
artifacts:
  - path: sources/texts/cja-sharhorod-synagogue-drawings/201915-list-ocr.txt
    kind: ocr
    locator: "CJA 201915, перелік креслень у нижній правій частині"
    provenance: "2026-11-27, із завантаженого JPG оригінального розміру. Локально обрізано таблицю, збільшено й розпізнано з параметрами -l eng --psm 11. Сирий текст."
    engine: "Tesseract 5.5.4"
    status: unverified
  - path: sources/texts/cja-sharhorod-synagogue-drawings/201915-list-user.txt
    kind: transcription
    locator: "CJA 201915 / a_06796, перелік креслень у нижній правій частині, позиції 0–11"
    provenance: "2026-11-27, дослівне читання надав користувач після звірки оригіналу. Позначки рівнів збережено в отриманій формі."
    status: user_provided
inspected:
  - locator: "CJA 20264, перелік зображень 201915–201926"
    basis: catalog
    note: "Перевірено 12 позицій у каталозі й збережено кожне зображення в оригінальному розмірі. Окремих назв аркушів у полях каталогу немає."
  - locator: "CJA 201915, загальні відомості"
    basis: machine_only
    note: "Локальний OCR зчитує дату обмірів як жовтень–листопад 1992 року. Цю частину аркуша ще не звірено з оригіналом."
  - locator: "CJA 201915 / a_06796, The List of Drawings, позиції 0–11"
    basis: user_reading
    note: "У переліку є загальні відомості, два плани ярусів, чотири фасади, три розрізи й два аркуші деталей. Окремого плану підвалу в переліку немає. Це встановлює склад комплекту за назвами. Геометрію розрізів і зміст позначок висот окремо не встановлено."
---

# Обмірні креслення Великої синагоги в Шаргороді

## Чинний стан і межі опрацювання

Комплект придатний для подальшого дослідження планування, фасадів та інтер’єру синагоги. Поле дати в каталозі стосується архітектурної пам’ятки. Дату виконання обмірів слід звіряти з самим аркушем, а окремі позначки рівнів — із відповідними планами й розрізами.

## Корисні локатори

- `201915`, негатив `a_06796` — загальні відомості про обміри та список аркушів. [Аркуш у каталозі](https://cja.huji.ac.il/browser.php?mode=alone&id=201915).
- `201916–201926` — решта креслень комплекту. [Усі позиції каталогу](https://cja.huji.ac.il/browser.php?mode=set&id=20264&sort=DESC&many=100).

## Пов’язані джерела й дослідження

- [Супровідний опис синагоги](cja-sharhorod-synagogue-description.md).
- [Дослідження підземель](../tasks/research-sharhorod-synagogue-underground.md).
