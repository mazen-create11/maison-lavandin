/* Mesure du comptoir.
   Trois étages, dans cet ordre de responsabilité :
   1. Écouter ce que le site raconte (événements « ml:… » émis par site.js) et le normaliser.
   2. L'envoyer à la mesure d'audience : sans cookie, sans identifiant persistant, sans donnée personnelle.
      Cette étape ne demande pas de consentement tant qu'elle reste dans le cadre exempté de la CNIL.
   3. Le traduire pour les régies publicitaires : uniquement après un consentement explicite.
   Le bandeau de consentement n'apparaît que si une régie est réellement configurée ci-dessous.
   Aucun envoi ne contient d'e-mail, de nom, d'adresse, ni d'identifiant de visiteur. */

const MESURE = {
  /* Mesure d'audience. fournisseur : "cloudflare" (recommandé), "plausible", ou "" pour aucune.
     Cloudflare Web Analytics ne dépose ni cookie ni identifiant : c'est le seul des deux dont
     l'absence de stockage a été vérifiée dans le code du traceur. Le jeton se copie dans le
     tableau de bord Cloudflare, section « Manage site ».
     ⚠ Plausible conserve par défaut les paramètres utm_* de l'URL, ce qui le fait sortir du cadre
     exempté de consentement en France : si vous le choisissez, désactivez cette collecte d'abord.
     ⚠ La politique de sécurité des pages (Content-Security-Policy, dans le <head> de chaque page)
     bloque tout script externe. Avant d'activer un fournisseur, y ajouter :
       Cloudflare : script-src … https://static.cloudflareinsights.com
                    connect-src … https://cloudflareinsights.com
       Meta       : script-src … https://connect.facebook.net · img-src … https://www.facebook.com
       TikTok     : script-src … https://analytics.tiktok.com  · connect-src … https://analytics.tiktok.com
     Sans cela l'installation échoue en silence et le tableau de bord reste vide. */
  audience: { fournisseur: "", domaine: "maisonlavandin.fr", jeton: "" },
  /* Niveau de collecte.
     "exempte" : page vue, clics avec un libellé, profondeur de lecture. Aucune valeur marchande,
       aucun tunnel de conversion. C'est ce qui permet de mesurer sans bandeau de consentement.
     "complet" : ajoute les offres, les paliers et le départ en commande, qui relèvent de la mesure
       marketing. Ce niveau exige le consentement : il n'envoie rien tant qu'il n'est pas donné. */
  niveau: "exempte",
  /* Régies publicitaires. Identifiants vides = inactives, et alors aucun bandeau n'est affiché. */
  regies: { meta: "", tiktok: "" },
  /* Journal dans la console, à laisser faux en production. */
  debug: false,
};

(() => {
  const CLE_CONSENTEMENT = "maison-lavandin-consentement";
  const DEVISE = "EUR";
  const CLE_OPPOSITION = "maison-lavandin-opposition";
  let consentement = null;
  let opposition = false;
  try { const v = localStorage.getItem(CLE_CONSENTEMENT); if (v === "oui" || v === "non") consentement = v; } catch { /* stockage indisponible : on redemandera */ }
  try { opposition = localStorage.getItem(CLE_OPPOSITION) === "oui"; } catch { /* idem */ }

  const regiesDemandees = Boolean(MESURE.regies.meta || MESURE.regies.tiktok);
  const journal = (...a) => { if (MESURE.debug) console.info("[mesure]", ...a); };

  /* ---------- Étage 2 : mesure d'audience ---------- */
  function chargerAudience() {
    if (opposition) return;
    const f = MESURE.audience.fournisseur;
    if (f === "plausible" && MESURE.audience.domaine) {
      const s = document.createElement("script");
      s.defer = true; s.dataset.domain = MESURE.audience.domaine;
      s.src = "https://plausible.io/js/script.tagged-events.js";
      document.head.append(s);
      window.plausible = window.plausible || function () { (window.plausible.q = window.plausible.q || []).push(arguments); };
    } else if (f === "cloudflare" && MESURE.audience.jeton) {
      const s = document.createElement("script");
      s.defer = true; s.src = "https://static.cloudflareinsights.com/beacon.min.js";
      s.dataset.cfBeacon = JSON.stringify({ token: MESURE.audience.jeton });
      document.head.append(s);
    }
  }
  function versAudience(nom, props, marketing) {
    if (opposition) return;
    if (marketing && MESURE.niveau !== "complet" && consentement !== "oui") return;
    journal(nom, props);
    try { if (typeof window.plausible === "function") window.plausible(nom, { props }); } catch { /* la mesure ne doit jamais casser la page */ }
  }

  /* ---------- Étage 3 : régies, après consentement ---------- */
  let regiesChargees = false;
  function chargerRegies() {
    if (regiesChargees || consentement !== "oui") return;
    regiesChargees = true;
    if (MESURE.regies.meta) {
      /* eslint-disable */
      !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
      /* eslint-enable */
      window.fbq("init", MESURE.regies.meta);
      window.fbq("track", "PageView");
    }
    if (MESURE.regies.tiktok) {
      /* eslint-disable */
      !function (w, d, t) { w.TiktokAnalyticsObject = t; var ttq = w[t] = w[t] || []; ttq.methods = "page track identify instances debug on off once ready alias group enableCookie disableCookie".split(" "); ttq.setAndDefer = function (o, m) { o[m] = function () { o.push([m].concat(Array.prototype.slice.call(arguments, 0))); }; }; for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]); ttq.load = function (e) { var n = "https://analytics.tiktok.com/i18n/pixel/events.js"; ttq._i = ttq._i || {}; ttq._i[e] = []; ttq._i[e]._u = n; ttq._t = ttq._t || {}; ttq._t[e] = +new Date(); ttq._o = ttq._o || {}; ttq._o[e] = {}; var o = d.createElement("script"); o.type = "text/javascript"; o.async = !0; o.src = n + "?sdkid=" + e + "&lib=" + t; var a = d.getElementsByTagName("script")[0]; a.parentNode.insertBefore(o, a); }; }(window, document, "ttq");
      /* eslint-enable */
      window.ttq.load(MESURE.regies.tiktok);
      window.ttq.page();
    }
    journal("régies chargées");
  }
  function versRegies(evenement, donnees) {
    if (consentement !== "oui" || opposition) return;
    try { if (window.fbq && evenement.meta) window.fbq("track", evenement.meta, donnees); } catch { /* idem */ }
    try { if (window.ttq && evenement.tiktok) window.ttq.track(evenement.tiktok, donnees); } catch { /* idem */ }
  }

  /* ---------- Étage 1 : traduction des signaux du site ---------- */
  const contenu = (d) => ({ content_ids: [d.id], content_type: "product", content_name: d.nom, value: d.prix, currency: DEVISE });
  const ecoute = {
    produit: (d) => { versAudience("Fiche produit", { produit: d.nom }); versRegies({ meta: "ViewContent", tiktok: "ViewContent" }, contenu(d)); },
    ajout: (d) => { versAudience("Ajout au panier", { produit: d.nom, origine: d.origine }); versRegies({ meta: "AddToCart", tiktok: "AddToCart" }, { ...contenu(d), value: d.prix * d.quantite }); },
    retrait: (d) => versAudience("Retrait du panier", { produit: d.nom }),
    quantite: (d) => versAudience("Quantité modifiée", { produit: d.id, sens: d.sens }),
    "panier-ouvert": (d) => versAudience("Panier ouvert", { articles: String(d.articles) }),
    "offre-affichee": (d) => versAudience("Offre proposée", { offres: d.offres.join("+") }, true),
    "offre-acceptee": (d) => versAudience("Offre acceptée", { offre: d.cle }, true),
    palier: (d) => versAudience("Palier franchi", { palier: d.cle }, true),
    filtre: (d) => versAudience("Filtre boutique", { categorie: d.categorie }),
    code: (d) => versAudience("Code de réduction", { code: d.code, source: d.source, origine: d.origine }, true),
    commande: (d) => { versAudience("Commande démarrée", { articles: String(d.articles) }, true); versRegies({ meta: "InitiateCheckout", tiktok: "InitiateCheckout" }, { value: d.total, currency: DEVISE, num_items: d.articles, content_ids: d.lignes.map((l) => l.id), content_type: "product" }); },
    inscription: (d) => { versAudience("Inscription à la lettre", { emplacement: d.emplacement }); versRegies({ meta: "Lead", tiktok: "SubmitForm" }, {}); },
  };
  Object.entries(ecoute).forEach(([nom, fn]) => document.addEventListener("ml:" + nom, (e) => { try { fn(e.detail || {}); } catch (err) { journal("erreur", nom, err); } }));

  /* ---------- Profondeur de lecture, une fois par palier et par page ---------- */
  const paliersLecture = [25, 50, 75, 100];
  let dernierPalier = 0;
  function mesurerLecture() {
    const h = document.documentElement;
    const hauteur = h.scrollHeight - h.clientHeight;
    if (hauteur <= 0) return;
    const part = Math.round(((h.scrollTop || document.body.scrollTop) / hauteur) * 100);
    paliersLecture.forEach((p) => { if (part >= p && dernierPalier < p) { dernierPalier = p; versAudience("Lecture", { profondeur: p + " %" }); } });
  }
  let attente = false;
  addEventListener("scroll", () => { if (attente) return; attente = true; requestAnimationFrame(() => { attente = false; mesurerLecture(); }); }, { passive: true });

  /* ---------- Bandeau de consentement : uniquement si une régie est configurée ---------- */
  function demanderConsentement() {
    if (!regiesDemandees || consentement !== null) return;
    const b = document.createElement("aside");
    b.className = "consentement";
    b.setAttribute("role", "dialog");
    b.setAttribute("aria-label", "Cookies de mesure publicitaire");
    b.innerHTML = `<p><strong>Cookies publicitaires.</strong> Nous mesurons l’audience sans vous suivre. Pour savoir si une publicité vous a amené ici, Facebook et TikTok déposent des cookies.</p>
      <div class="consentement-actions"><button class="bouton" type="button" data-consentement="oui">Accepter</button><button class="bouton bouton-clair" type="button" data-consentement="non">Refuser</button><a class="lien-texte" href="legales.html#cookies">En savoir plus</a></div>`;
    b.addEventListener("click", (event) => {
      const bouton = event.target instanceof Element ? event.target.closest("[data-consentement]") : null;
      if (!(bouton instanceof HTMLElement)) return;
      consentement = bouton.dataset.consentement === "oui" ? "oui" : "non";
      try { localStorage.setItem(CLE_CONSENTEMENT, consentement); } catch { /* refus mémorisé le temps de la visite */ }
      b.remove();
      if (consentement === "oui") chargerRegies();
      versAudience("Consentement", { choix: consentement });
    });
    document.body.append(b);
  }

  /* ---------- Bouton d'opposition des mentions légales ---------- */
  function brancherOpposition() {
    const bouton = document.querySelector("[data-opposition]");
    if (!(bouton instanceof HTMLElement)) return;
    const etat = document.querySelector("[data-opposition-etat]");
    const peindre = () => {
      bouton.textContent = opposition ? "Être de nouveau compté dans les statistiques" : "Ne plus être compté dans les statistiques";
      if (etat) etat.textContent = opposition ? "Vos visites ne sont pas comptées sur ce navigateur." : "";
    };
    bouton.addEventListener("click", () => {
      if (opposition) MESURE.reprendre(); else MESURE.opposer();
      peindre();
      if (etat && !opposition) etat.textContent = "Mesure réactivée.";
    });
    peindre();
  }

  chargerAudience();
  chargerRegies();
  const auChargement = () => { demanderConsentement(); brancherOpposition(); };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", auChargement);
  else auChargement();

  /* Ouvert au reste du site : signal("inscription", …) ou MESURE.evenement("Nom", { … }). */
  MESURE.evenement = versAudience;
  MESURE.consentement = () => consentement;
  /* Opposition : appelé par le lien des mentions légales. Coupe toute mesure sur ce navigateur. */
  MESURE.opposer = () => { opposition = true; try { localStorage.setItem(CLE_OPPOSITION, "oui"); localStorage.removeItem(CLE_CONSENTEMENT); } catch { /* rien à mémoriser */ } consentement = "non"; return true; };
  MESURE.reprendre = () => { opposition = false; try { localStorage.removeItem(CLE_OPPOSITION); } catch { /* idem */ } return true; };
  MESURE.oppose = () => opposition;
  window.MESURE = MESURE;
})();
