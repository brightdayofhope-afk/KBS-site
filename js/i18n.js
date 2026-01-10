// js/i18n.js

const translations = {
  en: {
    home_title: "World of Warcraft Anniversary",
    home_subtitle: "Game services and boosts. Website in development.",
    card_boost_title: "WoW Boost",
    card_boost_text: "Fast and safe character boosting.",
    card_dungeon_title: "Dungeon Runs",
    card_dungeon_text: "Dungeons with an experienced team.",
    card_raid_title: "Raid Carry",
    card_raid_text: "Raids of any difficulty level."
  },
  ru: {
    home_title: "World of Warcraft Anniversary",
    home_subtitle: "Продажа игровых услуг и бустов. Сайт в разработке.",
    card_boost_title: "WoW Boost",
    card_boost_text: "Быстрый и безопасный буст персонажа.",
    card_dungeon_title: "Dungeon Runs",
    card_dungeon_text: "Прохождение подземелий с опытной командой.",
    card_raid_title: "Raid Carry",
    card_raid_text: "Рейды любого уровня сложности."
  }
};

function applyLanguage(lang) {
  const dict = translations[lang] || translations.en;

  document.documentElement.lang = lang;

  // Переводим все элементы с data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });

  // (опционально) перевод плейсхолдера поиска
  const searchInput = document.querySelector(".header-search input");
  if (searchInput) {
    searchInput.placeholder = lang === "ru" ? "Поиск услуг..." : "Search services...";
  }

  localStorage.setItem("lang", lang);

  // Обновляем кнопку-переключатель
  const toggle = document.getElementById("langToggle");
  if (toggle) {
    toggle.textContent = lang.toUpperCase(); // EN / RU
    toggle.classList.toggle("active-ru", lang === "ru");
  }
}

function initI18n(defaultLang = "en") {
  const savedLang = localStorage.getItem("lang") || defaultLang;
  applyLanguage(savedLang);

  const toggle = document.getElementById("langToggle");
  if (!toggle) {
    console.warn("langToggle button not found");
    return;
  }

  toggle.addEventListener("click", () => {
    const current = localStorage.getItem("lang") || defaultLang;
    const next = current === "en" ? "ru" : "en";
    applyLanguage(next);
  });
}

// делаем доступным в HTML
window.initI18n = initI18n;

function initReviews() {
  document.querySelectorAll("[data-review]").forEach(form => {
    const starsWrap = form.querySelector(".stars");
    const hidden = form.querySelector('input[name="rating"]');

    if (!starsWrap || !hidden) return;

    starsWrap.dataset.rating = "0";

    starsWrap.querySelectorAll(".star").forEach(btn => {
      btn.addEventListener("click", () => {
        const rating = btn.dataset.value;
        starsWrap.dataset.rating = rating;
        hidden.value = rating;
      });
    });

    // Пока без сервера — просто заглушка
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.querySelector('input[name="name"]').value.trim();
      const text = form.querySelector('textarea[name="text"]').value.trim();
      const rating = hidden.value;

      alert(`Saved locally (demo)\\nName: ${name || "Anonymous"}\\nRating: ${rating}\\nText: ${text || "-"}`);
      form.reset();
      starsWrap.dataset.rating = "0";
      hidden.value = "0";
    });
  });
}

// запускаем после загрузки страницы
window.addEventListener("DOMContentLoaded", initReviews);
