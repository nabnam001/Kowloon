import type { Dish } from "@/data/menu";
import { CUISINE_LABELS } from "@/data/menu";
import type { DrinkItem, Wine } from "@/data/drinks";
import type { ModalItem } from "@/components/ItemModal";
import type { Lang } from "@/data/i18n";

export function dishToModal(d: Dish, lang: Lang): ModalItem {
  return {
    kind: "dish",
    id: `dish-${d.id}`,
    number: d.id,
    img: d.hasImage ? `/images/dishes/${d.id}.png` : undefined,
    category: CUISINE_LABELS[d.cuisine][lang],
    name: d.name,
    price: d.price,
    desc: d.desc,
    spice: d.spice,
    veg: d.veg,
    vegan: d.vegan,
    isNew: d.isNew,
    allergens: d.allergens,
  };
}

export function drinkToModal(d: DrinkItem, label: string): ModalItem {
  const desc = d.lines
    ? d.lines.map((l) => `${l.label} ${l.price},-`).join(" · ")
    : undefined;
  return {
    kind: "drink",
    id: `drink-${d.name}`,
    img: d.img ? `/images/drinks/${d.img}.png` : undefined,
    category: label,
    name: d.name,
    price: d.price,
    desc,
    options: d.options,
  };
}

export function wineToModal(w: Wine, label: string): ModalItem {
  return {
    kind: "wine",
    id: `wine-${w.id}`,
    img: w.img ? `/images/wine/${w.img}.${w.ext ?? "png"}` : undefined,
    category: label,
    type: w.type,
    name: w.name,
    price: w.price,
    desc: w.desc,
  };
}
