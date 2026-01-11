// js/offer-builder.js

const PRICES = {
  base: 147.85,
  addons: {
    lvl5860: 25.58,
    honor75k: 307.35,
    stream: 11.64,
  },
  multipliers: {
    piloted: 1.0,
    remote: 1.3,   // +30%
    express: 1.3,  // +30%
  },
};

function money(v) {
  return `$${v.toFixed(2)}`;
}

function getActiveValue(groupName) {
  const group = document.querySelector(`.segmented[data-name="${groupName}"]`);
  if (!group) return null;
  const btn = group.querySelector(".seg-btn.active");
  return btn ? btn.dataset.value : null;
}

function setActive(button) {
  const parent = button.closest(".segmented");
  parent.querySelectorAll(".seg-btn").forEach(b => b.classList.remove("active"));
  button.classList.add("active");
}

function calc() {
  const method = getActiveValue("method") || "piloted";
  const qty = Math.max(1, parseInt(document.getElementById("qtyInput")?.value || "1", 10));
  const express = document.getElementById("express")?.checked;

  const base = PRICES.base * qty;

  let addons = 0;
  document.querySelectorAll(".addon:checked").forEach(ch => {
    const key = ch.dataset.addon;
    addons += PRICES.addons[key] || 0;
  });

  let mult = PRICES.multipliers[method] || 1.0;
  if (express) mult *= PRICES.multipliers.express;

  const total = (base + addons) * mult;

  document.getElementById("basePrice").textContent = money(base);
  document.getElementById("addonsPrice").textContent = money(addons);
  document.getElementById("multiplierInfo").textContent = `×${mult.toFixed(2)}`;
  document.getElementById("totalPrice").textContent = money(total);

  return { qty, method, express, addons, total };
}

function bind() {
  // segmented buttons
  document.querySelectorAll(".seg-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      setActive(btn);
      calc();
    });
  });

  // qty
  const qtyInput = document.getElementById("qtyInput");
  document.getElementById("qtyMinus")?.addEventListener("click", () => {
    qtyInput.value = Math.max(1, (parseInt(qtyInput.value, 10) || 1) - 1);
    calc();
  });
  document.getElementById("qtyPlus")?.addEventListener("click", () => {
    qtyInput.value = Math.max(1, (parseInt(qtyInput.value, 10) || 1) + 1);
    calc();
  });
  qtyInput?.addEventListener("input", calc);

  // checkboxes
  document.querySelectorAll(".addon, #express").forEach(el => el.addEventListener("change", calc));

  // Add to cart (demo)
  document.getElementById("addToCartBtn")?.addEventListener("click", () => {
    const state = calc();

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push({
      sku: "tbc-prepatch-gearing",
      title: "TBC Pre-Patch Gearing",
      ...state,
      createdAt: Date.now(),
    });
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart (demo). Next step: build cart page + real payment.");
  });

  calc();
}

window.addEventListener("DOMContentLoaded", bind);
