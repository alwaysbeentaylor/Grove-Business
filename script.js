/* =========================================================
   GROVE BUSINESS — interactions
   - i18n (EN / PT / NL)  with admin-config overrides
   - dynamic fleet & contact loading from /api/*
   - scroll-aware nav, mobile menu, reveal-on-scroll
   - hero mouse parallax + ambient drift
   - racing-car streak across the screen
   ========================================================= */

/* ---------- TRANSLATIONS ---------- */
const i18n = {
  en: {
    "nav.fleet":"Fleet","nav.services":"Services","nav.about":"About","nav.contact":"Contact","nav.book":"Reserve",
    "hero.eyebrow":"PORTUGAL · ESTABLISHED EXCELLENCE","hero.line1":"Drive the","hero.line2":"Extraordinary.",
    "hero.sub":"Mercedes-Benz · Audi · BMW · Porsche · Range Rover. Hand-delivered in Lisbon, Porto and the Algarve.",
    "hero.cta1":"Explore the Fleet","hero.cta2":"Speak to Concierge","hero.scroll":"SCROLL",
    "stats.cars":"vehicles","stats.cities":"cities","stats.delivery":"delivery","stats.concierge":"concierge",
    "intro.eyebrow":"— THE GROVE STANDARD","intro.title":"A private collection, at your service.",
    "intro.body":"Grove Business curates a fleet of immaculately prepared luxury and performance vehicles for guests visiting Portugal. Every car is detailed before delivery, fully insured, and accompanied by a concierge who understands that arrival matters as much as the destination.",
    "fleet.eyebrow":"— THE FLEET","fleet.title":"Curated for the discerning.","fleet.from":"from","fleet.inquire":"Inquire","fleet.meta":"selected vehicles",
    "fleet.note":"Our complete collection includes more than 30 vehicles. Tell us your dates — we will source the right car.",
    "services.eyebrow":"— SERVICES","services.title":"Beyond the keys.",
    "services.s1.title":"Airport Delivery","services.s1.body":"Your vehicle, valeted and ready, the moment you land at LIS, OPO or FAO. No queues. No paperwork at the counter.",
    "services.s2.title":"Private Chauffeur","services.s2.body":"Discreet, multilingual chauffeurs for business travel, vineyard tours along the Douro, or evenings in Cascais.",
    "services.s3.title":"Weddings & Events","services.s3.body":"An arrival worth photographing. Curated cars and full coordination for the day that matters most.",
    "services.s4.title":"Long-Term Lease","services.s4.body":"Monthly programmes for residents and extended stays — flexible terms, full service, replacement on request.",
    "about.eyebrow":"— THE HOUSE","about.title":"Built on trust. Delivered with discretion.",
    "about.p1":"Grove Business operates from the heart of Portugal, serving private clients, high-end travellers and corporate guests who expect nothing less than perfection.",
    "about.p2":"Every booking is handled personally. Every car arrives valeted, fuelled, and on time. We are small enough to remember your name — and large enough to source the car you want, when you want it.",
    "about.l1":"— Fully insured fleet, all vehicles < 2 years old","about.l2":"— 24/7 multilingual concierge support","about.l3":"— Delivery anywhere in mainland Portugal",
    "about.quote":"The car you arrive in is the first chapter of the story you tell when you leave.","about.quoteCite":"— Casa Grove",
    "contact.eyebrow":"— RESERVATIONS","contact.title":"Tell us where, and when.",
    "contact.sub":"A private message is the fastest way to secure your car. Our concierge replies within minutes.",
    "contact.wa1":"Chat on WhatsApp","contact.wa2":"Replies within minutes — 24/7",
    "contact.phone":"Phone","contact.email":"Email","contact.location":"Location","contact.hours":"Hours","contact.hoursVal":"24 / 7 · By appointment",
    "footer.tag":"Luxury car rental · Portugal","footer.rights":"All rights reserved."
  },
  pt: {
    "nav.fleet":"Frota","nav.services":"Serviços","nav.about":"Sobre","nav.contact":"Contacto","nav.book":"Reservar",
    "hero.eyebrow":"PORTUGAL · EXCELÊNCIA RECONHECIDA","hero.line1":"Conduza o","hero.line2":"Extraordinário.",
    "hero.sub":"Mercedes-Benz · Audi · BMW · Porsche · Range Rover. Entrega personalizada em Lisboa, Porto e Algarve.",
    "hero.cta1":"Ver Frota","hero.cta2":"Falar com Concierge","hero.scroll":"DESLIZAR",
    "stats.cars":"viaturas","stats.cities":"cidades","stats.delivery":"entrega","stats.concierge":"concierge",
    "intro.eyebrow":"— O PADRÃO GROVE","intro.title":"Uma coleção privada, ao seu dispor.",
    "intro.body":"A Grove Business reúne uma frota de automóveis de luxo e alta performance, impecavelmente preparados para os hóspedes que visitam Portugal. Cada viatura é detalhada antes da entrega, totalmente segurada, e acompanhada por um concierge que sabe que a chegada importa tanto como o destino.",
    "fleet.eyebrow":"— A FROTA","fleet.title":"Selecionada para os exigentes.","fleet.from":"desde","fleet.inquire":"Reservar","fleet.meta":"viaturas selecionadas",
    "fleet.note":"A nossa coleção completa inclui mais de 30 veículos. Indique-nos as suas datas — encontramos o automóvel certo.",
    "services.eyebrow":"— SERVIÇOS","services.title":"Para além das chaves.",
    "services.s1.title":"Entrega no Aeroporto","services.s1.body":"A sua viatura, lavada e pronta, no momento em que aterra em LIS, OPO ou FAO. Sem filas. Sem balcão.",
    "services.s2.title":"Motorista Privado","services.s2.body":"Motoristas discretos e multilingues para viagens de negócios, tours pelo Douro ou noites em Cascais.",
    "services.s3.title":"Casamentos & Eventos","services.s3.body":"Uma chegada digna de ser fotografada. Carros selecionados e coordenação total para o dia mais importante.",
    "services.s4.title":"Aluguer de Longa Duração","services.s4.body":"Programas mensais para residentes e estadias prolongadas — condições flexíveis, serviço completo, substituição a pedido.",
    "about.eyebrow":"— A CASA","about.title":"Construída em confiança. Entregue com discrição.",
    "about.p1":"A Grove Business opera no coração de Portugal, ao serviço de clientes privados, viajantes exigentes e hóspedes corporativos que não esperam menos do que a perfeição.",
    "about.p2":"Cada reserva é tratada pessoalmente. Cada carro chega lavado, abastecido e a horas. Somos pequenos o suficiente para nos lembrarmos do seu nome — e grandes o suficiente para encontrar o carro que deseja, quando o deseja.",
    "about.l1":"— Frota totalmente segurada, todos os veículos com menos de 2 anos","about.l2":"— Concierge multilingue 24/7","about.l3":"— Entrega em qualquer ponto de Portugal continental",
    "about.quote":"O carro em que se chega é o primeiro capítulo da história que se conta ao partir.","about.quoteCite":"— Casa Grove",
    "contact.eyebrow":"— RESERVAS","contact.title":"Diga-nos onde e quando.",
    "contact.sub":"Uma mensagem privada é a forma mais rápida de garantir o seu carro. O nosso concierge responde em minutos.",
    "contact.wa1":"Conversar no WhatsApp","contact.wa2":"Resposta em minutos — 24/7",
    "contact.phone":"Telefone","contact.email":"Email","contact.location":"Localização","contact.hours":"Horário","contact.hoursVal":"24 / 7 · Por marcação",
    "footer.tag":"Aluguer de luxo · Portugal","footer.rights":"Todos os direitos reservados."
  },
  nl: {
    "nav.fleet":"Vloot","nav.services":"Services","nav.about":"Over ons","nav.contact":"Contact","nav.book":"Reserveer",
    "hero.eyebrow":"PORTUGAL · GEVESTIGDE EXCELLENTIE","hero.line1":"Rijd het","hero.line2":"Uitzonderlijke.",
    "hero.sub":"Mercedes-Benz · Audi · BMW · Porsche · Range Rover. Persoonlijk afgeleverd in Lissabon, Porto en de Algarve.",
    "hero.cta1":"Bekijk de Vloot","hero.cta2":"Spreek met Concierge","hero.scroll":"SCROLL",
    "stats.cars":"voertuigen","stats.cities":"steden","stats.delivery":"levering","stats.concierge":"concierge",
    "intro.eyebrow":"— DE GROVE STANDAARD","intro.title":"Een privécollectie, tot uw dienst.",
    "intro.body":"Grove Business stelt een vloot samen van smetteloos voorbereide luxe- en sportwagens voor gasten die Portugal bezoeken. Elke auto wordt voor levering gedetailleerd, volledig verzekerd, en begeleid door een concierge die begrijpt dat de aankomst even belangrijk is als de bestemming.",
    "fleet.eyebrow":"— DE VLOOT","fleet.title":"Geselecteerd voor de kenner.","fleet.from":"vanaf","fleet.inquire":"Informeer","fleet.meta":"geselecteerde voertuigen",
    "fleet.note":"Onze volledige collectie omvat meer dan 30 voertuigen. Geef ons uw data — wij zoeken de juiste auto.",
    "services.eyebrow":"— SERVICES","services.title":"Meer dan de sleutel.",
    "services.s1.title":"Aflevering Luchthaven","services.s1.body":"Uw auto, gereinigd en klaar, op het moment dat u landt op LIS, OPO of FAO. Geen rijen. Geen papierwerk aan de balie.",
    "services.s2.title":"Privéchauffeur","services.s2.body":"Discrete, meertalige chauffeurs voor zakenreizen, wijngaardtours langs de Douro of avonden in Cascais.",
    "services.s3.title":"Bruiloften & Events","services.s3.body":"Een aankomst die het waard is om te fotograferen. Geselecteerde auto's en volledige coördinatie voor de belangrijkste dag.",
    "services.s4.title":"Lange Termijn Huur","services.s4.body":"Maandelijkse programma's voor residenten en langer verblijf — flexibele voorwaarden, volledige service, vervanging op aanvraag.",
    "about.eyebrow":"— HET HUIS","about.title":"Gebouwd op vertrouwen. Met discretie geleverd.",
    "about.p1":"Grove Business opereert vanuit het hart van Portugal en bedient particuliere cliënten, veeleisende reizigers en zakelijke gasten die niets minder dan perfectie verwachten.",
    "about.p2":"Elke boeking wordt persoonlijk afgehandeld. Elke auto komt gereinigd, getankt en op tijd. Wij zijn klein genoeg om uw naam te onthouden — en groot genoeg om de auto te leveren die u wenst, wanneer u dat wenst.",
    "about.l1":"— Volledig verzekerde vloot, alle voertuigen < 2 jaar oud","about.l2":"— 24/7 meertalige concierge support","about.l3":"— Aflevering overal in continentaal Portugal",
    "about.quote":"De auto waarin je aankomt is het eerste hoofdstuk van het verhaal dat je vertelt als je vertrekt.","about.quoteCite":"— Casa Grove",
    "contact.eyebrow":"— RESERVERINGEN","contact.title":"Vertel ons waar, en wanneer.",
    "contact.sub":"Een persoonlijk bericht is de snelste manier om uw auto te reserveren. Onze concierge antwoordt binnen enkele minuten.",
    "contact.wa1":"Chat op WhatsApp","contact.wa2":"Antwoord binnen minuten — 24/7",
    "contact.phone":"Telefoon","contact.email":"E-mail","contact.location":"Locatie","contact.hours":"Openingstijden","contact.hoursVal":"24 / 7 · Op afspraak",
    "footer.tag":"Luxe autoverhuur · Portugal","footer.rights":"Alle rechten voorbehouden."
  }
};

let currentLang = 'en';
let siteConfig  = {};   // overrides from /api/config

const escHtml = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];

/* ---------- LANGUAGE + CONFIG OVERRIDE ---------- */

function applyLang(lang){
  currentLang = lang;
  const dict = i18n[lang] || i18n.en;
  document.documentElement.lang = lang;

  $$("[data-i18n]").forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.textContent = dict[key];
  });
  $$('.lang-switch button').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));

  applyConfigOverrides();
  try { localStorage.setItem('gb-lang', lang); } catch (e) {}
}

/* If admin set custom hero/about copy or contact info, override the i18n defaults. */
function applyConfigOverrides(){
  const cfg = siteConfig || {};
  const h   = cfg.hero    || {};
  const a   = cfg.about   || {};
  const c   = cfg.contact || {};

  if (h.eyebrow)    $('[data-i18n="hero.eyebrow"]').textContent = h.eyebrow;
  if (h.titleStart) $('[data-i18n="hero.line1"]').textContent   = h.titleStart;
  if (h.titleEnd)   $('[data-i18n="hero.line2"]').textContent   = h.titleEnd;
  if (h.subtitle)   $('[data-i18n="hero.sub"]').textContent     = h.subtitle;
  if (h.image)      $('.hero-bg').style.backgroundImage         = `url("${h.image.replace(/"/g,'%22')}")`;

  if (a.title)      $('[data-i18n="about.title"]').textContent = a.title;
  if (a.paragraph1) $('[data-i18n="about.p1"]').textContent    = a.paragraph1;
  if (a.paragraph2) $('[data-i18n="about.p2"]').textContent    = a.paragraph2;
  if (a.image)      $('.about-img').style.backgroundImage      = `url("${a.image.replace(/"/g,'%22')}")`;

  if (c.whatsapp) {
    $$('a[data-wa]').forEach(a => a.href = 'https://wa.me/' + c.whatsapp);
  }
  if (c.phone) {
    const p = $('a[data-phone]');
    if (p){ p.href = 'tel:' + c.phone.replace(/[^\d+]/g,''); p.textContent = c.phone; }
  }
  if (c.email) {
    const m = $('a[data-email]');
    if (m){ m.href = 'mailto:' + c.email; m.textContent = c.email; }
  }
  if (c.location) {
    const l = $('[data-location]');
    if (l) l.textContent = c.location;
  }
  if (c.address) {
    const ad = $('[data-address]');
    if (ad) ad.textContent = c.address;
    const row = $('[data-address-row]');
    if (row) row.hidden = false;
  }
  if (c.hours) {
    const h = $('[data-i18n="contact.hoursVal"]');
    if (h) h.textContent = c.hours;
  }
}

$$('.lang-switch button').forEach(btn => btn.addEventListener('click', () => applyLang(btn.dataset.lang)));

/* ---------- DYNAMIC FLEET ---------- */

async function loadFleet(){
  try {
    const res = await fetch('/api/fleet', { cache: 'no-store' });
    if (!res.ok) return;
    const fleet = await res.json();
    if (!Array.isArray(fleet) || !fleet.length) return;
    renderFleet(fleet);
  } catch (e) { /* keep static fallback cards in HTML */ }
}

function renderFleet(fleet){
  const grid = $('.fleet-grid');
  if (!grid) return;
  const cur = (siteConfig.currency || '€');
  const fromTxt = (i18n[currentLang] || i18n.en)['fleet.from'] || 'from';
  const inqTxt  = (i18n[currentLang] || i18n.en)['fleet.inquire'] || 'Inquire';

  grid.innerHTML = fleet.map(car => `
    <article class="car-card" data-reveal>
      <div class="car-img" style="background-image:url('${escHtml(car.image || '').replace(/'/g,'%27')}')"></div>
      <div class="car-body">
        <span class="car-class">${escHtml(car.class || '')}</span>
        <h3 class="car-name">${escHtml(car.name || '')}</h3>
        <ul class="car-specs">${(car.specs || []).map(s => `<li>${escHtml(s)}</li>`).join('')}</ul>
        <div class="car-foot">
          <span class="car-price"><i data-i18n="fleet.from">${escHtml(fromTxt)}</i> ${escHtml(cur)}${escHtml(car.price || '')}<em>/day</em></span>
          <a href="#contact" class="car-cta" data-i18n="fleet.inquire">${escHtml(inqTxt)} <span>→</span></a>
        </div>
      </div>
    </article>`).join('');

  grid.querySelectorAll('[data-reveal]').forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 6, 5) * 80}ms`;
    revealObserver.observe(el);
  });
}

async function loadConfig(){
  try {
    const res = await fetch('/api/config', { cache: 'no-store' });
    if (!res.ok) return;
    const cfg = await res.json();
    if (cfg && typeof cfg === 'object' && !Array.isArray(cfg)) {
      siteConfig = cfg;
      applyConfigOverrides();
    }
  } catch (e) { /* graceful */ }
}

/* ---------- NAV ---------- */

const nav = $('#nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const burger    = $('#burger');
const navMobile = $('#navMobile');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navMobile.classList.toggle('open');
});
navMobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('open');
  navMobile.classList.remove('open');
}));

/* ---------- REVEAL ON SCROLL ---------- */

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

$$('[data-reveal]').forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i % 6, 5) * 80}ms`;
  revealObserver.observe(el);
});

/* ---------- HERO MOUSE PARALLAX + DRIFT ---------- */

(() => {
  const hero   = $('.hero');
  const heroBg = $('.hero-bg');
  if (!hero || !heroBg) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
  const start = performance.now();

  hero.addEventListener('mousemove', e => {
    const r = hero.getBoundingClientRect();
    targetX = (e.clientX - r.width / 2) / r.width;
    targetY = (e.clientY - r.height / 2) / r.height;
  });
  hero.addEventListener('mouseleave', () => { targetX = 0; targetY = 0; });

  function tick(t){
    mouseX += (targetX - mouseX) * 0.08;
    mouseY += (targetY - mouseY) * 0.08;
    const elapsed = (t - start) / 1000;
    const driftX  = Math.sin(elapsed / 9) * 6;
    const driftY  = Math.cos(elapsed / 11) * 5;
    heroBg.style.transform =
      `translate3d(${driftX + mouseX * -22}px, ${driftY + mouseY * -16}px, 0) scale(1.10)`;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

/* ---------- RACING CAR ---------- */

(() => {
  const race = $('.car-race');
  if (!race) return;
  let busy = false;
  let lastRun = 0;

  function go(){
    if (busy) return;
    const now = Date.now();
    if (now - lastRun < 2200) return;
    busy = true; lastRun = now;
    race.classList.remove('run');
    void race.offsetWidth;       // restart animation
    race.classList.add('run');
    setTimeout(() => { busy = false; }, 1700);
  }

  /* Trigger 1: first time the user scrolls past the hero */
  let triggered = false;
  window.addEventListener('scroll', () => {
    if (triggered) return;
    if (window.scrollY > 240) { triggered = true; go(); }
  }, { passive: true });

  /* Trigger 2: clicking the gold "Explore the Fleet" CTA */
  $$('a[href="#fleet"]').forEach(a => a.addEventListener('click', () => setTimeout(go, 80)));

  /* Trigger 3: every time a car-card scrolls into view (subtle, capped) */
  let cardCount = 0;
  const cardObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && cardCount < 1) {
        cardCount++;
        setTimeout(go, 200);
        cardObs.disconnect();
      }
    });
  }, { threshold: 0.5 });
  setTimeout(() => $$('.car-card').forEach(c => cardObs.observe(c)), 600);

  /* Expose for manual test from console */
  window.__race = go;
})();

/* ---------- LOADER ---------- */

window.addEventListener('load', () => {
  setTimeout(() => $('#loader').classList.add('done'), 350);
});

/* ---------- INIT ---------- */

(() => {
  let saved = null;
  try { saved = localStorage.getItem('gb-lang'); } catch (e) {}
  applyLang(saved || 'pt');
})();

$('#year').textContent = new Date().getFullYear();

loadConfig();
loadFleet();
