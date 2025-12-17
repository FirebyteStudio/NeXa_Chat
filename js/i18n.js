let lang = localStorage.getItem("lang") || "pt-BR";
let translations = {};

export async function loadLang() {
  const res = await fetch(`i18n/${lang}.json`);
  translations = await res.json();

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (translations[key]) el.textContent = translations[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (translations[key]) el.placeholder = translations[key];
  });
}

export function t(key) {
  return translations[key] || key;
}

export function setLang(newLang) {
  localStorage.setItem("lang", newLang);
  location.reload();
}
