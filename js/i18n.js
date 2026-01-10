// js/i18n.js

const translations = {
  en: {
    nav_home: "Home",
    nav_services: "Services",

    home_title: "KBS Services",
    home_subtitle: "Game services and boosts. Website in development.",

    card_boost_title: "WoW Boost",
    card_boost_text: "Fast and safe character boosting.",

    card_dungeon_title: "Dungeon Runs",
    card_dungeon_text: "Dungeons with an experienced team.",

    card_raid_title: "Raid Carry",
    card_raid_text: "Raids of any difficulty level.",

    services_title: "Our services",
    services_subtitle: "Choose what you need and contact us for details.",
    services_item_1: "WoW Boost",
    services_item_2: "Dungeon Runs",
    services_item_3: "Raid Carry"
  },

  ru: {
    nav_home: "Главная",
    nav_services: "Услуги",

    home_title: "KBS Services",
    home_subtitle: "Продажа игровых услуг и бустов. Сайт в разработке.",

    card_boost_title: "WoW Boost",
    card_boost_text: "Быстрый и безопасный буст персонажа.",

    card_dungeon_title: "Dungeon Runs",
    card_dungeon_text: "Прохождение подземелий с опытной командой.",

    card_raid_title: "Raid Carry",
    card_raid_text: "Рейды любого уровня сложности.",

    services_title: "Наши услуги",
    services_subtitle: "Выберите нужное и свяжитесь с нами для деталей.",
    services_item_1: "WoW Boost",
    services_item_2: "Dungeon Runs",
    services_item_3: "Raid Carry"
  }
};

function setActiveLangButton(lang) {
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}

function applyLanguage(lang) {
  const dict = translations[lang] || translations.en;

  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });

  localStorage.setItem("lang", lang);
  setActiveLangButton(lang);
}

function initI18n(defaultLang = "en") {
  const savedLang = localStorage.getItem("lang") || defaultLang;
  applyLanguage(savedLang);

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
  });
}

// делаем функции доступными в HTML
window.initI18n = initI18n;
