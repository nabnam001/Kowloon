import type { Dish } from "@/data/menu";
import { CUISINE_LABELS, localizeDish } from "@/data/menu";
import type { DrinkItem, Wine } from "@/data/drinks";
import { localizeDrink, localizeWine } from "@/data/drinks";
import type { ModalItem } from "@/components/ItemModal";
import type { Lang } from "@/data/i18n";

export function dishToModal(d: Dish, lang: Lang): ModalItem {
  const loc = localizeDish(d, lang);
  return {
    kind: "dish",
    id: `dish-${d.id}`,
    number: d.id,
    img: d.hasImage ? `/images/dishes/${d.id}.png` : undefined,
    category: CUISINE_LABELS[d.cuisine][lang],
    name: loc.name,
    price: d.price,
    desc: loc.desc,
    spice: d.spice,
    veg: d.veg,
    vegan: d.vegan,
    isNew: d.isNew,
    allergens: d.allergens,
  };
}

export function drinkToModal(d: DrinkItem, label: string, lang: Lang): ModalItem {
  const dl = localizeDrink(d, lang);
  const desc = dl.lines
    ? dl.lines.map((l) => `${l.label} ${l.price},-`).join(" · ")
    : undefined;
  return {
    kind: "drink",
    id: `drink-${d.name}`,
    img: d.img ? `/images/drinks/${d.img}.png` : undefined,
    category: label,
    name: dl.name,
    price: d.price,
    desc,
    options: dl.options,
  };
}

export function wineToModal(w: Wine, label: string, lang: Lang): ModalItem {
  const wl = localizeWine(w, lang);
  return {
    kind: "wine",
    id: `wine-${w.id}`,
    img: w.img ? `/images/wine/${w.img}.${w.ext ?? "png"}` : undefined,
    category: label,
    type: wl.type,
    name: wl.name,
    price: w.price,
    desc: wl.desc,
  };
}
