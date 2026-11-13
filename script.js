/* AI for Professional Growth — interacciones sin backend */

const CHATGPT_URL = "https://chatgpt.com/";
const COPILOT_URL = "https://copilot.microsoft.com/";

function chatUrl(base, prompt) {
  return prompt ? `${base}?q=${encodeURIComponent(prompt)}` : base;
}

function getFocusable(container) {
  return Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => element.offsetParent !== null);
}

/* ---------- Filtros de aplicaciones ---------- */

const tabs = document.querySelectorAll(".category-tab");
const cards = document.querySelectorAll(".app-card");
const tabPanel = document.getElementById("applications");
const filterStatus = document.getElementById("filterStatus");
const totalCount = document.querySelector(".tab-count");

if (totalCount) {
  totalCount.textContent = String(cards.length).padStart(2, "0");
}

let revealObserver = null;

function revealVisibleCards() {
  if (!revealObserver) return;
  cards.forEach((card) => {
    if (card.hidden || card.classList.contains("is-visible")) return;
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) card.classList.add("is-visible");
  });
}

function activateTab(selectedTab, { focus = false } = {}) {
  const filter = selectedTab.dataset.filter;

  tabs.forEach((tab) => {
    const selected = tab === selectedTab;
    tab.classList.toggle("active", selected);
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });

  if (focus) selectedTab.focus();

  tabPanel.setAttribute("aria-labelledby", selectedTab.id);

  let visible = 0;
  cards.forEach((card) => {
    const show = filter === "todos" || card.dataset.category === filter;
    card.hidden = !show;
    if (show) visible++;
  });

  const label = selectedTab.textContent.replace(/\s*\d+\s*$/, "").trim();
  filterStatus.textContent =
    filter === "todos"
      ? `Mostrando ${visible} aplicaciones.`
      : `Mostrando ${visible} ${visible === 1 ? "aplicación" : "aplicaciones"} de ${label}.`;

  requestAnimationFrame(revealVisibleCards);
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateTab(tab));

  tab.addEventListener("keydown", (event) => {
    let nextIndex = null;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft")
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      activateTab(tabs[nextIndex], { focus: true });
    }
  });
});

/* ---------- Modal de prompts ---------- */

const modal = document.getElementById("promptModal");
const modalPanel = modal.querySelector(".modal-panel");
const modalPrompt = document.getElementById("modalPrompt");
const modalFeedback = document.getElementById("modalFeedback");
const modalChatGPT = document.getElementById("modalChatGPT");
const modalCopilot = document.getElementById("modalCopilot");
const pageRegions = [
  document.querySelector(".site-header"),
  document.getElementById("contenido"),
  document.querySelector(".site-footer"),
  document.querySelector(".skip-link"),
].filter(Boolean);

let currentPrompt = "";
let lastTrigger = null;
let previousOverflow = "";

function openPrompt(prompt, trigger) {
  currentPrompt = prompt;
  lastTrigger = trigger || null;
  modalPrompt.textContent = prompt;
  modalChatGPT.href = chatUrl(CHATGPT_URL, prompt);
  modalCopilot.href = chatUrl(COPILOT_URL, prompt);
  modalFeedback.textContent = "";

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  previousOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  pageRegions.forEach((region) => region.setAttribute("inert", ""));

  modalPanel.focus();
}

function closePrompt() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = previousOverflow;
  pageRegions.forEach((region) => region.removeAttribute("inert"));

  if (lastTrigger && document.contains(lastTrigger)) lastTrigger.focus();
  lastTrigger = null;
}

document.querySelectorAll(".example-toggle").forEach((button) => {
  button.addEventListener("click", () =>
    openPrompt(button.dataset.prompt, button),
  );
});

document.querySelectorAll("[data-close]").forEach((element) => {
  element.addEventListener("click", closePrompt);
});

document.addEventListener("keydown", (event) => {
  if (!modal.classList.contains("open")) return;

  if (event.key === "Escape") {
    event.preventDefault();
    closePrompt();
    return;
  }

  if (event.key !== "Tab") return;

  const focusable = getFocusable(modalPanel);
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (
    event.shiftKey &&
    (document.activeElement === first || document.activeElement === modalPanel)
  ) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

/* ---------- Copiar al portapapeles ---------- */

let feedbackTimer = null;

async function copyText(text, feedback) {
  let message = "";

  try {
    await navigator.clipboard.writeText(text);
    message = "✓ Copiado. Ya puedes pegarlo en tu asistente de IA.";
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const copied = document.execCommand("copy");
    area.remove();
    message = copied
      ? "✓ Prompt copiado."
      : "No se pudo copiar automáticamente. Selecciona el texto para copiarlo.";
  }

  feedback.textContent = message;
  window.clearTimeout(feedbackTimer);
  feedbackTimer = window.setTimeout(() => {
    feedback.textContent = "";
  }, 4000);
}

document.getElementById("copyModal").addEventListener("click", () => {
  copyText(currentPrompt, modalFeedback);
});

/* ---------- Generador de prompts ---------- */

const profession = document.getElementById("profession");
const goal = document.getElementById("goal");
const generatedPrompt = document.getElementById("generatedPrompt");
const copyFeedback = document.getElementById("copyFeedback");
const openChatGPT = document.getElementById("openChatGPT");

function updateGeneratedPrompt() {
  const area = profession.value.trim() || "[tu profesión o área]";
  const prompt = `Actúa como un mentor de desarrollo profesional. Soy ${area} y quiero ${goal.value}. Hazme primero 3 preguntas para conocer mi situación. Después, dame recomendaciones concretas, priorizadas y realistas para avanzar. Incluye un primer paso que pueda completar hoy.`;

  generatedPrompt.textContent = prompt;
  openChatGPT.href = chatUrl(CHATGPT_URL, prompt);
  copyFeedback.textContent = "";
}

profession.addEventListener("input", updateGeneratedPrompt);
goal.addEventListener("change", updateGeneratedPrompt);

document.getElementById("copyGenerated").addEventListener("click", () => {
  copyText(generatedPrompt.textContent, copyFeedback);
});

updateGeneratedPrompt();

/* ---------- Enlaces directos de los ejemplos ---------- */

document.querySelectorAll(".example-link[data-prompt]").forEach((link) => {
  link.href = chatUrl(CHATGPT_URL, link.dataset.prompt);
});

/* ---------- Aparición suave de las tarjetas ---------- */

if (
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 },
  );

  document.documentElement.classList.add("js-reveal");
  cards.forEach((card) => revealObserver.observe(card));

  // Failsafe: nunca dejes contenido oculto si el observer no responde.
  window.setTimeout(() => {
    cards.forEach((card) => card.classList.add("is-visible"));
  }, 2500);
}

window.addEventListener("load", revealVisibleCards);
