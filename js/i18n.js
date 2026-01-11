// js/i18n.js (EN ONLY)

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

  }
  
};

function applyLanguage() {
  const dict = translations.en;

  document.documentElement.lang = "en";

  // Translate all elements with data-i18n (EN only)
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });

  // Search placeholder in EN
  const searchInput = document.querySelector(".header-search input");
  if (searchInput) {
    searchInput.placeholder = "Search services...";
  }


/* ===== Reviews ===== */
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

    // Demo submit (no server yet)
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.querySelector('input[name="name"]').value.trim();
      const text = form.querySelector('textarea[name="text"]').value.trim();
      const rating = hidden.value;

      alert(`Saved locally (demo)\nName: ${name || "Anonymous"}\nRating: ${rating}\nText: ${text || "-"}`);
      form.reset();
      starsWrap.dataset.rating = "0";
      hidden.value = "0";
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  initReviews();
});
