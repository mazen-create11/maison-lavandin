/* Maison Lavandin, atelier statique. Menu, filtres, fiches, galerie et panier local (aucun paiement). */
const params = new URLSearchParams(window.location.search);

/* ---------- Catalogue (source unique des prix affichés dans le panier) ---------- */
const CATALOGUE = {
  "coffret": { nom: "Le Coffret Trois Muscs", format: "3 × 6 ml", prix: 20.99, page: "coffret.html", image: "assets/editorial/coffret-ouvert-v1.webp", vignette: "assets/shooting/miniatures/coffret-ouvert-v1.webp" },
  "musc-grenade": { nom: "Musc Grenade", format: "6 ml · sans alcool", prix: 7.99, page: "musc-grenade.html", image: "assets/produits/ml-musc-rouge.webp", vignette: "assets/shooting/miniatures/ml-musc-rouge.webp" },
  "musc-blanc": { nom: "Musc Blanc", format: "6 ml · sans alcool", prix: 7.99, page: "musc-blanc.html", image: "assets/produits/ml-musc-blanc.webp", vignette: "assets/shooting/miniatures/ml-musc-blanc.webp" },
  "musc-aroussa": { nom: "Musc Aroussa", format: "6 ml · sans alcool", prix: 7.99, page: "musc-aroussa.html", image: "assets/produits/ml-musc-vert.webp", vignette: "assets/shooting/miniatures/ml-musc-vert.webp" },
  "attelage": { nom: "L’Attelage de Lavande", format: "Trois paniers garnis", prix: 27.99, page: "attelage-lavande.html", image: "assets/produits/ml-grand-velo.webp", vignette: "assets/shooting/miniatures/ml-grand-velo.webp" },
  "petite-reine": { nom: "La Petite Reine", format: "Un panier garni", prix: 16.99, page: "petite-reine.html", image: "assets/shooting/petite-reine-reference-v4.webp", vignette: "assets/shooting/miniatures/petite-reine-reference-v4.webp" },
  "savon-lavande": { nom: "Savon à la lavande", format: "Savon rectangulaire", prix: 2.99, page: "savon-lavande.html", image: "assets/produits/ml-savon-lavande.webp", vignette: "assets/shooting/miniatures/ml-savon-lavande.webp" },
  "huile-lavandin": { nom: "Roll-on d’huile essentielle de lavandin", format: "Roll-on", prix: 2.99, page: "huile-lavandin.html", image: "assets/produits/ml-huile-lavandin.webp", vignette: "assets/shooting/miniatures/ml-huile-lavandin.webp" },
  "torchons-lavande": { nom: "La Charrette de Lavande", format: "Duo de torchons brodés", prix: 9.99, page: "torchons-provence.html", image: "assets/torchons-lavande.webp", vignette: "assets/shooting/miniatures/torchons-lavande.webp" },
  "torchons-oliveraie": { nom: "La Cigale & l’Olivier", format: "Duo de torchons brodés", prix: 9.99, page: "torchons-provence.html?modele=oliveraie", image: "assets/torchons-oliveraie.webp", vignette: "assets/shooting/miniatures/torchons-oliveraie.webp" },
  "quatuor-savons": { nom: "Coffret de 4 savons", format: "Monoï, citron, passion, lavande", prix: 8.9, page: "quatuor-savons.html", image: "assets/quatuor-savons.webp", vignette: "assets/shooting/miniatures/quatuor-savons.webp" },
  "brume-candy": { nom: "Brume Candy", format: "250 ml", prix: 9.99, page: "brume-candy.html", image: "assets/produits/ml-spray-candy-carre.webp", vignette: "assets/shooting/miniatures/ml-spray-candy.webp" },
  "brume-ylang": { nom: "Brume Ylang", format: "250 ml", prix: 9.99, page: "brume-ylang.html", image: "assets/produits/ml-spray-ylang-carre.webp", vignette: "assets/shooting/miniatures/ml-spray-ylang.webp" },
  "brume-pinky": { nom: "Brume Pinky", format: "250 ml", prix: 9.99, page: "brume-pinky.html", image: "assets/produits/ml-spray-pinky-carre.webp", vignette: "assets/shooting/miniatures/ml-spray-pinky.webp" },
  "brume-sprint": { nom: "Brume Sprint", format: "250 ml", prix: 9.99, page: "brume-sprint.html", image: "assets/produits/ml-spray-sprint-carre.webp", vignette: "assets/shooting/miniatures/ml-spray-sprint.webp" },
  "brume-aqua": { nom: "Brume Aqua", format: "250 ml", prix: 9.99, page: "brume-aqua.html", image: "assets/produits/ml-spray-aqua-carre.webp", vignette: "assets/shooting/miniatures/ml-spray-aqua.webp" },
  /* ---------- Catalogue élargi le 15/09/2026 ---------- */
  "torchons-flamants": { nom: "Le Flamant & la Carafe", format: "Duo de torchons brodés", prix: 9.99, page: "torchons-provence.html?modele=flamants", image: "assets/produits/ml-torchons-provence-duo-01.webp", vignette: "assets/shooting/miniatures/ml-torchons-provence-duo-01.webp" },
  "bain-moussant-lait-anesse": { nom: "Bain moussant au lait d’ânesse", format: "500 ml, mousse abondante sous le jet", prix: 11.99, page: "bain-moussant-lait-anesse.html", image: "assets/produits/ml-bain-moussant-anesse-01.webp", vignette: "assets/shooting/miniatures/ml-bain-moussant-anesse-01.webp" },
  "coffret-mini-savons": { nom: "Coffret de 10 mini savons", format: "10 × 30 g, étui à fenêtre", prix: 9.99, page: "coffret-mini-savons.html", image: "assets/produits/ml-coffret-mini-savons-01.webp", vignette: "assets/shooting/miniatures/ml-coffret-mini-savons-01.webp" },
  "coffret-savons-sculptes-olive-laurier": { nom: "Coffret de 4 savons sculptés", format: "4 × 30 g, formes sculptées", prix: 11.99, page: "coffret-savons-sculptes-olive-laurier.html", image: "assets/produits/ml-coffret-savons-sculptes-01.webp", vignette: "assets/shooting/miniatures/ml-coffret-savons-sculptes-01.webp" },
  "creme-mains-visage-lait-anesse-argan": { nom: "Crème mains et visage ânesse et argan", format: "Pot de 100 ml, karité, senteur lait", prix: 9.99, page: "creme-mains-visage-lait-anesse-argan.html", image: "assets/produits/ml-creme-mains-visage-anesse-argan-01.webp", vignette: "assets/shooting/miniatures/ml-creme-mains-visage-anesse-argan-01.webp" },
  "creme-mains-visage-lavande-bio": { nom: "Crème mains et visage lavande", format: "Pot de 100 ml, karité et lavande vraie", prix: 9.99, page: "creme-mains-visage-lavande-bio.html", image: "assets/produits/ml-creme-mains-visage-lavande-01.webp", vignette: "assets/shooting/miniatures/ml-creme-mains-visage-lavande-01.webp" },
  "creme-mains-visage-monoi-lait-anesse": { nom: "Crème mains et visage monoï", format: "Pot de 100 ml, fleur de tiaré et coco", prix: 9.99, page: "creme-mains-visage-monoi-lait-anesse.html", image: "assets/produits/ml-creme-mains-visage-monoi-01.webp", vignette: "assets/shooting/miniatures/ml-creme-mains-visage-monoi-01.webp" },
  "deodorant-spray-pierre-alun": { nom: "Déodorant spray à l’alun", format: "Eau et alun, sans parfum, flacon à pompe", prix: 9.99, page: "deodorant-spray-pierre-alun.html", image: "assets/produits/ml-pierre-alun-spray-01.webp", vignette: "assets/shooting/miniatures/ml-pierre-alun-spray-01.webp" },
  "eau-micellaire-aloe-vera-bio": { nom: "Eau micellaire à l’aloe vera", format: "250 ml, aloe vera bio et eau de bleuet", prix: 6.99, page: "eau-micellaire-aloe-vera-bio.html", image: "assets/produits/ml-eau-micellaire-aloe-01.webp", vignette: "assets/shooting/miniatures/ml-eau-micellaire-aloe-01.webp" },
  "gel-douche-lait-anesse": { nom: "Gel douche au lait d’ânesse", format: "Gel nacré, mousse douce, parfum lait", prix: 9.99, page: "gel-douche-lait-anesse.html", image: "assets/produits/ml-gel-douche-anesse-01.webp", vignette: "assets/shooting/miniatures/ml-gel-douche-anesse-01.webp" },
  "gel-douche-lavande-bio": { nom: "Gel douche à la lavande", format: "250 ml, gel transparent, lavande vraie bio", prix: 9.99, page: "gel-douche-lavande-bio.html", image: "assets/produits/ml-gel-douche-lavande-01.webp", vignette: "assets/shooting/miniatures/ml-gel-douche-lavande-01.webp" },
  "lait-corporel-lait-anesse-argan": { nom: "Lait corporel ânesse et argan", format: "200 ml à pompe, karité et argan", prix: 9.99, page: "lait-corporel-lait-anesse-argan.html", image: "assets/produits/ml-lait-corporel-anesse-argan-01.webp", vignette: "assets/shooting/miniatures/ml-lait-corporel-anesse-argan-01.webp" },
  "lait-corps-monoi-lait-anesse": { nom: "Lait corps au monoï", format: "200 ml à pompe, fleur de tiaré et coco", prix: 9.99, page: "lait-corps-monoi-lait-anesse.html", image: "assets/produits/ml-lait-corps-monoi-01.webp", vignette: "assets/shooting/miniatures/ml-lait-corps-monoi-01.webp" },
  "lait-demaquillant-lait-anesse": { nom: "Lait démaquillant au lait d’ânesse", format: "250 ml, visage, cou et yeux au coton", prix: 11.99, page: "lait-demaquillant-lait-anesse.html", image: "assets/produits/ml-lait-demaquillant-anesse-01.webp", vignette: "assets/shooting/miniatures/ml-lait-demaquillant-anesse-01.webp" },
  "pierre-alun-deodorant-stick": { nom: "Pierre d’alun en stick", format: "Stick de 90 g, un seul ingrédient", prix: 9.99, page: "pierre-alun-deodorant-stick.html", image: "assets/produits/ml-pierre-alun-stick-01.webp", vignette: "assets/shooting/miniatures/ml-pierre-alun-stick-01.webp" },
  "pommade-multi-usages-olive-argan": { nom: "Pommade multi-usages olive et argan", format: "Boîte métal de 120 ml, corps, visage, mains", prix: 11.99, page: "pommade-multi-usages-olive-argan.html", image: "assets/produits/ml-pommade-olive-argan-01.webp", vignette: "assets/shooting/miniatures/ml-pommade-olive-argan-01.webp" },
  "savon-al-hares-lavande": { nom: "Savon Al Hares lavande", format: "150 g, laurier de Kessab et lavande", prix: 5.99, page: "savon-al-hares-lavande.html", image: "assets/produits/ml-alep-al-hares-lavande-e1.webp", vignette: "assets/shooting/miniatures/ml-alep-al-hares-lavande-e1.webp" },
  "savon-al-hares-miel": { nom: "Savon Al Hares miel", format: "150 g, miel et propolis, laurier et olive", prix: 5.99, page: "savon-al-hares-miel.html", image: "assets/produits/ml-miel-echelle.webp", vignette: "assets/shooting/miniatures/ml-miel-echelle.webp" },
  "savon-al-hares-oud-ambre": { nom: "Savon Al Hares oud et ambre", format: "150 g, oud et ambre, laurier et olive", prix: 5.99, page: "savon-al-hares-oud-ambre.html", image: "assets/produits/ml-alep-al-hares-ambre-e1.webp", vignette: "assets/shooting/miniatures/ml-alep-al-hares-ambre-e1.webp" },
  "savon-al-hares-nigelle": { nom: "Savon Al Hares nigelle", format: "150 g, huile de nigelle, laurier et olive", prix: 5.99, page: "savon-al-hares-nigelle.html", image: "assets/produits/ml-alep-al-hares-nigelle-e1.webp", vignette: "assets/shooting/miniatures/ml-alep-al-hares-nigelle-e1.webp" },
  "savon-al-hares-musc": { nom: "Savon Al Hares musc", format: "150 g, musc blanc, laurier et olive", prix: 5.99, page: "savon-al-hares-musc.html", image: "assets/produits/ml-alep-al-hares-musc-e1.webp", vignette: "assets/shooting/miniatures/ml-alep-al-hares-musc-e1.webp" },
  "savon-laurier-laur-veel-kessab": { nom: "Savon de laurier Laur Veel", format: "150 g, laurier et olive, sans parfum", prix: 5.99, page: "savon-laurier-laur-veel-kessab.html", image: "assets/produits/ml-alep-laur-veel-e1.webp", vignette: "assets/shooting/miniatures/ml-alep-laur-veel-e1.webp" },
  "savon-copeaux-olive": { nom: "Savon d’Alep 20 % pur copeaux", format: "150 g · vert olive", prix: 4.99, page: "savon-alep-20-copeaux-150g.html", image: "assets/produits/ml-savon-copeaux-olive-p.webp", vignette: "assets/shooting/miniatures/ml-savon-copeaux-olive-p.webp" },
  "savon-copeaux-lotus": { nom: "Savon d’Alep 20 % pur copeaux", format: "150 g · bleu fleur de lotus", prix: 4.99, page: "savon-alep-20-copeaux-150g.html", image: "assets/produits/ml-savons-alep-100g-03.webp", vignette: "assets/shooting/miniatures/ml-savons-alep-100g-03.webp" },
  "savon-copeaux-monoi": { nom: "Savon d’Alep 20 % pur copeaux", format: "150 g · monoï", prix: 4.99, page: "savon-alep-20-copeaux-150g.html", image: "assets/produits/ml-savon-copeaux-monoi-p.webp", vignette: "assets/shooting/miniatures/ml-savon-copeaux-monoi-p.webp" },
  "savon-copeaux-citron": { nom: "Savon d’Alep 20 % pur copeaux", format: "150 g · citron", prix: 4.99, page: "savon-alep-20-copeaux-150g.html", image: "assets/produits/ml-savon-copeaux-citron-p.webp", vignette: "assets/shooting/miniatures/ml-savon-copeaux-citron-p.webp" },
  "savon-copeaux-passion": { nom: "Savon d’Alep 20 % pur copeaux", format: "150 g · passion", prix: 4.99, page: "savon-alep-20-copeaux-150g.html", image: "assets/produits/ml-savon-copeaux-passion-p.webp", vignette: "assets/shooting/miniatures/ml-savon-copeaux-passion-p.webp" },
  "savon-copeaux-lavande": { nom: "Savon d’Alep 20 % pur copeaux", format: "150 g · lavande", prix: 4.99, page: "savon-alep-20-copeaux-150g.html", image: "assets/produits/ml-savon-copeaux-lavande-p.webp", vignette: "assets/shooting/miniatures/ml-savon-copeaux-lavande-p.webp" },
  "savon-copeaux-nigelle": { nom: "Savon d’Alep 20 % pur copeaux", format: "150 g · nigelle", prix: 4.99, page: "savon-alep-20-copeaux-150g.html", image: "assets/produits/ml-savon-copeaux-nigelle-p.webp", vignette: "assets/shooting/miniatures/ml-savon-copeaux-nigelle-p.webp" },
  "savon-alep-traditionnel-laurier-20": { nom: "Savon d’Alep 20 % laurier", format: "Environ 200 g, olive et 20 % de laurier", prix: 6.99, page: "savon-alep-traditionnel-laurier-20.html", image: "assets/produits/ml-alep-papier-laurier-01.webp", vignette: "assets/shooting/miniatures/ml-alep-papier-laurier-01.webp" },
  "savon-detachant-fiel-de-boeuf": { nom: "Savon détachant fiel de bœuf", format: "Tous textiles, pose 15 à 20 minutes", prix: 3.99, page: "savon-detachant-fiel-de-boeuf.html", image: "assets/produits/ml-savon-detachant-01.webp", vignette: "assets/shooting/miniatures/ml-savon-detachant-01.webp" },
  "serail-100": { nom: "Savon de Marseille Le Sérail", format: "100 g", prix: 2.99, page: "savon-marseille-le-serail.html", image: "assets/produits/ml-cube-marseille-le-serail-01.webp", vignette: "assets/shooting/miniatures/ml-cube-marseille-le-serail-01.webp" },
  "serail-300": { nom: "Savon de Marseille Le Sérail", format: "300 g", prix: 3.99, page: "savon-marseille-le-serail.html", image: "assets/produits/ml-cube-marseille-le-serail-01.webp", vignette: "assets/shooting/miniatures/ml-cube-marseille-le-serail-01.webp" },
  "serail-600": { nom: "Savon de Marseille Le Sérail", format: "600 g", prix: 6.99, page: "savon-marseille-le-serail.html", image: "assets/produits/ml-cube-marseille-le-serail-01.webp", vignette: "assets/shooting/miniatures/ml-cube-marseille-le-serail-01.webp" },
  "serail-1kg": { nom: "Savon de Marseille Le Sérail", format: "1 kg", prix: 9.99, page: "savon-marseille-le-serail.html", image: "assets/produits/ml-cube-marseille-le-serail-01.webp", vignette: "assets/shooting/miniatures/ml-cube-marseille-le-serail-01.webp" },
  "savon-musc-tahara-dakka-kadima": { nom: "Savon musc tahara Dakka Kadima", format: "Pain ivoire, boîte argentée miroir", prix: 9.99, page: "savon-musc-tahara-dakka-kadima.html", image: "assets/produits/ml-lingot-dakka-01.webp", vignette: "assets/shooting/miniatures/ml-lingot-dakka-01.webp" },
  "savon-alep-anesse": { nom: "Savon gravé Alep-Ânesse", format: "Savon gravé", prix: 3.99, page: "savons-lait-anesse-rose.html", image: "assets/produits/ml-savon-alep-anesse-01.webp", vignette: "assets/shooting/miniatures/ml-savon-alep-anesse-01.webp" },
  "savon-rose": { nom: "Savon gravé Rose", format: "Savon gravé", prix: 3.99, page: "savons-lait-anesse-rose.html", image: "assets/produits/ml-savon-rose-01.webp", vignette: "assets/shooting/miniatures/ml-savon-rose-01.webp" },
  "shampooing-lait-anesse": { nom: "Shampooing au lait d’ânesse", format: "250 ml, sans silicone, fabriqué en France", prix: 9.99, page: "shampooing-lait-anesse.html", image: "assets/produits/ml-shampooing-anesse-01.webp", vignette: "assets/shooting/miniatures/ml-shampooing-anesse-01.webp" }
};
const PALIER_CADEAU = 39.99;
const PALIER_LIVRAISON = 49;
const CLE_PANIER = "maison-lavandin-panier";
const ICONE_PANIER = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>';

const euros = (n) => { const c = Math.round(n * 100); return (c % 100 === 0 ? String(c / 100) : (c / 100).toFixed(2).replace(".", ",")) + " €"; };

/* ---------- Signal : le site raconte ce qui se passe, la mesure écoute ailleurs ---------- */
function signal(nom, detail) {
  try { document.dispatchEvent(new CustomEvent("ml:" + nom, { detail: detail || {} })); } catch { /* sans CustomEvent, le site marche quand même */ }
}

/* ---------- Menu mobile ---------- */
const bouton = document.querySelector(".menu-bouton");
const liens = document.querySelector(".liens");
function fermerMenu() {
  liens?.classList.remove("ouvert");
  bouton?.setAttribute("aria-expanded", "false");
  const l = bouton?.querySelector(".menu-libelle"); if (l) l.textContent = "Menu";
}
const libelleMenu = bouton?.querySelector(".menu-libelle");
bouton?.addEventListener("click", () => {
  const ouvert = liens?.classList.toggle("ouvert");
  bouton.setAttribute("aria-expanded", String(Boolean(ouvert)));
  if (libelleMenu) libelleMenu.textContent = ouvert ? "Fermer" : "Menu";
});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !liens?.classList.contains("ouvert")) return;
  fermerMenu();
  if (bouton instanceof HTMLElement) bouton.focus();
});
document.addEventListener("click", (event) => {
  if (event.target instanceof Node && !document.querySelector(".entete")?.contains(event.target)) fermerMenu();
});
liens?.querySelectorAll("a").forEach((lien) => lien.addEventListener("click", fermerMenu));
window.matchMedia("(min-width: 721px)").addEventListener("change", fermerMenu);

/* ---------- Panier local ---------- */
const CLE_CADEAU = "maison-lavandin-cadeau";
const ICONE_CROIX = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
const SUGGESTIONS_VIDE = ["musc-grenade", "savon-lavande", "petite-reine"];
const COMPLEMENTS = ["savon-lavande", "musc-grenade", "huile-lavandin", "petite-reine", "musc-blanc", "quatuor-savons"];
const MUSCS = ["musc-grenade", "musc-blanc", "musc-aroussa"];
const ECONOMIE_COFFRET = MUSCS.length * CATALOGUE["musc-grenade"].prix - CATALOGUE.coffret.prix;
const CATEGORIES = { muscs: ["coffret", ...MUSCS], lavande: ["savon-lavande", "huile-lavandin", "quatuor-savons"], maison: ["torchons-lavande", "torchons-oliveraie", "torchons-flamants", "petite-reine", "attelage"], brumes: ["brume-candy", "brume-ylang", "brume-pinky", "brume-sprint", "brume-aqua"], soins: ["bain-moussant-lait-anesse", "creme-mains-visage-lait-anesse-argan", "creme-mains-visage-lavande-bio", "creme-mains-visage-monoi-lait-anesse", "deodorant-spray-pierre-alun", "eau-micellaire-aloe-vera-bio", "gel-douche-lait-anesse", "gel-douche-lavande-bio", "lait-corporel-lait-anesse-argan", "lait-corps-monoi-lait-anesse", "lait-demaquillant-lait-anesse", "pierre-alun-deodorant-stick", "pommade-multi-usages-olive-argan", "shampooing-lait-anesse"], savons: ["savon-al-hares-lavande", "savon-al-hares-miel", "savon-al-hares-oud-ambre", "savon-al-hares-nigelle", "savon-al-hares-musc", "savon-laurier-laur-veel-kessab", "savon-copeaux-olive", "savon-copeaux-lotus", "savon-copeaux-monoi", "savon-copeaux-citron", "savon-copeaux-passion", "savon-copeaux-lavande", "savon-copeaux-nigelle", "savon-alep-traditionnel-laurier-20", "savon-detachant-fiel-de-boeuf", "serail-100", "serail-300", "serail-600", "serail-1kg", "savon-musc-tahara-dakka-kadima", "savon-alep-anesse", "savon-rose"], coffrets: ["coffret-mini-savons", "coffret-savons-sculptes-olive-laurier"] };
/* ---------- Lots : prix dégressif par quantité, à l’intérieur d’une famille au même prix unitaire ---------- */
const LOTS = [
  { cle: "muscs", ids: MUSCS, quantite: 2, prix: 14.99, libelle: "2 muscs pour 14,99 €", court: "2 pour 14,99 €", relance: null },
  { cle: "savons", ids: ["savon-lavande"], quantite: 4, prix: 8.99, paliers: [{ quantite: 4, prix: 8.99 }, { quantite: 8, prix: 16.99 }], libelle: "Offre savons lavande", court: "4 pour 8,99 €",
    relance: (manque) => ({ texte: `Encore ${manque} savon${manque > 1 ? "s" : ""} : les quatre pour 8,99 € au lieu de 11,96 €.`, detail: "Même savon gravé : 3 € d’économie, et 7 € par huit.", bouton: `Ajouter ${manque} savon${manque > 1 ? "s" : ""} · ${euros(2.99 * manque)}`, id: "savon-lavande", quantite: manque }) },
  { cle: "brumes", ids: CATEGORIES.brumes, quantite: 3, prix: 24.99, libelle: "3 brumes pour 24,99 €", court: "3 pour 24,99 €",
    relance: (manque) => ({ texte: `Encore ${manque} brume${manque > 1 ? "s" : ""} : les trois reviennent à 24,99 € au lieu de 29,97 €.`, detail: "Au choix parmi les cinq senteurs, 250 ml chacune.", lien: "boutique.html?categorie=brumes", libelleLien: "Choisir une brume" }) },
  { cle: "roll-on", ids: ["huile-lavandin"], quantite: 4, prix: 10, libelle: "4 roll-on pour 10 €", court: "4 pour 10 €",
    relance: (manque) => ({ texte: `Encore ${manque} roll-on : les quatre reviennent à 10 € au lieu de 11,96 €.`, detail: "Le même roll-on d’huile essentielle de lavandin, 2,50 € pièce.", bouton: `Ajouter ${manque} roll-on · ${euros(2.99 * manque)}`, id: "huile-lavandin", quantite: manque }) },
  { cle: "al-hares", ids: ["savon-al-hares-lavande", "savon-al-hares-miel", "savon-al-hares-oud-ambre", "savon-al-hares-nigelle", "savon-al-hares-musc", "savon-laurier-laur-veel-kessab"], quantite: 6, prix: 29.99, libelle: "6 savons de laurier pour 29,99 €", court: "6 pour 29,99 €", relance: null },
  { cle: "savons-copeaux", ids: ["savon-copeaux-olive", "savon-copeaux-lotus", "savon-copeaux-monoi", "savon-copeaux-citron", "savon-copeaux-passion", "savon-copeaux-lavande", "savon-copeaux-nigelle"], quantite: 3, prix: 11.99, paliers: [{ quantite: 3, prix: 11.99 }, { quantite: 6, prix: 19.99 }, { quantite: 10, prix: 29.99 }], libelle: "Offre savons copeaux", court: "dès 3 savons", relance: null },
  { cle: "savons-graves", ids: ["savon-alep-anesse", "savon-rose"], quantite: 4, prix: 10, libelle: "4 savons gravés pour 10 €", court: "4 pour 10 €", relance: null },
];
const LOT_MUSCS = LOTS[0];
/* Offre à paliers (3, 6, 10…) : le meilleur découpage pour le client, calculé en centimes */
function coutPaliers(Q, unite, paliers) {
  const cout = [0], choix = [[]];
  for (let q = 1; q <= Q; q += 1) {
    cout[q] = cout[q - 1] + unite; choix[q] = choix[q - 1];
    paliers.forEach((p) => {
      if (q < p.quantite) return;
      const c = cout[q - p.quantite] + Math.round(p.prix * 100);
      if (c < cout[q]) { cout[q] = c; choix[q] = [...choix[q - p.quantite], p.quantite]; }
    });
  }
  return { cout: cout[Q], packs: [...choix[Q]].sort((x, y) => y - x) };
}
function etatLots(panier) {
  const consommes = {};
  const etats = LOTS.map((l) => {
    if (l.type === "paire") return null;
    if (l.paliers) {
      const Q = l.ids.reduce((somme, id) => somme + (panier[id] || 0), 0);
      const unite = Math.round(CATALOGUE[l.ids[0]].prix * 100);
      const meilleur = coutPaliers(Q, unite, l.paliers);
      const remise = (Q * unite - meilleur.cout) / 100;
      return { ...l, Q, n: remise > 0 ? 1 : 0, remise, manque: Q > 0 && Q < l.paliers[0].quantite ? l.paliers[0].quantite - Q : 0, manquant: null, libelle: `Offre ${meilleur.packs.join(" + ")} savons` };
    }
    const Q = l.ids.reduce((somme, id) => somme + (panier[id] || 0), 0);
    const n = Math.floor(Q / l.quantite);
    let reste = n * l.quantite;
    l.ids.forEach((id) => { const pris = Math.min(panier[id] || 0, reste); consommes[id] = (consommes[id] || 0) + pris; reste -= pris; });
    const unite = Math.round(CATALOGUE[l.ids[0]].prix * 100);
    const remise = n * (l.quantite * unite - Math.round(l.prix * 100)) / 100;
    const manque = Q ? (l.quantite - (Q % l.quantite)) % l.quantite : 0;
    return { ...l, Q, n, remise, manque, manquant: null };
  });
  LOTS.forEach((l, i) => {
    if (l.type !== "paire") return;
    const libres = l.ids.map((id) => (panier[id] || 0) - (consommes[id] || 0));
    const n = Math.max(0, Math.min(...libres));
    const somme = l.ids.reduce((s, id) => s + Math.round(CATALOGUE[id].prix * 100), 0);
    const remise = n * (somme - Math.round(l.prix * 100)) / 100;
    const manquant = libres[0] > libres[1] ? l.ids[1] : libres[1] > libres[0] ? l.ids[0] : null;
    etats[i] = { ...l, Q: n, n, remise, manque: manquant ? 1 : 0, manquant };
  });
  return etats;
}
/* Le duo lavande en suggestion quand il fait franchir un palier (cadeau ou livraison) sans huile au panier */
function suggestionDuoLavande(panier, total) {
  return null; /* duo retiré le 15/09 : savon 2,99 € + roll-on 2,99 € coûtent moins cher à l’unité */
}
const lotDe = (id) => LOTS.find((l) => l.ids.includes(id));
function complementsPour(panier) {
  const a = (cat) => CATEGORIES[cat].some((id) => panier[id]);
  let ordre = COMPLEMENTS;
  if (a("muscs") && !a("lavande")) ordre = ["savon-lavande", "huile-lavandin", "petite-reine", "quatuor-savons"];
  else if (a("lavande") && !a("muscs")) ordre = ["musc-grenade", "petite-reine", "musc-blanc", "huile-lavandin"];
  else if (a("maison") && !a("muscs")) ordre = ["musc-grenade", "savon-lavande", "musc-aroussa"];
  else if (a("brumes") && !a("muscs")) ordre = ["musc-blanc", "savon-lavande", "musc-grenade"];
  return ordre.filter((id) => !panier[id]).slice(0, 2);
}
function offreCoffret(panier) {
  if (panier.coffret) return null;
  const presents = MUSCS.filter((id) => panier[id]);
  if (!presents.length) return null;
  const manquants = MUSCS.filter((id) => !panier[id]).map((id) => CATALOGUE[id].nom);
  const prixCoffret = euros(CATALOGUE.coffret.prix), prixUnite = euros(MUSCS.length * CATALOGUE["musc-grenade"].prix), eco = euros(ECONOMIE_COFFRET);
  const total = MUSCS.reduce((s, id) => s + (panier[id] || 0), 0);
  if (presents.length === 1 && total === 1) return { texte: `Deux muscs pour ${euros(LOT_MUSCS.prix)}, ou les trois en coffret à ${prixCoffret}.`, detail: `Au lieu de ${prixUnite} à l’unité, boîte du comptoir comprise.`, bouton: `Passer au coffret · ${prixCoffret}`, lien: "muscs.html", libelleLien: "Choisir un second musc" };
  if (presents.length === 1) return { texte: `Les trois muscs en coffret : ${prixCoffret} au lieu de ${prixUnite}.`, detail: `${manquants.join(" et ")} rejoignent votre ${CATALOGUE[presents[0]].nom}, dans la boîte du comptoir.`, bouton: `Passer au coffret · ${prixCoffret}` };
  if (presents.length === 2 && total === 2) return { texte: `Il manque ${manquants[0]} : en coffret, les trois reviennent à ${prixCoffret}, soit ${euros(CATALOGUE.coffret.prix - LOT_MUSCS.prix)} de plus pour le troisième flacon et la boîte.`, detail: `Vous économisez ${eco} sur les trois à l’unité.`, bouton: `Passer au coffret · ${prixCoffret}` };
  if (presents.length === 2) return { texte: `Il manque ${manquants[0]} : en coffret, les trois reviennent à ${prixCoffret} au lieu de ${prixUnite}.`, detail: `Vous économisez ${eco}, et la boîte est comprise.`, bouton: `Passer au coffret · ${prixCoffret}` };
  return { texte: `Vos trois muscs à l’unité coûtent ${prixUnite}. Réunis en coffret : ${prixCoffret}.`, detail: `Les mêmes trois flacons, ${eco} de moins, avec leur boîte.`, bouton: `Regrouper en coffret · ${eco} d’économie` };
}

function lirePanier() {
  try {
    const brut = JSON.parse(localStorage.getItem(CLE_PANIER) || "{}");
    const propre = {};
    Object.entries(brut).forEach(([id, qte]) => { if (CATALOGUE[id] && Number(qte) > 0) propre[id] = Math.min(20, Math.floor(Number(qte))); });
    return propre;
  } catch { return {}; }
}
function ecrirePanier(panier) {
  try { localStorage.setItem(CLE_PANIER, JSON.stringify(panier)); } catch { /* stockage indisponible : le panier vit le temps de la page */ }
}
function lireCadeau() {
  try { const c = JSON.parse(localStorage.getItem(CLE_CADEAU) || "{}"); return { actif: Boolean(c.actif), mot: String(c.mot || "").slice(0, 200) }; } catch { return { actif: false, mot: "" }; }
}
function ecrireCadeau(c) { try { localStorage.setItem(CLE_CADEAU, JSON.stringify(c)); } catch { /* idem */ } document.dispatchEvent(new Event("panier-modifie")); }
let panier = lirePanier();
let cadeau = lireCadeau();
const totalBrut = () => Object.entries(panier).reduce((s, [id, q]) => s + CATALOGUE[id].prix * q, 0);
const remisesPanier = () => etatLots(panier).filter((l) => l.n > 0);
const totalPanier = () => Math.round((totalBrut() - remisesPanier().reduce((s, l) => s + l.remise, 0)) * 100) / 100;
const nombreArticles = () => Object.values(panier).reduce((s, q) => s + q, 0);
const echapper = (t) => t.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const tiroir = document.createElement("aside");
tiroir.className = "panier";
tiroir.id = "panier";
tiroir.setAttribute("role", "dialog");
tiroir.setAttribute("aria-modal", "true");
tiroir.setAttribute("aria-label", "Votre panier");
tiroir.setAttribute("aria-hidden", "true");
tiroir.tabIndex = -1;
tiroir.inert = true;
tiroir.innerHTML = `
  <div class="panier-tete"><div><h2>Votre panier</h2><span class="panier-nombre"></span></div><button class="panier-fermer" type="button" aria-label="Fermer le panier">${ICONE_CROIX}</button></div>
  <div class="panier-corps"></div>
  <div class="panier-pied">
    <div class="paliers">
      <div class="paliers-rail" aria-hidden="true"><span class="paliers-segment" data-cle="cadeau"><span></span></span><span class="paliers-segment" data-cle="livraison"><span></span></span></div>
      <div class="palier" data-cle="cadeau"><span class="palier-icones"><i><img src="assets/vignettes/sachet-lavande-studio.webp" width="256" height="256" alt="Sachet de lavande"></i><i><img src="assets/shooting/miniatures/ml-huile-lavandin.webp" width="192" height="192" alt="Roll-on d’huile essentielle de lavandin"></i></span><span class="palier-texte"><b>Dès 39,99 €</b><span>Sachet de lavande et roll-on d’huile essentielle offerts</span><small></small></span></div>
      <div class="palier" data-cle="livraison"><span class="palier-icones"><i><img src="assets/vignettes/colis-studio.webp" width="256" height="256" alt="Colis prêt à expédier"></i></span><span class="palier-texte"><b>Dès 49 €</b><span>Livraison offerte</span><small></small></span></div>
    </div>
    <div class="panier-remises" hidden></div>
    <div class="panier-recap"><span>Sous-total</span><strong class="panier-sous-total"></strong></div>
    <a class="bouton panier-commander" href="contact.html?panier=1">${ICONE_PANIER}<span>Passer commande</span></a>
    <p class="panier-garanties"><span>Préparée sous 12 h · Expédiée sous 24 h ouvrées · Retours sous 14 jours</span><a href="boutique.html">Continuer mes achats</a></p>
  </div>`;
const fond = document.createElement("div");
fond.className = "panier-fond";
fond.hidden = true;
document.body.append(fond, tiroir);

const corps = tiroir.querySelector(".panier-corps");
const nombreAffiche = tiroir.querySelector(".panier-nombre");
const COCHE = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>';
const paliers = { cadeau: tiroir.querySelector('.palier[data-cle="cadeau"]'), livraison: tiroir.querySelector('.palier[data-cle="livraison"]') };
const sectionPaliers = tiroir.querySelector(".paliers");
function articleQuiFranchit(seuil, total) {
  const reste = seuil - total;
  const candidats = Object.entries(CATALOGUE).filter(([, p]) => p.prix >= reste).sort((a, b) => a[1].prix - b[1].prix);
  return (candidats.find(([id]) => !panier[id]) || candidats[0] || [null])[0];
}
function rendrePalier(el, seuil, total, prochain) {
  const atteint = total >= seuil;
  el.dataset.atteint = String(atteint);
  el.querySelector("small").innerHTML = atteint ? `${COCHE}Offert` : total > 0 ? `Encore ${euros(seuil - total)}` : "";
  el.querySelector(".palier-bouton")?.remove();
  const id = !atteint && prochain && total > 0 ? articleQuiFranchit(seuil, total) : null;
  if (id) {
    const b = document.createElement("button");
    b.className = "palier-bouton"; b.type = "button"; b.dataset.ajouter = id;
    b.textContent = `Ajouter ${CATALOGUE[id].nom} · ${euros(CATALOGUE[id].prix)}`;
    el.querySelector(".palier-texte").append(b);
  }
}
const paliersVus = { cadeau: false, livraison: false };
let offresVues = "";
const sousTotalAffiche = tiroir.querySelector(".panier-sous-total");
const remisesAffichees = /** @type {HTMLElement} */ (tiroir.querySelector(".panier-remises"));
const boutonCommande = tiroir.querySelector(".panier-commander");

function carteSuggestion(id, libelle) {
  const p = CATALOGUE[id];
  return `<li class="panier-suggestion"><a class="panier-suggestion-media" href="${p.page}" tabindex="-1" aria-hidden="true"><img src="${p.vignette || p.image}" width="64" height="64" alt="" loading="lazy" decoding="async"></a><div><a href="${p.page}">${p.nom}</a><small>${p.format} · ${euros(p.prix)}</small></div><button class="panier-plus" type="button" data-ajouter="${id}" aria-label="Ajouter ${p.nom} au panier">${libelle}</button></li>`;
}
function rendrePanier() {
  const focusAvant = document.activeElement;
  const ligneAvant = focusAvant instanceof HTMLElement ? focusAvant.closest(".panier-ligne") : null;
  const indexFocus = ligneAvant ? [...corps.querySelectorAll(".panier-ligne")].indexOf(ligneAvant) : 0;
  const idFocus = ligneAvant instanceof HTMLElement ? ligneAvant.dataset.id : focusAvant instanceof HTMLElement ? focusAvant.dataset.ajouter : null;
  const actionFocus = ["data-plus", "data-moins", "data-retirer"].find((action) => focusAvant?.hasAttribute(action));
  const offreFocus = focusAvant?.hasAttribute("data-coffret");
  const ids = Object.keys(panier);
  const total = totalPanier();
  const n = nombreArticles();
  nombreAffiche.textContent = n ? `${n} article${n > 1 ? "s" : ""}` : "";
  if (!ids.length) {
    corps.innerHTML = `<div class="panier-vide"><h3>Votre panier est vide.</h3><p>Un musc de 6&nbsp;ml, un savon gravé, un panier garni : les premiers gestes du comptoir.</p><ul class="panier-suggestions">${SUGGESTIONS_VIDE.map((id) => carteSuggestion(id, "Ajouter")).join("")}</ul><a class="lien-texte" href="boutique.html">Voir toute la boutique</a></div>`;
  } else {
    const complements = complementsPour(panier);
    const offre = offreCoffret(panier);
    corps.innerHTML = `<ul class="panier-lignes">${ids.map((id) => {
      const p = CATALOGUE[id];
      return `<li class="panier-ligne" data-id="${id}"><a class="panier-ligne-media" href="${p.page}" tabindex="-1" aria-hidden="true"><img src="${p.vignette || p.image}" width="80" height="80" alt="" loading="lazy" decoding="async"></a><div class="panier-ligne-corps"><h3><a href="${p.page}">${p.nom}</a></h3><small>${p.format}${id === "coffret" ? ` · ${euros(ECONOMIE_COFFRET)} d’économie` : ""}${panier[id] > 1 ? ` · ${euros(p.prix)} l’unité` : ""}${lotDe(id)?.court ? ` · ${lotDe(id).court}` : ""}</small><div class="panier-ligne-actions"><div class="panier-qte"><button type="button" data-moins aria-label="Retirer un exemplaire">−</button><span aria-live="polite">${panier[id]}</span><button type="button" data-plus aria-label="Ajouter un exemplaire">+</button></div><button class="panier-retirer" type="button" data-retirer>Retirer</button></div></div><span class="prix">${euros(p.prix * panier[id])}</span></li>`;
    }).join("")}</ul>
    ${offre ? `<div class="panier-offre"><p>${offre.texte}</p><small>${offre.detail}</small><button class="bouton" type="button" data-coffret>${ICONE_PANIER}${offre.bouton}</button>${offre.lien ? `<a class="lien-texte" href="${offre.lien}">${offre.libelleLien}</a>` : ""}</div>` : ""}
    ${[...etatLots(panier).filter((l) => l.manque > 0 && l.relance).map((l) => l.relance(l.manque)), suggestionDuoLavande(panier, total)].filter(Boolean).map((r) => `<div class="panier-offre panier-lot"><p>${r.texte}</p><small>${r.detail}</small>${r.id ? `<button class="bouton" type="button" data-ajouter="${r.id}"${r.quantite ? ` data-quantite="${r.quantite}"` : ""}${r.aussi ? ` data-ajouter-aussi="${r.aussi}"` : ""}>${ICONE_PANIER}${r.bouton}</button>` : `<a class="lien-texte" href="${r.lien}">${r.libelleLien}</a>`}</div>`).join("")}
    <div class="panier-cadeau"><label class="panier-cadeau-choix"><input type="checkbox" id="panier-cadeau-actif" ${cadeau.actif ? "checked" : ""}><span><strong>Emballage cadeau</strong> <em>offert</em><small>Boîte, ruban lavande et votre mot recopié à la main. Aucun prix dans le colis.</small></span></label><div class="panier-cadeau-mot" ${cadeau.actif ? "" : "hidden"}><label for="panier-mot">Votre mot</label><textarea id="panier-mot" rows="3" maxlength="200" placeholder="Quelques lignes, recopiées à la main sur une carte.">${echapper(cadeau.mot)}</textarea><small><span class="panier-mot-compte">${cadeau.mot.length}</span>/200</small></div></div>
    ${complements.length ? `<div class="panier-complements"><h3>Pour compléter votre sélection</h3><ul class="panier-suggestions">${complements.map((id) => carteSuggestion(id, "+")).join("")}</ul></div>` : ""}
    <p class="panier-note">Préparez votre demande puis téléchargez-la pour la transmettre au comptoir. Aucun envoi ni paiement automatique.</p>`;
  }
  const remises = remisesPanier();
  remisesAffichees.hidden = !remises.length;
  remisesAffichees.innerHTML = remises.map((l) => `<div class="panier-remise"><span>${l.n > 1 ? `${l.n} × ` : ""}${l.libelle}</span><strong>− ${euros(l.remise)}</strong></div>`).join("");
  sousTotalAffiche.textContent = euros(total);
  const attentionCadeau = corps.querySelector(".panier-cadeau");
  if (attentionCadeau) attentionCadeau.after(sectionPaliers);
  else corps.append(sectionPaliers);
  rendrePalier(paliers.cadeau, PALIER_CADEAU, total, total < PALIER_CADEAU);
  rendrePalier(paliers.livraison, PALIER_LIVRAISON, total, total >= PALIER_CADEAU && total < PALIER_LIVRAISON);
  const remplir = (cle, part) => {
    const segment = sectionPaliers.querySelector(`.paliers-segment[data-cle="${cle}"]`);
    if (!(segment instanceof HTMLElement) || !(segment.firstElementChild instanceof HTMLElement)) return;
    const borne = Math.min(1, Math.max(0, part));
    segment.firstElementChild.style.width = `${Math.round(borne * 100)}%`;
    segment.dataset.atteint = String(borne >= 1);
  };
  remplir("cadeau", total / PALIER_CADEAU);
  remplir("livraison", (total - PALIER_CADEAU) / (PALIER_LIVRAISON - PALIER_CADEAU));
  /** @type {[string, number][]} */ ([["cadeau", PALIER_CADEAU], ["livraison", PALIER_LIVRAISON]]).forEach(([cle, seuil]) => {
    const atteint = total >= seuil;
    if (atteint !== paliersVus[cle]) { paliersVus[cle] = atteint; if (atteint) signal("palier", { cle, seuil, total }); }
  });
  const cles = [...corps.querySelectorAll(".panier-offre")].map((o) => (o.classList.contains("panier-lot") ? "lot" : "coffret"));
  if (cles.length && cles.join() !== offresVues) { offresVues = cles.join(); signal("offre-affichee", { offres: cles, total }); }
  boutonCommande.querySelector("span").textContent = "Passer commande";
  boutonCommande.toggleAttribute("aria-disabled", !ids.length);
  boutonCommande.classList.toggle("bouton-clair", !ids.length);
  document.querySelectorAll(".panier-compte").forEach((c) => { if (c instanceof HTMLElement) { c.textContent = String(n); c.dataset.vide = String(n === 0); } });
  if (focusAvant instanceof HTMLElement && !focusAvant.isConnected && document.body.classList.contains("panier-ouvert")) {
    const lignes = [...corps.querySelectorAll(".panier-ligne")];
    const ligne = lignes.find((element) => element instanceof HTMLElement && element.dataset.id === (offreFocus ? "coffret" : idFocus)) || lignes[Math.min(indexFocus, lignes.length - 1)];
    const cible = focusAvant.id ? document.getElementById(focusAvant.id) : ligne?.querySelector(actionFocus ? `[${actionFocus}]` : "[data-plus]");
    const repli = tiroir.querySelector(".panier-fermer");
    if (cible instanceof HTMLElement) cible.focus({ preventScroll: true });
    else if (repli instanceof HTMLElement) repli.focus({ preventScroll: true });
  }
  document.dispatchEvent(new Event("panier-modifie"));
}
function sauvegarder() { ecrirePanier(panier); rendrePanier(); }
function ajouterAuPanier(id, qte = 1, origine = "inconnue") {
  if (!CATALOGUE[id]) return false;
  const avant = panier[id] || 0;
  panier[id] = Math.min(20, avant + qte);
  sauvegarder();
  signal("ajout", { id, nom: CATALOGUE[id].nom, prix: CATALOGUE[id].prix, quantite: panier[id] - avant, origine, total: totalPanier() });
  return true;
}
let dernierFocus = null;
let fermeturePanier = null;
function ouvrirPanier() {
  clearTimeout(fermeturePanier);
  if (document.body.classList.contains("panier-ouvert")) return;
  dernierFocus = document.activeElement;
  signal("panier-ouvert", { total: totalPanier(), articles: nombreArticles() });
  fond.hidden = false;
  document.body.classList.add("panier-ouvert");
  tiroir.setAttribute("aria-hidden", "false");
  tiroir.inert = false;
  tiroir.focus({ preventScroll: true });
}
function fermerPanier() {
  document.body.classList.remove("panier-ouvert");
  tiroir.setAttribute("aria-hidden", "true");
  tiroir.inert = true;
  fermeturePanier = setTimeout(() => { fond.hidden = true; }, 350);
  if (dernierFocus instanceof HTMLElement) dernierFocus.focus();
}
tiroir.querySelector(".panier-fermer")?.addEventListener("click", fermerPanier);
fond.addEventListener("click", fermerPanier);
document.addEventListener("keydown", (event) => {
  if (!document.body.classList.contains("panier-ouvert")) return;
  if (event.key === "Escape") fermerPanier();
  if (event.key !== "Tab") return;
  const cibles = [...tiroir.querySelectorAll('a[href], button, input, textarea, select, [tabindex="0"]')]
    .filter((el) => el instanceof HTMLElement)
    .filter((el) => !el.matches(":disabled") && el.getClientRects().length && el.getAttribute("tabindex") !== "-1");
  const premiere = cibles[0];
  const derniere = cibles.at(-1);
  if (event.shiftKey && (document.activeElement === premiere || document.activeElement === tiroir)) {
    event.preventDefault();
    derniere?.focus();
  } else if (!event.shiftKey && document.activeElement === derniere) {
    event.preventDefault();
    premiere?.focus();
  }
});
corps.addEventListener("click", (event) => {
  const cible = event.target instanceof HTMLElement ? event.target : null;
  const ligne = cible?.closest(".panier-ligne");
  if (!cible || !(ligne instanceof HTMLElement)) return;
  const id = ligne.dataset.id;
  if (!id) return;
  if (cible.matches("[data-plus]")) { panier[id] = Math.min(20, panier[id] + 1); signal("quantite", { id, sens: "plus" }); }
  else if (cible.matches("[data-moins]")) { panier[id] -= 1; signal("quantite", { id, sens: "moins" }); }
  else if (cible.matches("[data-retirer]")) { panier[id] = 0; signal("retrait", { id, nom: CATALOGUE[id].nom }); }
  else return;
  if (panier[id] <= 0) delete panier[id];
  sauvegarder();
});
corps.addEventListener("click", (event) => {
  const b = event.target instanceof Element ? event.target.closest("[data-coffret]") : null;
  if (!(b instanceof HTMLElement)) return;
  MUSCS.forEach((id) => { if (panier[id]) { panier[id] -= 1; if (panier[id] <= 0) delete panier[id]; } });
  panier.coffret = Math.min(20, (panier.coffret || 0) + 1);
  sauvegarder();
  signal("offre-acceptee", { cle: "coffret", total: totalPanier() });
  corps.scrollTop = 0;
});
corps.addEventListener("change", (event) => {
  if (!(event.target instanceof HTMLInputElement) || event.target.id !== "panier-cadeau-actif") return;
  cadeau.actif = event.target.checked;
  ecrireCadeau(cadeau);
  const bloc = corps.querySelector(".panier-cadeau-mot");
  if (bloc instanceof HTMLElement) bloc.hidden = !cadeau.actif;
  const mot = corps.querySelector("#panier-mot");
  if (cadeau.actif && mot instanceof HTMLTextAreaElement) mot.focus();
});
corps.addEventListener("input", (event) => {
  if (!(event.target instanceof HTMLTextAreaElement) || event.target.id !== "panier-mot") return;
  cadeau.mot = event.target.value.slice(0, 200);
  ecrireCadeau(cadeau);
  const compte = corps.querySelector(".panier-mot-compte");
  if (compte) compte.textContent = String(cadeau.mot.length);
});
boutonCommande?.addEventListener("click", (event) => {
  if (!Object.keys(panier).length) { event.preventDefault(); return; }
  signal("commande", { total: totalPanier(), articles: nombreArticles(), lignes: Object.entries(panier).map(([id, q]) => ({ id, q })) });
});
document.querySelectorAll(".panier-bouton").forEach((b) => b.addEventListener("click", ouvrirPanier));
document.addEventListener("click", (event) => {
  const b = event.target instanceof Element ? event.target.closest("[data-ajouter]") : null;
  if (!(b instanceof HTMLElement)) return;
  event.preventDefault();
  const origine = b.closest(".panier-lot") ? "relance" : b.closest(".palier-texte") ? "palier" : b.closest(".panier-suggestion") ? "suggestion" : b.matches(".prix-lot") ? "carte-lot" : b.closest(".achat-sticky") ? "barre-fiche" : b.closest(".achat-cta, .produit-info") ? "fiche" : b.closest(".carte") ? "carte" : "autre";
  if (!ajouterAuPanier(b.dataset.ajouter || "", Number(b.dataset.quantite) || 1, origine)) return;
  if (b.dataset.ajouterAussi) ajouterAuPanier(b.dataset.ajouterAussi, 1, origine);
  if (b.isConnected) {
    const idAjoute = b.dataset.ajouter;
    const texte = b.innerHTML;
    b.dataset.etat = "ajoute";
    b.innerHTML = `${ICONE_PANIER}Ajouté`;
    setTimeout(() => {
      if (b.dataset.ajouter === idAjoute && b.textContent.trim() === "Ajouté") b.innerHTML = texte;
      delete b.dataset.etat;
    }, 1400);
  }
  ouvrirPanier();
});
rendrePanier();
const bandeau = document.querySelector(".annonce");
if (bandeau && nombreArticles() > 0 && !/contact\.html/.test(location.pathname) && !sessionStorage.getItem("ml-rappel")) {
  const n = nombreArticles();
  bandeau.innerHTML = `<span>Votre panier vous attend : ${n} article${n > 1 ? "s" : ""}, ${euros(totalPanier())}.</span> <button class="annonce-lien" type="button">Reprendre</button>`;
  bandeau.classList.add("annonce-rappel");
  bandeau.querySelector("button")?.addEventListener("click", ouvrirPanier);
  try { sessionStorage.setItem("ml-rappel", "1"); } catch { /* sans session, le rappel reste affiché */ }
}
window.addEventListener("storage", (event) => { if (event.key === CLE_PANIER || event.key === CLE_CADEAU) { panier = lirePanier(); cadeau = lireCadeau(); rendrePanier(); } });

/* ---------- Barre d’achat mobile sur les fiches ---------- */
const ctaPrincipal = document.querySelector(".achat-cta[data-ajouter]");
if (ctaPrincipal instanceof HTMLElement && "IntersectionObserver" in window) {
  const prixFiche = document.querySelector(".produit-entete > .prix, .produit-info > .prix");
  const barre = document.createElement("div");
  barre.className = "achat-sticky";
  barre.dataset.visible = "false";
  barre.inert = true;
  barre.innerHTML = `<span class="prix">${prixFiche ? prixFiche.firstChild?.textContent?.trim() || "" : ""}</span><button class="bouton" type="button" data-ajouter="${ctaPrincipal.dataset.ajouter}">${ICONE_PANIER}Ajouter au panier</button>`;
  document.body.append(barre);
  new IntersectionObserver((entrees) => {
    const e = entrees[0];
    const visible = !e.isIntersecting && e.boundingClientRect.top < 0;
    barre.dataset.visible = String(visible);
    barre.inert = !visible;
  }, { threshold: 0 }).observe(ctaPrincipal);
}

/* ---------- Fiches musc : ce musc seul ou les trois en coffret ---------- */
function afficherVue(galerie, src, alt, legende) {
  const photo = galerie?.querySelector("[data-image-principale]");
  if (!(photo instanceof HTMLImageElement)) return;
  if (photo.dataset.srcOrigine === undefined) {
    photo.dataset.srcOrigine = photo.getAttribute("src") || "";
    photo.dataset.srcsetOrigine = photo.getAttribute("srcset") || "";
  }
  const vueCible = [...galerie.querySelectorAll("[data-vue]")].find((v) => v instanceof HTMLElement && v.dataset.vue === src);
  const srcset = vueCible instanceof HTMLElement && vueCible.dataset.srcset ? vueCible.dataset.srcset : src === photo.dataset.srcOrigine ? photo.dataset.srcsetOrigine : "";
  if (srcset) photo.setAttribute("srcset", srcset); else photo.removeAttribute("srcset");
  photo.src = src;
  photo.alt = alt;
  galerie.querySelectorAll("[data-vue]").forEach((vue) => {
    const active = vue.dataset.vue === src;
    vue.setAttribute("aria-pressed", String(active));
    if (active && vue instanceof HTMLElement) {
      photo.width = Number(vue.dataset.largeur) || photo.width;
      photo.height = Number(vue.dataset.hauteur) || photo.height;
    }
  });
  galerie.querySelector("[data-zoom]")?.setAttribute("aria-label", `Agrandir : ${alt}`);
  const texte = galerie.querySelector("[data-legende-galerie]");
  if (texte && legende) texte.textContent = legende;
}
const choixOffre = document.querySelector(".choix-offre");
if (choixOffre) {
  const photo = document.querySelector("[data-image-principale]");
  const origine = photo instanceof HTMLImageElement ? { src: photo.getAttribute("src"), alt: photo.alt } : null;
  const muscPage = /** @type {HTMLInputElement|null} */ (choixOffre.querySelector('input[value^="musc-"]'))?.value || "";
  const choixSecond = choixOffre.querySelector(".choix-second");
  const secondChoisi = () => /** @type {HTMLElement|null|undefined} */ (choixSecond?.querySelector('[aria-pressed="true"]'))?.dataset.second || MUSCS.find((m) => m !== muscPage);
  choixSecond?.addEventListener("click", (event) => {
    const b = event.target instanceof Element ? event.target.closest("[data-second]") : null;
    if (!(b instanceof HTMLElement)) return;
    choixSecond.querySelectorAll("[data-second]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    const nom = choixOffre.querySelector("[data-second-nom]");
    if (nom) nom.textContent = CATALOGUE[b.dataset.second].nom.replace("Musc ", "");
    appliquerOffre();
  });
  function appliquerOffre() {
    const coche = choixOffre.querySelector("input:checked");
    if (!(coche instanceof HTMLInputElement)) return;
    const duo = coche.value === "duo";
    const id = duo ? muscPage : coche.value;
    const prix = duo ? LOT_MUSCS.prix : CATALOGUE[id].prix;
    const format = id === "coffret" ? "3 × 6 ml" : duo ? "2 × 6 ml" : "6 ml";
    if (choixSecond instanceof HTMLElement) choixSecond.hidden = !duo;
    document.querySelectorAll(".achat-cta[data-ajouter], .achat-sticky [data-ajouter]").forEach((b) => {
      if (!(b instanceof HTMLElement)) return;
      b.dataset.ajouter = id;
      if (duo) b.dataset.ajouterAussi = secondChoisi(); else delete b.dataset.ajouterAussi;
      b.innerHTML = b.closest(".achat-sticky") ? `${ICONE_PANIER}Ajouter au panier` : `${ICONE_PANIER}Ajouter au panier · ${euros(prix)}`;
    });
    const prixSticky = document.querySelector(".achat-sticky .prix");
    if (prixSticky) prixSticky.textContent = `${euros(prix)} · ${format}`;
    const prixFiche = document.querySelector(".produit-entete > .prix");
    if (prixFiche) prixFiche.innerHTML = `${euros(prix)} <span class="format-prix">/ ${format}</span>`;
    if (photo instanceof HTMLImageElement && origine) {
      const galerie = photo.closest(".galerie");
      const src = id === "coffret" ? CATALOGUE.coffret.image : origine.src;
      const vue = [...galerie.querySelectorAll("[data-vue]")].filter((v) => v instanceof HTMLElement).find((v) => v.dataset.vue === src);
      afficherVue(galerie, src, vue?.dataset.alt || origine.alt, vue?.dataset.legende);
    }
  }
  choixOffre.addEventListener("change", appliquerOffre);
  setTimeout(appliquerOffre, 0);
}

/* ---------- Boutique : filtres ---------- */
const filtres = document.querySelectorAll("[data-filtre]");
const cartes = document.querySelectorAll("[data-categorie]");
function filtrer(categorie) {
  let nombre = 0;
  filtres.forEach((filtre) => {
    const actif = filtre instanceof HTMLElement && filtre.dataset.filtre === categorie;
    filtre.classList.toggle("actif", actif);
    filtre.setAttribute("aria-pressed", String(actif));
  });
  cartes.forEach((carte) => {
    if (!(carte instanceof HTMLElement)) return;
    const categories = (carte.dataset.categorie || "").split(/\s+/);
    carte.hidden = categorie !== "tout" && !categories.includes(categorie);
    if (!carte.hidden) nombre += 1;
  });
  document.querySelectorAll("[data-bandeau]").forEach((bandeau) => {
    if (bandeau instanceof HTMLElement) bandeau.hidden = bandeau.dataset.bandeau !== categorie;
  });
  const statut = document.querySelector(".resultats");
  if (statut) statut.textContent = `${nombre} produit${nombre > 1 ? "s" : ""}`;
  signal("filtre", { categorie, nombre });
}
filtres.forEach((filtre) => {
  filtre.addEventListener("click", () => {
    if (!(filtre instanceof HTMLElement)) return;
    const categorie = filtre.dataset.filtre || "tout";
    filtrer(categorie);
    const url = new URL(window.location.href);
    if (categorie === "tout") url.searchParams.delete("categorie");
    else url.searchParams.set("categorie", categorie);
    window.history.replaceState(null, "", url);
  });
});
const categorieInitiale = params.get("categorie");
if (Array.from(filtres).some((f) => f instanceof HTMLElement && f.dataset.filtre === categorieInitiale)) filtrer(categorieInitiale);

/* ---------- Coordonnées du comptoir ----------
   Une seule source pour tout le site : renseigner l'adresse e-mail et le téléphone dès qu'ils sont connus.
   Tant qu'un champ est vide, les lignes qui en dépendent restent masquées et le formulaire télécharge la demande. */
const COORDONNEES = { courriel: "contact.maisonlavandin@gmail.com", telephone: "" };
document.querySelectorAll("[data-courriel], [data-telephone]").forEach((lien) => {
  const cle = lien.hasAttribute("data-courriel") ? "courriel" : "telephone";
  const valeur = COORDONNEES[cle];
  const bloc = lien.closest(cle === "courriel" ? "[data-si-courriel]" : "[data-si-telephone]");
  if (!valeur) { if (bloc instanceof HTMLElement) bloc.hidden = true; return; }
  lien.textContent = valeur;
  if (lien instanceof HTMLAnchorElement) lien.href = cle === "courriel" ? `mailto:${valeur}` : `tel:${valeur.replace(/[^+\d]/g, "")}`;
});

/* ---------- Contact : demande, cadeau, récapitulatif du panier ---------- */
const formulaire = document.querySelector(".formulaire");
if (formulaire instanceof HTMLFormElement) {
  const article = params.get("article") === "torchons-provence" && params.get("modele") === "oliveraie" ? "torchons-oliveraie" : params.get("article");
  const choix = document.getElementById("article");
  const sujet = document.getElementById("sujet");
  const cadeauCase = document.getElementById("cadeau");
  const champMot = document.getElementById("champ-mot");
  const mot = document.getElementById("mot");
  const message = document.getElementById("message");
  const statut = formulaire.querySelector(".formulaire-statut");
  const soumettre = formulaire.querySelector('button[type="submit"]');
  if (soumettre instanceof HTMLButtonElement) soumettre.disabled = false;
  if (choix instanceof HTMLSelectElement && article && Array.from(choix.options).some((o) => o.value === article)) {
    choix.value = article;
    if (sujet instanceof HTMLSelectElement && !article.startsWith("musc-")) sujet.value = "Autre question";
    if (message instanceof HTMLTextAreaElement) message.value = `Bonjour, je souhaite des informations pour commander : ${choix.selectedOptions[0].textContent}.`;
  }
  const lignesPanier = () => [
    ...Object.entries(panier).map(([id, q]) => `${q} × ${CATALOGUE[id].nom} (${CATALOGUE[id].format}) : ${euros(CATALOGUE[id].prix * q)}`),
    ...remisesPanier().map((l) => `Lot ${l.n > 1 ? `${l.n} × ` : ""}${l.libelle} : − ${euros(l.remise)}`),
  ];
  const modePanier = params.get("panier") === "1";
  const recap = modePanier ? document.createElement("div") : null;
  let dernierRecap = "";
  if (recap) {
    recap.className = "recap-panier";
    recap.setAttribute("aria-live", "polite");
    formulaire.prepend(recap);
    if (sujet instanceof HTMLSelectElement) { const opt = Array.from(sujet.options).find((o) => o.value === "Commander" || o.textContent === "Commander"); if (opt) sujet.value = opt.value; }
    if (message instanceof HTMLTextAreaElement && !message.value) message.value = "Bonjour, je souhaite commander les articles de ce panier.";
    if (mot instanceof HTMLTextAreaElement) mot.maxLength = 200;
  }
  function montrerCadeau() {
    if (!(cadeauCase instanceof HTMLInputElement) || !champMot || !(mot instanceof HTMLTextAreaElement)) return;
    champMot.hidden = !cadeauCase.checked;
    mot.disabled = !cadeauCase.checked;
  }
  function actualiserDemande() {
    if (!recap) return;
    const rempli = Object.keys(panier).length > 0;
    const contenuRecap = rempli ? `<strong>Votre panier</strong><ul>${lignesPanier().map((l) => `<li>${l}</li>`).join("")}</ul><p>Sous-total : <b>${euros(totalPanier())}</b>${totalPanier() >= PALIER_LIVRAISON ? ", livraison offerte" : ""}${totalPanier() >= PALIER_CADEAU ? ", sachet de lavande et roll-on d’huile essentielle offerts" : ""}.</p>` : '<strong>Votre panier est vide.</strong><p><a href="boutique.html">Choisir des articles dans la boutique</a> pour préparer votre demande.</p>';
    if (contenuRecap !== dernierRecap) { recap.innerHTML = contenuRecap; dernierRecap = contenuRecap; }
    if (soumettre instanceof HTMLButtonElement) soumettre.disabled = !rempli;
    if (cadeauCase instanceof HTMLInputElement) cadeauCase.checked = cadeau.actif;
    if (mot instanceof HTMLTextAreaElement && mot.value !== cadeau.mot) mot.value = cadeau.mot;
    montrerCadeau();
  }
  function enregistrerCadeauDemande() {
    if (!modePanier || !(cadeauCase instanceof HTMLInputElement) || !(mot instanceof HTMLTextAreaElement)) return;
    cadeau.actif = cadeauCase.checked;
    cadeau.mot = mot.value.slice(0, 200);
    ecrireCadeau(cadeau);
    rendrePanier();
  }
  document.addEventListener("panier-modifie", actualiserDemande);
  actualiserDemande();
  cadeauCase?.addEventListener("change", () => { montrerCadeau(); enregistrerCadeauDemande(); });
  mot?.addEventListener("input", enregistrerCadeauDemande);
  if (params.get("sujet") === "cadeau" && cadeauCase instanceof HTMLInputElement) {
    cadeauCase.checked = true;
    if (sujet instanceof HTMLSelectElement) sujet.value = "Préparer un cadeau";
    montrerCadeau();
    enregistrerCadeauDemande();
  }
  const noteEnvoi = formulaire.querySelector("[data-note-envoi]");
  if (soumettre instanceof HTMLButtonElement) soumettre.textContent = COORDONNEES.courriel ? "Écrire au comptoir" : "Télécharger ma demande";
  if (noteEnvoi instanceof HTMLElement && !COORDONNEES.courriel) noteEnvoi.textContent = "Votre demande est préparée dans un fichier à transmettre au comptoir.";
  formulaire.addEventListener("submit", (event) => {
    event.preventDefault();
    if (modePanier && !Object.keys(panier).length) return;
    if (!formulaire.reportValidity()) return;
    const donnees = new FormData(formulaire);
    const piece = choix instanceof HTMLSelectElement && choix.value ? choix.selectedOptions[0].textContent : "";
    const avecCadeau = cadeauCase instanceof HTMLInputElement && cadeauCase.checked;
    const lignes = [
      `Nom : ${donnees.get("nom") || "Non renseigné"}`,
      `E-mail : ${donnees.get("email")}`,
      `Demande : ${donnees.get("sujet")}`,
      ...(piece ? [`Article : ${piece}`] : []),
      "",
      String(donnees.get("message") || ""),
      ...(modePanier && Object.keys(panier).length ? ["", "Panier :", ...lignesPanier(), `Sous-total : ${euros(totalPanier())}`] : []),
      ...(avecCadeau ? ["", "Emballage cadeau souhaité.", ...(donnees.get("mot") ? [`Mot à recopier : ${donnees.get("mot")}`] : [])] : []),
    ];
    const texte = lignes.join("\n");
    if (COORDONNEES.courriel) {
      const objet = `Maison Lavandin · ${donnees.get("sujet")}${piece ? ` · ${piece}` : ""}`;
      window.location.href = `mailto:${COORDONNEES.courriel}?subject=${encodeURIComponent(objet)}&body=${encodeURIComponent(texte.slice(0, 1800))}`;
      if (statut) statut.textContent = `Votre messagerie s’ouvre avec votre message prêt à partir. Rien ne s’ouvre ? Écrivez-nous à ${COORDONNEES.courriel}.`;
      return;
    }
    const url = URL.createObjectURL(new Blob([["Demande Maison Lavandin", "", texte].join("\n")], { type: "text/plain;charset=utf-8" }));
    const telechargement = document.createElement("a");
    telechargement.href = url;
    telechargement.download = "demande-maison-lavandin.txt";
    telechargement.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    if (statut) statut.textContent = "Votre demande est prête dans un fichier à transmettre au comptoir.";
  });
}

/* ---------- Torchons : deux modèles sur une fiche ---------- */
const modelesTorchons = {
  lavande: {
    titre: "La Charrette de Lavande",
    image: "assets/torchons-lavande.webp",
    alt: "Deux torchons brodés, charrette et bouquet de lavande, dans leur boîte Villages de Provence",
    description: "Une charrette chargée de lavande et un bouquet noué d’un ruban jaune. Deux broderies en relief sur un tissu gaufré clair, présentées dans leur boîte à fenêtre.",
    id: "torchons-lavande"
  },
  oliveraie: {
    titre: "La Cigale & l’Olivier",
    image: "assets/torchons-oliveraie.webp",
    alt: "Deux torchons gris perle et bleu brodés d’une cigale, d’olives et d’une bouteille d’huile",
    description: "Une cigale parmi les olives, une bouteille d’huile accompagnée de lavande. Deux torchons gris perle et bleu, brodés en relief et réunis dans leur boîte à fenêtre.",
    id: "torchons-oliveraie"
  },
  flamants: {
    titre: "Le Flamant & la Carafe",
    image: "assets/produits/ml-torchons-provence-duo-01.webp",
    alt: "Deux torchons brodés fuchsia et jaune dans leur boîte Villages de Provence",
    description: "Un torchon fuchsia brodé d’une carafe d’huile et d’olives, un torchon jaune brodé de deux flamants roses et de petits cœurs, « Provence » en script sur chacun. Tissu gaufré, boîte à fenêtre illustrée d’un champ de lavande.",
    id: "torchons-flamants"
  }
};
function choisirModele(modele) {
  const fiche = document.querySelector("[data-titre-modele]");
  if (!fiche) return;
  const cle = modelesTorchons[modele] ? modele : "lavande";
  const choix = modelesTorchons[cle];
  fiche.textContent = choix.titre;
  const description = document.querySelector("[data-description-modele]");
  if (description) description.textContent = choix.description;
  const photo = document.querySelector("[data-image-principale]");
  if (photo instanceof HTMLImageElement) {
    const galerie = photo.closest(".galerie");
    const principale = galerie?.querySelector("[data-vue-principale]");
    if (principale instanceof HTMLElement) {
      principale.dataset.vue = choix.image;
      principale.dataset.alt = choix.alt;
      principale.dataset.legende = "Deux torchons dans leur boîte Villages de Provence.";
      const miniature = principale.querySelector("img");
      if (miniature) miniature.src = `assets/shooting/miniatures/${choix.image.split("/").pop()}`;
    }
    galerie?.querySelectorAll("[data-modele-vue]").forEach((vue) => { if (vue instanceof HTMLElement) vue.hidden = vue.dataset.modeleVue !== cle; });
    afficherVue(galerie, choix.image, choix.alt, "Deux torchons dans leur boîte Villages de Provence.");
  }
  const radio = document.getElementById(`modele-${cle}`);
  if (radio instanceof HTMLInputElement) radio.checked = true;
  document.querySelectorAll("[data-ajout-modele], .achat-sticky [data-ajouter]").forEach((b) => { if (b instanceof HTMLElement) b.dataset.ajouter = choix.id; });
}
choisirModele(params.get("modele"));
document.querySelectorAll('input[name="modele"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    if (!(radio instanceof HTMLInputElement)) return;
    choisirModele(radio.value);
    const url = new URL(window.location.href);
    url.searchParams.set("modele", radio.value);
    history.replaceState(null, "", url);
  });
});

/* ---------- Galerie et zoom ---------- */
document.querySelectorAll(".galerie").forEach((galerie) => {
  const photo = galerie.querySelector("[data-image-principale]");
  if (!(photo instanceof HTMLImageElement)) return;
  const vues = galerie.querySelectorAll("[data-vue]");
  vues.forEach((vue) => {
    vue.addEventListener("click", () => {
      if (!(vue instanceof HTMLElement) || !vue.dataset.vue) return;
      afficherVue(galerie, vue.dataset.vue, vue.dataset.alt || "Vue du produit", vue.dataset.legende);
    });
  });
  const ouvrir = galerie.querySelector("[data-zoom]");
  if (!(ouvrir instanceof HTMLButtonElement)) return;
  const dialogue = document.createElement("dialog");
  dialogue.className = "zoom-produit";
  dialogue.setAttribute("aria-label", "Photo du produit agrandie");
  const entete = document.createElement("div");
  entete.className = "zoom-produit-entete";
  const legende = document.createElement("p");
  legende.textContent = "Les détails du produit";
  const fermer = document.createElement("button");
  fermer.className = "zoom-fermer";
  fermer.type = "button";
  fermer.textContent = "Fermer";
  const agrandie = document.createElement("img");
  agrandie.decoding = "async";
  agrandie.alt = photo.alt;
  agrandie.width = Number(photo.getAttribute("width"));
  agrandie.height = Number(photo.getAttribute("height"));
  entete.append(legende, fermer);
  dialogue.append(entete);
  document.body.append(dialogue);
  ouvrir.addEventListener("click", () => {
    agrandie.src = photo.src;
    agrandie.alt = photo.alt;
    if (!agrandie.isConnected) dialogue.append(agrandie);
    dialogue.showModal();
    fermer.focus();
  });
  fermer.addEventListener("click", () => dialogue.close());
  dialogue.addEventListener("click", (event) => {
    const cadre = dialogue.getBoundingClientRect();
    if (event.clientX < cadre.left || event.clientX > cadre.right || event.clientY < cadre.top || event.clientY > cadre.bottom) dialogue.close();
  });
  dialogue.addEventListener("close", () => ouvrir.focus());
});

/* ---------- Fiche produit consultée ---------- */
{
  const cta = document.querySelector(".achat-cta[data-ajouter], .achat-cta[data-ajouter-selection]");
  const id = cta instanceof HTMLElement ? cta.dataset.ajouter : null;
  if (id && CATALOGUE[id]) signal("produit", { id, nom: CATALOGUE[id].nom, prix: CATALOGUE[id].prix });
}

/* ---------- La lettre du comptoir ----------
   Renseigner ADRESSE_LETTRE avec l'URL de collecte du formulaire (Brevo : « Partager » → « URL du
   formulaire », de la forme https://sibforms.com/serve/MUIF…). Tant qu'elle est vide, le bloc reste
   masqué : aucun visiteur ne voit un formulaire qui n'enregistre rien.
   ⚠ La politique de sécurité des pages interdit d'envoyer un formulaire ailleurs que sur le site.
   Avant d'activer, ajouter à la Content-Security-Policy de chaque page :
     form-action 'self' https://sibforms.com                                                       */
const ADRESSE_LETTRE = "";
{
  const bloc = document.querySelector("[data-lettre]");
  if (bloc instanceof HTMLElement && ADRESSE_LETTRE) {
    const forme = bloc.querySelector("form");
    const champ = /** @type {HTMLInputElement} */ (bloc.querySelector("#lettre-email"));
    const etat = bloc.querySelector(".lettre-etat");
    forme.action = ADRESSE_LETTRE;
    bloc.hidden = false;
    forme.addEventListener("submit", (event) => {
      if (!champ.checkValidity()) {
        event.preventDefault();
        champ.setAttribute("aria-invalid", "true");
        etat.textContent = "Cette adresse ne semble pas valable. Vérifiez l’arobase et le nom de domaine.";
        champ.focus();
        return;
      }
      champ.removeAttribute("aria-invalid");
      etat.textContent = "Merci, votre inscription part au comptoir.";
      signal("inscription", { emplacement: document.body.dataset.page || location.pathname.replace(/^\//, "") || "accueil" });
    });
  }
}

/* ---------- Fiche produit : où ce panier en est des deux paliers ----------
   Baymard : le seuil doit être visible près du bouton d'achat, pas seulement dans un bandeau. */
{
  const cta = document.querySelector(".achat-cta[data-ajouter], .achat-cta[data-ajouter-selection]");
  const note = document.querySelector(".achat-note");
  if (cta instanceof HTMLElement && note instanceof HTMLElement) {
    /* La politique de sécurité interdit les styles écrits dans le HTML : le rail est construit en
       DOM et sa largeur assignée par le CSSOM, qui lui n'est pas bloqué. */
    const jauge = document.createElement("p");
    jauge.className = "achat-jauge";
    jauge.setAttribute("aria-live", "polite");
    const rail = document.createElement("span");
    rail.className = "achat-jauge-rail";
    const remplissage = document.createElement("span");
    rail.append(remplissage);
    const libelle = document.createElement("span");
    libelle.className = "achat-jauge-texte";
    jauge.append(rail, libelle);
    note.before(jauge);
    const peindre = () => {
      const total = totalPanier();
      const prix = cta.dataset.prixSelection ? Number(cta.dataset.prixSelection) : CATALOGUE[cta.dataset.ajouter]?.prix || 0;
      const apres = total + prix;
      let texte = "", part = 0;
      if (total >= PALIER_LIVRAISON) { texte = `Cadeau et livraison acquis sur votre panier de ${euros(total)}.`; part = 100; }
      else if (apres >= PALIER_LIVRAISON) { texte = `Ajoutez-le et la livraison est offerte&nbsp;: votre panier passe à ${euros(apres)}.`; part = 100; }
      else if (total >= PALIER_CADEAU) { texte = `Cadeau acquis. Encore ${euros(PALIER_LIVRAISON - apres)} après cet article pour la livraison offerte.`; part = Math.round((apres / PALIER_LIVRAISON) * 100); }
      else if (apres >= PALIER_CADEAU) { texte = `Ajoutez-le et le cadeau est offert&nbsp;: sachet de lavande et roll-on d’huile essentielle.`; part = Math.round((apres / PALIER_LIVRAISON) * 100); }
      else { texte = `Encore ${euros(PALIER_CADEAU - apres)} après cet article pour le cadeau offert, ${euros(PALIER_LIVRAISON - apres)} pour la livraison.`; part = Math.round((apres / PALIER_LIVRAISON) * 100); }
      libelle.innerHTML = texte;
      remplissage.style.width = Math.min(100, Math.max(2, part)) + "%";
    };
    peindre();
    document.addEventListener("panier-modifie", peindre);
    document.addEventListener("selection-modifiee", peindre);
    document.querySelector(".choix-offre")?.addEventListener("change", () => setTimeout(peindre, 0));
  }
}

/* ---------- Fiche produit : revenir à la page précédente ---------- */
const filAriane = document.querySelector(".fiche-principale .fil-ariane");
if (filAriane instanceof HTMLElement) {
  const boutonRetour = document.createElement("button");
  boutonRetour.type = "button";
  boutonRetour.className = "retour";
  boutonRetour.setAttribute("aria-label", "Retour à la page précédente");
  boutonRetour.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>Retour';
  boutonRetour.addEventListener("click", () => {
    let interne = false;
    try { interne = document.referrer !== "" && new URL(document.referrer).origin === window.location.origin; } catch { interne = false; }
    if (interne && window.history.length > 1) { window.history.back(); return; }
    const liens = filAriane.querySelectorAll("a");
    window.location.href = liens.length ? liens[liens.length - 1].getAttribute("href") || "boutique.html" : "boutique.html";
  });
  filAriane.prepend(boutonRetour);
}

/* ---------- Fiche à parfums : le parfum survolé ou choisi montre sa photo ---------- */
document.querySelectorAll(".achat-cta[data-ajouter]").forEach((bouton) => {
  const galerie = document.querySelector(".galerie");
  const vue = galerie?.querySelector(`.galerie-vue[data-format="${bouton.getAttribute("data-ajouter")}"]`);
  if (!(vue instanceof HTMLElement)) return;
  const montrer = () => { if (vue.getAttribute("aria-pressed") !== "true") vue.click(); };
  bouton.addEventListener("pointerenter", montrer);
  bouton.addEventListener("focus", montrer);
  bouton.addEventListener("click", montrer);
});

/* ---------- Fiche à parfums : offre 1, 3, 6 ou 10 puis quantité par parfum ---------- */
const selecteurParfums = document.querySelector("[data-selecteur-parfums]");
if (selecteurParfums instanceof HTMLElement) {
  const lotParfums = LOTS.find((l) => l.cle === selecteurParfums.dataset.lot);
  const boutonSelection = selecteurParfums.querySelector("[data-ajouter-selection]");
  const bilan = selecteurParfums.querySelector("[data-bilan]");
  if (lotParfums && boutonSelection instanceof HTMLButtonElement && bilan) {
    const unite = Math.round(CATALOGUE[lotParfums.ids[0]].prix * 100);
    const quantites = Object.fromEntries(lotParfums.ids.map((id) => [id, 0]));
    const total = () => Object.values(quantites).reduce((s, n) => s + n, 0);
    const repartir = (q) => {
      const choisis = lotParfums.ids.filter((id) => quantites[id] > 0);
      const liste = choisis.length ? choisis : lotParfums.ids;
      lotParfums.ids.forEach((id) => { quantites[id] = 0; });
      for (let k = 0; k < q; k += 1) quantites[liste[k % liste.length]] += 1;
    };
    const peindreSelection = () => {
      const n = total();
      const cout = coutPaliers(n, unite, lotParfums.paliers).cout;
      const prix = cout / 100, economie = (n * unite - cout) / 100;
      lotParfums.ids.forEach((id) => {
        const valeur = selecteurParfums.querySelector(`[data-parfum-valeur="${id}"]`);
        if (valeur) { valeur.textContent = String(quantites[id]); valeur.closest(".ligne-parfum")?.classList.toggle("est-choisi", quantites[id] > 0); }
        const moins = selecteurParfums.querySelector(`[data-parfum-moins="${id}"]`);
        if (moins instanceof HTMLButtonElement) moins.disabled = quantites[id] === 0;
      });
      selecteurParfums.querySelectorAll('input[name="quantite"]').forEach((r) => { if (r instanceof HTMLInputElement) r.checked = Number(r.value) === n; });
      const prochain = lotParfums.paliers.find((p) => p.quantite > n);
      const conseil = prochain && n > 0 ? (prochain.prix <= prix ? ` Ajoutez-en ${prochain.quantite - n} : les ${prochain.quantite} savons coûtent ${euros(prochain.prix)}, moins cher que votre sélection.` : ` Encore ${prochain.quantite - n} pour l’offre ${prochain.quantite} savons à ${euros(prochain.prix)}.`) : "";
      bilan.textContent = n ? `${n} savon${n > 1 ? "s" : ""} pour ${euros(prix)}${economie > 0 ? `, soit ${euros(economie)} d’économie` : ""}.${conseil}` : "Choisissez au moins un savon.";
      boutonSelection.disabled = n === 0;
      boutonSelection.innerHTML = n ? `${ICONE_PANIER}Ajouter ${n} savon${n > 1 ? "s" : ""} · ${euros(prix)}` : `${ICONE_PANIER}Ajouter au panier`;
      boutonSelection.dataset.prixSelection = String(prix);
      document.dispatchEvent(new Event("selection-modifiee"));
    };
    selecteurParfums.addEventListener("click", (event) => {
      const bouton = event.target instanceof Element ? event.target.closest("button") : null;
      if (!bouton) return;
      const plus = bouton.getAttribute("data-parfum-plus"), moins = bouton.getAttribute("data-parfum-moins");
      if (plus && plus in quantites) {
        quantites[plus] = Math.min(20, quantites[plus] + 1);
        const vue = document.querySelector(`.galerie-vue[data-format="${plus}"]`);
        if (vue instanceof HTMLElement) vue.click();
        peindreSelection();
      } else if (moins && moins in quantites) {
        quantites[moins] = Math.max(0, quantites[moins] - 1);
        peindreSelection();
      }
    });
    selecteurParfums.addEventListener("change", (event) => {
      const radio = event.target;
      if (radio instanceof HTMLInputElement && radio.name === "quantite") { repartir(Number(radio.value)); peindreSelection(); }
    });
    boutonSelection.addEventListener("click", () => {
      if (!total()) return;
      Object.entries(quantites).forEach(([id, n]) => { if (n) ajouterAuPanier(id, n, "selecteur-parfums"); });
      rendrePanier();
      const texte = boutonSelection.innerHTML;
      boutonSelection.innerHTML = `${ICONE_PANIER}Ajouté`;
      setTimeout(() => { boutonSelection.innerHTML = texte; }, 1400);
      ouvrirPanier();
    });
    const parDefaut = selecteurParfums.querySelector('input[name="quantite"]:checked');
    repartir(parDefaut instanceof HTMLInputElement ? Number(parDefaut.value) : 1);
    peindreSelection();
  }
}

/* ---------- Fiche produit : choisir le modèle et la quantité avant d'ajouter ---------- */
document.querySelectorAll("[data-quantite-achat]").forEach((bloc) => {
  const zone = bloc.closest(".produit-info");
  const bouton = zone?.querySelector("[data-achat-principal]");
  const valeur = bloc.querySelector("[data-valeur]");
  const moins = bloc.querySelector("[data-quantite-moins]");
  if (!(zone instanceof HTMLElement) || !(bouton instanceof HTMLElement) || !valeur) return;
  let quantite = 1;
  const peindreAchat = () => {
    const radio = zone.querySelector('input[name="format"]:checked');
    const id = radio instanceof HTMLInputElement ? radio.value : bouton.dataset.ajouter || "";
    const produit = CATALOGUE[id];
    if (!produit) return;
    const brut = Math.round(produit.prix * 100) * quantite;
    const remise = etatLots({ [id]: quantite }).filter((l) => l && l.n > 0).reduce((s, l) => s + Math.round(l.remise * 100), 0);
    const total = (brut - remise) / 100;
    bouton.dataset.ajouter = id;
    bouton.dataset.quantite = String(quantite);
    bouton.dataset.prixSelection = String(total);
    valeur.textContent = String(quantite);
    if (moins instanceof HTMLButtonElement) moins.disabled = quantite <= 1;
    bouton.innerHTML = `${ICONE_PANIER}Ajouter ${quantite > 1 ? `${quantite} articles` : "au panier"} · ${euros(total)}`;
    let conseil = /** @type {HTMLElement|null|undefined} */ (bloc.parentElement?.querySelector("[data-conseil-palier]"));
    if (!conseil) { conseil = document.createElement("p"); conseil.className = "conseil-palier"; conseil.setAttribute("data-conseil-palier", ""); conseil.setAttribute("aria-live", "polite"); bouton.before(conseil); }
    const lotProduit = LOTS.find((l) => l.paliers && l.ids.includes(id));
    const prochain = lotProduit?.paliers.find((p) => p.quantite > quantite);
    if (prochain) {
      const manque = prochain.quantite - quantite;
      const gain = Math.round((total - prochain.prix) * 100) / 100;
      conseil.textContent = gain >= 0 ? `Ajoutez-en ${manque} de plus : les ${prochain.quantite} reviennent à ${euros(prochain.prix)}${gain > 0 ? `, ${euros(gain)} de moins qu’aujourd’hui` : ""}.` : quantite < prochain.quantite && manque <= 2 ? `Encore ${manque} pour l’offre ${prochain.quantite} pour ${euros(prochain.prix)}.` : "";
      conseil.hidden = !conseil.textContent;
    } else conseil.hidden = true;
    document.dispatchEvent(new Event("selection-modifiee"));
  };
  bloc.addEventListener("click", (event) => {
    const cible = event.target instanceof Element ? event.target.closest("button") : null;
    if (!cible) return;
    if (cible.hasAttribute("data-quantite-moins")) quantite = Math.max(1, quantite - 1);
    if (cible.hasAttribute("data-quantite-plus")) quantite = Math.min(20, quantite + 1);
    peindreAchat();
  });
  zone.addEventListener("change", (event) => {
    const cible = event.target;
    if (!(cible instanceof HTMLInputElement) || cible.name !== "format") return;
    const vue = document.querySelector(`.galerie-vue[data-format="${cible.value}"]`);
    if (vue instanceof HTMLElement) vue.click();
    peindreAchat();
  });
  peindreAchat();
});

/* ---------- Moyens de paiement acceptés : pied de page, panier, fiche produit ---------- */
const MOYENS_PAIEMENT = [["cb", "Carte bancaire CB"], ["visa", "Visa"], ["mastercard", "Mastercard"], ["amex", "American Express"], ["applepay", "Apple Pay"], ["googlepay", "Google Pay"], ["paypal", "PayPal"]];
function blocPaiement(classe, titre) {
  const bloc = document.createElement("div");
  bloc.className = `paiement ${classe}`;
  const libelle = document.createElement("p");
  libelle.className = "paiement-titre";
  libelle.innerHTML = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="7" width="10" height="7" rx="1.5"/><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2"/></svg>${titre}`;
  const liste = document.createElement("ul");
  liste.className = "paiement-logos";
  liste.setAttribute("aria-label", "Moyens de paiement acceptés");
  MOYENS_PAIEMENT.forEach(([fichier, nom]) => {
    const li = document.createElement("li");
    li.innerHTML = `<img src="assets/paiement/${fichier}.svg" width="40" height="25" alt="${nom}" loading="lazy" decoding="async">`;
    liste.append(li);
  });
  const stripe = document.createElement("li");
  stripe.className = "paiement-stripe";
  stripe.innerHTML = `<span>via</span><img src="assets/paiement/stripe.svg" width="40" height="25" alt="Stripe" loading="lazy" decoding="async">`;
  liste.append(stripe);
  bloc.append(libelle, liste);
  return bloc;
}
document.querySelector(".pied .copyright")?.before(blocPaiement("paiement-pied", "Paiement 100 % sécurisé"));
tiroir.querySelector(".panier-commander")?.after(blocPaiement("paiement-panier", "Paiement sécurisé"));
document.querySelector(".produit-info .achat-note")?.after(blocPaiement("paiement-fiche", "Paiement sécurisé"));

/* ---------- Galerie : flèches, compteur et glisser à gauche / à droite (page et loupe) ---------- */
document.querySelectorAll(".galerie").forEach((galerie) => {
  const visuel = galerie.querySelector(".produit-visuel");
  if (!(visuel instanceof HTMLElement)) return;
  const vues = () => /** @type {HTMLElement[]} */ ([...galerie.querySelectorAll(".galerie-vue")].filter((v) => v instanceof HTMLElement && !v.hidden));
  if (vues().length < 2) return;
  const FLECHE = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d}"/></svg>`;
  const cadre = document.createElement("div");
  cadre.className = "galerie-cadre";
  visuel.before(cadre);
  cadre.append(visuel);
  const compteur = document.createElement("span");
  compteur.className = "galerie-compteur";
  const indexActuel = () => Math.max(0, vues().findIndex((v) => v.getAttribute("aria-pressed") === "true"));
  const peindre = () => { compteur.textContent = `${indexActuel() + 1} / ${vues().length}`; };
  const aller = (sens) => {
    const liste = vues();
    const suivant = liste[(indexActuel() + sens + liste.length) % liste.length];
    suivant.click();
    suivant.scrollIntoView({ block: "nearest", inline: "nearest" });
    peindre();
    const loupe = document.querySelector("dialog.zoom-produit[open] img");
    const photo = galerie.querySelector("[data-image-principale]");
    if (loupe instanceof HTMLImageElement && photo instanceof HTMLImageElement) { loupe.src = photo.src; loupe.alt = photo.alt; }
  };
  const fleche = (sens, libelle, dessin) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "galerie-fleche"; b.dataset.sens = String(sens);
    b.setAttribute("aria-label", libelle); b.innerHTML = FLECHE(dessin);
    b.addEventListener("click", (e) => { e.stopPropagation(); aller(sens); });
    return b;
  };
  cadre.append(fleche(-1, "Photo précédente", "M15 5l-7 7 7 7"), fleche(1, "Photo suivante", "M9 5l7 7-7 7"), compteur);
  galerie.addEventListener("click", (e) => { if (e.target instanceof Element && e.target.closest(".galerie-vue")) setTimeout(peindre, 0); });
  peindre();
  const glisser = (zone) => {
    let x0 = null, y0 = 0, glisse = false;
    zone.addEventListener("pointerdown", (e) => { x0 = e.clientX; y0 = e.clientY; glisse = false; });
    zone.addEventListener("pointerup", (e) => {
      if (x0 === null) return;
      const dx = e.clientX - x0, dy = e.clientY - y0; x0 = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) { glisse = true; aller(dx < 0 ? 1 : -1); }
    });
    zone.addEventListener("click", (e) => { if (glisse) { e.preventDefault(); e.stopImmediatePropagation(); glisse = false; } }, true);
  };
  glisser(visuel);
  const attendreLoupe = new MutationObserver(() => {
    const dialogue = document.querySelector("dialog.zoom-produit");
    if (!(dialogue instanceof HTMLDialogElement) || dialogue.dataset.fleches) return;
    dialogue.dataset.fleches = "1";
    dialogue.append(fleche(-1, "Photo précédente", "M15 5l-7 7 7 7"), fleche(1, "Photo suivante", "M9 5l7 7-7 7"));
    glisser(dialogue);
    dialogue.addEventListener("keydown", (e) => { if (e.key === "ArrowRight") aller(1); if (e.key === "ArrowLeft") aller(-1); });
    attendreLoupe.disconnect();
  });
  if (document.querySelector("dialog.zoom-produit")) attendreLoupe.observe(document.body, { attributes: true, subtree: false }), attendreLoupe.takeRecords(), (() => { const d = /** @type {HTMLDialogElement|null} */ (document.querySelector("dialog.zoom-produit")); if (d) { attendreLoupe.disconnect(); d.dataset.fleches = "1"; d.append(fleche(-1, "Photo précédente", "M15 5l-7 7 7 7"), fleche(1, "Photo suivante", "M9 5l7 7-7 7")); glisser(d); d.addEventListener("keydown", (/** @type {KeyboardEvent} */ e) => { if (e.key === "ArrowRight") aller(1); if (e.key === "ArrowLeft") aller(-1); }); } })();
  else attendreLoupe.observe(document.body, { childList: true });
});
