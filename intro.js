/* Écran d'entrée « L'envol » : une fois par session, jamais en navigation interne, jamais bloquant.
   Chargé en synchrone dans <head> pour décider avant le premier affichage (pas d'éclair du site puis de la vidéo). */
(() => {
  "use strict";
  const html = document.documentElement;
  const CLE = "ml-intro-vue"; // sessionStorage : un rafraîchissement le garde, fermer l'onglet l'efface
  const SESSION = 10 * 60 * 1000; // un onglet laissé ouvert dix minutes sans rien faire redevient une visite neuve
  const BARRE = "#e1bf9e"; // teinte moyenne du haut de la vidéo : les barres de Safari s'y fondent au lieu de trancher en ivoire
  // Position du logotype dans la carte de fin de chaque vidéo (fractions de l'image), mesurée sur le rendu.
  const LOGO = { "9x16": [0.31481, 0.49583, 0.37037, 0.05357], "16x9": [0.41927, 0.58739, 0.16146, 0.0738] };
  const TAILLE = { "9x16": [1080, 1920], "16x9": [1920, 1080] };
  // Variantes disponibles, de la plus légère à la plus lourde. Le navigateur prend la première qui couvre
  // son écran sans être agrandie de plus de 15 % : un appareil plus dense qu'aucun de ceux d'aujourd'hui
  // montera tout seul d'un cran, sans qu'on touche à cette liste.
  const VARIANTES = {
    "9x16": [{ w: 1080, h: 1920, q: "" }, { w: 1440, h: 2560, q: "-2k" }],
    "16x9": [{ w: 1920, h: 1080, q: "" }, { w: 2560, h: 1440, q: "-2k" }]
  };
  // 1,3 : au-delà l'image molli se voit. En dessous, un MacBook basculerait sur le 2160p
  // pour 10 % de netteté en plus et le double de poids — mesuré appareil par appareil.
  const ETIRE_MAX = 1.3;
  const LARGEUR_COPIE = 480;  // la copie du logotype ne fait que rétrécir : aucun flou de mise à l'échelle
  const FIN_LOGO = 3.8;       // à partir de là le logo est entier à l'écran : une coupure réseau n'empêche plus la glissade
  const DECISION_MAX = 1200;  // script exécuté plus tard : réseau lent, pas d'introduction
  const MONTAGE_MAX = 2500;   // page trop lente à construire : pas d'introduction
  const DEMARRAGE_MAX = 1500; // la vidéo doit démarrer dans ce délai après montage, sinon on entre dans le site
  const MARGE = 1500;         // filet JS au-delà de la fin prévue de la vidéo ; la CSS garde le sien (9 s) si ce script tombe

  const params = new URLSearchParams(location.search);
  const forcer = params.get("intro") === "1";
  const conn = /** @type {any} */ (navigator).connection || {};
  const reduit = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let dernier = 0;
  try { dernier = Number(sessionStorage.getItem(CLE)) || 0; } catch { /* stockage refusé : l'envol joue quand même */ }
  const dejaVue = dernier > 0 && Date.now() - dernier < SESSION;
  const marquer = () => { try { sessionStorage.setItem(CLE, String(Date.now())); } catch { /* stockage refusé */ } };
  let interne = false;
  try { interne = Boolean(document.referrer) && new URL(document.referrer).origin === location.origin; } catch { /* référent illisible */ }
  const robot = navigator.webdriver || /bot|crawl|spider|slurp|facebookexternalhit|embedly|preview/i.test(navigator.userAgent);
  const reseauPauvre = conn.saveData === true || /2g$/.test(conn.effectiveType || "");

  if (dejaVue && interne) marquer(); // naviguer dans le site entretient la session : les 30 min courent depuis la dernière page
  if (params.get("intro") === "0" || reduit) return;
  // Une fois par session : le rafraîchissement ne la rejoue pas, revenir après avoir fermé l'onglet si.
  // La navigation interne est exemptée (référent du même domaine), sinon chaque clic produit la rejouerait.
  if (!forcer && (dejaVue || interne || robot || reseauPauvre || performance.now() > DECISION_MAX)) return;
  // Marquée vue seulement quand elle l'a été : une lecture refusée ou une coupure laisse sa chance au rafraîchissement.
  let vue = false;
  const marquerVue = () => {
    if (vue || forcer) return; // ?intro=1 sert aux démonstrations : il rejoue sans fin
    vue = true;
    marquer();
  };

  const orientation = matchMedia("(orientation: portrait)");
  const F = orientation.matches ? "9x16" : "16x9";
  const racine = new URL("assets/intro/", /** @type {HTMLScriptElement} */ (document.currentScript).src);
  const video = document.createElement("video");
  const lent = conn.effectiveType === "3g";
  const hevc = !lent && video.canPlayType('video/mp4; codecs="hvc1.2.4.L123.B0"') === "probably";
  // En plein écran c'est la plus grande des deux contraintes qui commande : sur un téléphone très allongé,
  // une vidéo 9:16 est étirée par la hauteur, pas par la largeur.
  // ⛔ pas de critère sur conn.downlink : Chrome l'estime bas au premier chargement (mesuré 1,5 Mb/s en local)
  // et personne n'aurait reçu la version nette. Les réseaux pauvres sont déjà écartés plus haut.
  const px = devicePixelRatio || 1;
  const large = innerWidth * px;
  const haut = innerHeight * px;
  const liste = VARIANTES[F];
  const taille = liste.find((v) => Math.max(large / v.w, haut / v.h) <= ETIRE_MAX) || liste[liste.length - 1];
  video.src = new URL(`envol-${F}${lent ? "-leger" : taille.q + (hevc ? "-hevc" : "")}.mp4`, racine).href;
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("playsinline", "");
  video.setAttribute("muted", "");
  video.setAttribute("aria-hidden", "true");
  video.preload = "auto";
  video.className = "intro-video";
  video.load(); // le téléchargement part dès la lecture de <head>
  html.classList.add("intro-on");
  // Safari peint sa barre d'état et sa barre d'adresse avec theme-color : sans ce relais, deux bandes ivoire encadrent la vidéo.
  const baliseBarre = /** @type {HTMLMetaElement | null} */ (document.querySelector('meta[name="theme-color"]'));
  const barreSite = baliseBarre ? baliseBarre.content : "";
  if (baliseBarre) baliseBarre.content = BARRE;

  let calque = null;
  let fini = false;
  let nettoye = false;
  let demarre = false;
  let secours = 0;
  let demarrage = 0;
  let coupure = 0;
  const armerSecours = (ms) => { clearTimeout(secours); secours = setTimeout(() => terminer(false), ms); };
  const annulerMinuteurs = () => { clearTimeout(secours); clearTimeout(demarrage); clearTimeout(coupure); };
  const passer = () => terminer(false);                      // sortie technique : la session n'est pas consommée
  const renoncer = () => { marquerVue(); terminer(false); };  // geste du visiteur : il l'a vue et n'en veut plus
  const touche = (e) => { if (["Escape", "Enter", " ", "Home", "End"].includes(e.key) || e.key.startsWith("Arrow") || e.key.startsWith("Page")) renoncer(); };
  const cachee = () => { if (document.hidden) passer(); };
  function ecouterOrientation(actif) {
    const liste = /** @type {any} */ (orientation);
    if (typeof liste.addEventListener === "function") {
      if (actif) liste.addEventListener("change", passer); else liste.removeEventListener("change", passer);
    } else if (actif) liste.addListener(passer); else liste.removeListener(passer); // Safari antérieur à iOS 14
  }
  armerSecours(forcer ? 15000 : Math.max(1000, MONTAGE_MAX + DEMARRAGE_MAX + 1000 - performance.now()));

  function monter() {
    if (fini) return;
    if (!forcer && performance.now() > MONTAGE_MAX) { terminer(false); return; }
    calque = document.createElement("div");
    calque.className = "intro";
    const bouton = document.createElement("button");
    bouton.type = "button";
    bouton.className = "intro-passer";
    bouton.textContent = "Passer";
    bouton.setAttribute("aria-label", "Passer l’introduction");
    // « click » et non « pointerdown » : le clic qui suit un toucher est absorbé ici au lieu de traverser vers un lien du site.
    calque.addEventListener("click", renoncer);
    calque.append(video, bouton);
    document.body.prepend(calque);
    html.classList.add("intro-montee");

    addEventListener("keydown", touche);
    addEventListener("wheel", renoncer, { passive: true });
    addEventListener("touchmove", renoncer, { passive: true });
    document.addEventListener("visibilitychange", cachee);
    ecouterOrientation(true);

    video.addEventListener("playing", () => {
      demarre = true;
      marquerVue();
      clearTimeout(demarrage);
      clearTimeout(coupure);
      const reste = Number.isFinite(video.duration) ? (video.duration - video.currentTime) * 1000 : 5000;
      armerSecours(reste + MARGE); // le filet suit la lecture réelle, même si la page a démarré tard
    });
    video.addEventListener("ended", () => terminer(true), { once: true });
    video.addEventListener("error", passer, { once: true });
    video.addEventListener("waiting", () => {
      if (!demarre) return;
      if (video.currentTime >= FIN_LOGO) { terminer(true); return; }
      clearTimeout(coupure);
      coupure = setTimeout(passer, 900);
    });
    demarrage = setTimeout(() => { if (!demarre) passer(); }, DEMARRAGE_MAX);
    const lecture = video.play();
    if (lecture && typeof lecture.catch === "function") lecture.catch(passer); // lecture auto refusée (iPhone en économie d'énergie)
  }

  function terminer(glisser) {
    if (fini) return;
    fini = true;
    annulerMinuteurs();
    if (!calque) { nettoyer(); return; }
    calque.classList.add("intro-fin");
    const cible = document.querySelector(".entete .marque img");
    const r = cible && cible.getBoundingClientRect();
    if (glisser && r && r.width > 0 && r.bottom > 0 && "animate" in Element.prototype) {
      glissade(r, /** @type {HTMLImageElement} */ (cible));
    } else {
      calque.classList.add("intro-sortie");
      setTimeout(nettoyer, 320);
    }
  }

  // Le logotype de la vidéo devient une image réelle posée au pixel près, puis rejoint l'en-tête.
  function glissade(fin, cible) {
    setTimeout(nettoyer, 1500); // garde : quoi qu'il arrive au décodage ou à l'animation, le site est rendu
    try {
      const [x, y, w, h] = LOGO[F];
      const [W, H] = TAILLE[F];
      const boite = video.getBoundingClientRect(); // taille réelle affichée (barres d'outils mobiles comprises)
      const s = Math.max(boite.width / W, boite.height / H); // équivalent de object-fit: cover
      const dx = boite.left + (boite.width - W * s) / 2;
      const dy = boite.top + (boite.height - H * s) / 2;
      const depart = { x: x * W * s + dx, y: y * H * s + dy, w: w * W * s, h: h * H * s };
      const logo = document.createElement("img");
      logo.src = cible.currentSrc || cible.src;
      logo.alt = "";
      logo.className = "intro-logo";
      document.body.append(logo);
      // Aucun style en ligne (la CSP du site les refuse, Safari les bloque) : tout passe par l'API Web Animations.
      const lancer = () => {
        try {
          const trajet = logo.animate([
            { opacity: 1, transform: `translate(${depart.x}px, ${depart.y}px) scale(${depart.w / LARGEUR_COPIE})` },
            { opacity: 1, transform: `translate(${fin.left}px, ${fin.top}px) scale(${fin.width / LARGEUR_COPIE})` }
          ], { duration: 650, easing: "cubic-bezier(.32, .72, 0, 1)", fill: "both" });
          calque.classList.add("intro-sortie-lente");
          trajet.finished.then(nettoyer, nettoyer);
        } catch { nettoyer(); }
      };
      if (typeof logo.decode === "function") logo.decode().then(lancer, lancer); else lancer();
    } catch { nettoyer(); }
  }

  function nettoyer() {
    if (nettoye) return;
    nettoye = true;
    annulerMinuteurs();
    removeEventListener("keydown", touche);
    removeEventListener("wheel", renoncer);
    removeEventListener("touchmove", renoncer);
    document.removeEventListener("visibilitychange", cachee);
    ecouterOrientation(false);
    if (baliseBarre) baliseBarre.content = barreSite;
    html.classList.remove("intro-on", "intro-montee");
    document.querySelectorAll(".intro, .intro-logo").forEach((n) => n.remove());
    video.pause();
    video.removeAttribute("src");
    video.load(); // coupe le téléchargement restant
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", monter, { once: true });
  else monter();
})();
