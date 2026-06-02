// Copies the original Kowloon assets (with messy unicode/space filenames)
// into clean, web-safe paths under /public. Run automatically before dev/build.
import { copyFile, mkdir, access } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const DISHES_OUT = path.join(ROOT, "public", "images", "dishes");
const DRINKS_OUT = path.join(ROOT, "public", "images", "drinks");
const WINE_OUT = path.join(ROOT, "public", "images", "wine");
const BRAND_OUT = path.join(ROOT, "public", "brand");
const VENUE_OUT = path.join(ROOT, "public", "images", "venue");

// id -> source path (relative to project root)
const dishMap = {
  // Forretter
  "1": "forretter/luksus_forårsrulle.png",
  "2a": "forretter/grillstegte_muslinger.png",
  "3": "forretter/friturestegt_wanton.png",
  "4": "forretter/hønsekødssuppe.png",
  "10a": "forretter/dampet_bao.png",
  "15a": "forretter/indbagt_kylling.png",
  "31a": "forretter/wanton_suppe_kina.png",
  "32a": "thailand/tom_kha_kai.png",
  "33a": "thailand/suki_yaki.png",
  "37a": "forretter/tom-yum_goong.png",
  "42a": "forretter/sate-kai_(3 stk.).png",
  "70": "forretter/cha_gio_(4 stk.).png",
  "71": "forretter/goi_cuon_(2stk.).png",
  "72": "forretter/kina_rejer_(3stk.).png",
  // Kina
  "5": "kina/wokret_med_kylling-i_østerssauce.png",
  "6": "kina/wokret_med_oksekød_i_østerssauce.png",
  "7": "kina/wokret_med_skinke_og_rejer.png",
  "8": "kina/wokret_med_oksekød_og_runde_nudler.png",
  "9": "kina/wokret_med_kylling_og_stegte_ris.png",
  "12": "kina/wokret_med_kylling_og_ingefær_i_østerssauce.png",
  "13": "kina/kylling_i_gul_karry.png",
  "15": "kina/indbagt _kylling.png",
  "17": "thailand/oksekød_i_rød_karry.png",
  "19": "kina/store_indbagte_kinarejer.png",
  "20": "kina/omelet_med_kylling_grøntsager_i_gul_karry.png",
  "21": "kina/and_ala_peking.png",
  "22": "kina/stegt_and_i_østerssauce.png",
  // Thailand
  "32": "thailand/tom_kha_kai.png",
  "33": "thailand/suki_yaki.png",
  "37": "thailand/tom_yum_goong.png",
  "38": "thailand/phat_se_ew.png",
  "39": "thailand/rad_naa.png",
  "40": "vegetar/phat_thai.png",
  "41": "vegetar/phat_kii_mao.png",
  "42": "thailand/sate_kai_(4stk.).png",
  "44": "thailand/kylling_med_cashewnødder_og_grøntsager_i_østerssauce.png",
  "45": "thailand/kylling_med_grøntsager_i_østerssauce.png",
  "46": "thailand/kylling_i_panang_karry.png",
  "47": "thailand/kylling_i_grøn_karry.png",
  "48": "thailand/oksekød_i_rød_karry_og_kokosmælk.png",
  "51": "thailand/oksekød_i_rød_karry.png",
  "52": "thailand/oksefilet_i_østerssauce.png",
  "53": "thailand/oksekød_i_rød_karry_v.png",
  "54": "thailand/lynstegt_oksefilet_og_pak_choi _i_østerssauce.png",
  "55": "thailand/oksekød_og_grøntsager_i_østerssauce.png",
  "56": "thailand/stegte_små_ribbensteg_og_pak_choi_i_østerssauce.png",
  "59": "thailand/gul_karry_med_blæksprutte_rejer_og_kammuslinger.png",
  "60": "thailand/and_i_matsaman_karry.png",
  "62": "thailand/som_tam.png",
  "64": "thailand/oksekødssalat_i_fiskesauce.png",
  // Vietnam
  "29": "vietnam/mì_quảng_vịt_xá_xíu.png",
  "31": "vietnam/wanton_suppe_vietnam.png",
  "34": "vietnam/phở_bò_tái.png",
  "36": "vietnam/hủ_tiếu_nam_vang.png",
  "63": "vietnam/bún_tàu_xào_trứng_thịt_gà.png",
  "74": "vietnam/pho_ga.png",
  "77": "vietnam/bún-bò_huế.png",
  "78": "vietnam/hủ_iếu_bò_kho.png",
  "79": "vietnam/bún_bò.png",
  "80": "vietnam/bánh_canh_thit_Xá_xiu_NYHED.png",
  "81": "vietnam/bánh_xèo.png",
  "82": "vietnam/bún_thịt_nướng_chả_giò.png",
  "84": "vietnam/com_suon_cha.png",
  "86": "vietnam/bún _riêu.png",
  "87": "vietnam/bánh_hỏi_thịt_heo_chả_giò.png",
  "88": "vietnam/bún_mắm.png",
  "89": "vietnam/mì_vịt_tiềm.png",
  "95": "vietnam/bánh_canh_cua_thit_heo_NYHED.png",
  // Vegetar
  "70v": "vegetar/cha_gio_vegetar_(forret).png",
  "71v": "vegetar/Goi_cuon_vegetar_(forret).png",
  "6v": "vegetar/wokret_med_tofu_i_østerssauce_(hovedret).png",
  "9v": "vegetar/wokret_med_tofu_æg_og_stegte_ris_(hovedret).png",
  "17v": "vegetar/wokret_med_grønt_sager_og_tofu_i_rød_karry_(hovedret).png",
  "38v": "vegetar/phat_se_ew_vegetar_(hovedret).png",
  "40v": "vegetar/phat_thai.png",
  "41v": "vegetar/phat_kii_mao.png",
  "51v": "vegetar/wokret_med_stegt_tofu_og_lange_bønner_i_østerssauce_(hovedret).png",
  "65v": "vegetar/wokret_med_stegt_tofu_og_pak_choi_i_østerssauce_(hovedret).png",
  "66v": "vegetar/wokret_med_grøntsager_og_tofu_i_gul_karry_(hovedret).png",
  "34v": "vegetar/grøntsagssuppe_med_nudler_NYHED-vegetar_(hovedret).png",
  "89v": "vegetar/kinesisk_grøntsagssuppe_med_tofu_NYHED_vegetar_(hovedret).png",
  // Grill
  "90": "grill/1:2_grillstegt_kylling_og_pommes_frites.png",
  "91": "grill/2_fiskefiletter_og_pommes_frites.png",
  "92": "grill/lille_bakke_pommes_frites.png",
  "93": "grill/stor_bakke_pommes_frites.png",
  // Desserter
  "101": "desserter/friturestegt_banan_med_is.png",
  "102": "desserter/friturestegt_pandekage_med_is.png",
  "103": "desserter/frisk_banan_med_is.png",
  "104": "desserter/frisk_frugt_med_is.png",
  "105": "desserter/friturestegt_ananas_med_is.png",
  "106": "desserter/blandede_friske_frugter_med_hjemmelavet_creme.png",
};

const drinkMap = {
  milkshake: "Drikkevarer/Milkshake.png",
  "cola-stor": "Drikkevarer/Coca-Cola-50-cl-plastikflaske-24-stk-bestil-hos-Billigfadoel-removebg-preview.png",
  "cola-zero-stor": "Drikkevarer/Coca-Cola-Zero-50-cl-plastikflaske-24-stk-bestil-hos-Billigfadoel-removebg-preview.png",
  "cola-lille": "Drikkevarer/gl_cola.webp.png",
  "cola-zero-lille": "Drikkevarer/Coca-Cola-Zero-Sugar-Flaske-25-cl-57095998-v4-removebg-preview.png",
  sprite: "Drikkevarer/Sprite-25-cl-glasflaske-30-stk-kasse-billigfadoel-removebg-preview.png",
  danskvand: "Drikkevarer/ramlosa-citrus-50cl__TrimW10_PadWzYwMCw2MzIsIkZGRkZGRiIsMTAwXQ.png",
  appelsinjuice: "Drikkevarer/Rynkeby-Appelsinjuice-25cl-removebg-preview.png",
  cocio: "Drikkevarer/REN2305-00654-BIC-7351491-1-FO-DQ23-250ml-RGB-FR-DEN-W-57089652-v3__TrimW10_FitWzEwMDAsODAwXQ.png",
  vand: "Drikkevarer/vand.png",
  "ol-saigon": "Drikkevarer/Saigon_vietnamesisk.png",
  "ol-singha": "Drikkevarer/Singha_thailandsk.png",
  "ol-tsingtao": "Drikkevarer/Tsingtao_kinesisk.png",
  "ol-tuborg-pilsner": "Drikkevarer/Tuborg_pilsner.png",
  "ol-tuborg-classic": "Drikkevarer/Tuborg_classic.png",
  "fadol-classic": "Drikkevarer/classic_40cl-Photoroom-removebg-preview.png",
  "kaffe-te": "Drikkevarer/kaffe_og_te.png",
};

const wineMap = {
  "vin-lille": "vin/vin25cl-removebg-preview.png",
  "201": "vin/les-gres-chardonnay-viognier-2025-removebg-preview.png",
  "202": "vin/chardonnay-extrait-de-romarion-2023-removebg-preview.png",
  "203": "vin/oppenheimer-riesling-feinherb-2024-louis-guntrum-removebg-preview.png",
  "204": "vin/chardonnay-extrait-de-romarion-2023-removebg-preview.png",
  "205": "vin/les-amours-d-haut-gleon-grenache-syrah-rose-2024.webp",
  "206": "vin/le-versant-grenache-rose-removebg-preview.png",
  "207": "vin/primitivo-2024-duca-del-salento-san-donaci-removebg-preview.png",
  "208": "vin/valpolicella-superiore-2021-villa-mattielli-removebg-preview.png",
  "209": "vin/Pagos-de-Araiz-Front-Bottle-removebg-preview.png",
  "210": "vin/2023-pas-si-vite-grande-reserve-g-s-m.webp",
  "211": "vin/contrada-del-falco-2021-san-donaci-removebg-preview.png",
  "212": "vin/cava-nu-allonge-semi-sec-emendis-removebg-preview.png",
};

const brandMap = {
  "logo.svg": "frederiksgade/logo.svg",
  "forret.svg": "forret.svg",
  "hovedret.svg": "hovedret.svg",
  "dessert.svg": "dessert.svg",
  "chilli1.png": "chilli1-removebg-preview.png",
  "chilli2.png": "chilli2-removebg-preview.png",
  "chilli3.png": "chilli3-removebg-preview.png",
  "elite-smiley.png": "EliteSmiley.png",
  "dragon.png": "banegaardsgade/logo_art.png",
  "map-denmark.svg": "banegaardsgade/denmark.svg",
  "map-china.svg": "banegaardsgade/china.svg",
  "map-thailand.svg": "banegaardsgade/thailand.svg",
  "map-vietnam.svg": "banegaardsgade/vietnam.svg",
  "wave.avif": "banegaardsgade/583b34ac-b7a9-4144-b588-e1a27854f98c.png.avif",
};

// Real interior / ambiance photography (newly provided).
const venueMap = {
  "interior-1": "frederiksgade/restaurantenInside.jpg",
  "interior-2": "frederiksgade/restaurantenInside02.jpg",
  "interior-3": "frederiksgade/restaurantenInside03.jpg",
  "interior-4": "frederiksgade/restaurantenInside04.jpg",
  "interior-bg": "frederiksgade/restaurantenInsideBG-1.jpg",
  "kitchen": "frederiksgade/card1-koekkenet.png",
  "takeaway": "frederiksgade/card2-takeaway.png",
  "front": "frederiksgade/card3-front.png",
  "banegaardsgade-front": "banegaardsgade/banegaardsgade-card1-front.jpg",
  "banegaardsgade-dishes": "banegaardsgade/banegaardsgade-card2-retter.jpg",
  "banegaardsgade-outside": "banegaardsgade/banegaardsgade-card3-outside.jpg",
  "banegaardsgade-interior-1": "banegaardsgade/banegaardsgade-restaurantenInside.jpg",
  "banegaardsgade-interior-2": "banegaardsgade/banegaardsgade-restaurantenInside2.jpg",
  "smoke": "banegaardsgade/display-background-with-smoky-atmosphere/smokey_atmosphere_background_2307.jpg",
};

async function exists(p) {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function copyMap(map, outDir, ext = ".png") {
  await mkdir(outDir, { recursive: true });
  let ok = 0;
  let missing = 0;
  for (const [id, src] of Object.entries(map)) {
    const srcPath = path.join(ROOT, src);
    const srcExt = path.extname(src) || ext;
    const destPath = path.join(outDir, `${id}${srcExt}`);
    if (await exists(srcPath)) {
      await copyFile(srcPath, destPath);
      ok++;
    } else {
      missing++;
      console.warn(`  ⚠ missing source: ${src}`);
    }
  }
  return { ok, missing };
}

async function copyBrand() {
  await mkdir(BRAND_OUT, { recursive: true });
  let ok = 0;
  for (const [dest, src] of Object.entries(brandMap)) {
    const srcPath = path.join(ROOT, src);
    if (await exists(srcPath)) {
      await copyFile(srcPath, path.join(BRAND_OUT, dest));
      ok++;
    } else {
      console.warn(`  ⚠ missing brand asset: ${src}`);
    }
  }
  return ok;
}

async function copyVenue() {
  await mkdir(VENUE_OUT, { recursive: true });
  let ok = 0;
  for (const [dest, src] of Object.entries(venueMap)) {
    const srcPath = path.join(ROOT, src);
    const srcExt = path.extname(src);
    if (await exists(srcPath)) {
      const destPath = path.join(VENUE_OUT, `${dest}${srcExt}`);
      await copyFile(srcPath, destPath);
      // The smoke texture ships at 5000px; downscale it for the web overlay.
      if (dest === "smoke") {
        try {
          const { execFileSync } = await import("node:child_process");
          execFileSync("sips", ["-Z", "1600", destPath], { stdio: "ignore" });
        } catch {
          // sips unavailable (non-macOS) — keep the full-size copy.
        }
      }
      ok++;
    } else {
      console.warn(`  ⚠ missing venue photo: ${src}`);
    }
  }
  return ok;
}

console.log("→ Preparing Kowloon image assets...");
const dishes = await copyMap(dishMap, DISHES_OUT);
const drinks = await copyMap(drinkMap, DRINKS_OUT);
const wine = await copyMap(wineMap, WINE_OUT);
const brand = await copyBrand();
const venue = await copyVenue();
console.log(
  `✓ dishes ${dishes.ok}, drinks ${drinks.ok}, wine ${wine.ok}, brand ${brand}, venue ${venue} (dish placeholders for ${dishes.missing} missing)`
);
