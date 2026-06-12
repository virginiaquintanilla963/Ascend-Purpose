// ============================================================
// Ascend With Porpuse – App logic
// ============================================================

let cart = [];

function fmt(n) {
  return "$" + n.toLocaleString("es-CL");
}

// ── Tarjeta producto (poleron / buzo) ────────────────────────
function createProductCard(item) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.setAttribute("data-id", item.id);

  const tallas = item.tallas.map(t =>
    `<button class="talla-btn" data-talla="${t}" onclick="selectTalla(this)">${t}</button>`
  ).join("");

  card.innerHTML = `
    <div class="card-preview" style="border-top: 4px solid ${item.color.hex};">
      <img src="${item.imagen}" alt="${item.nombre}" class="card-img" loading="lazy" />
    </div>
    <div class="card-body">
      <div class="card-grupo">${item.grupo === "tierra" ? "🌿 Tierra" : "🌸 Pastel"}</div>
      <h3 class="card-name">${item.nombre}</h3>
      <p class="card-desc">${item.descripcion}</p>
      <div class="card-color-row">
        <span class="color-dot" style="background:${item.color.hex};"></span>
        <span class="color-name">${item.color.name}</span>
      </div>
      <div class="tallas-label">Talla:</div>
      <div class="tallas-row">${tallas}</div>
      <div class="card-footer">
        <span class="card-price">${fmt(item.precio)}</span>
        <button class="btn-add" onclick="addToCart('${item.id}', this)">Agregar</button>
      </div>
    </div>
  `;
  return card;
}

// ── Tarjeta accesorio ────────────────────────────────────────
function createAccCard(item) {
  const card = document.createElement("article");
  card.className = "product-card acc-card";

  card.innerHTML = `
    <div class="card-preview acc-preview">
      <div class="card-emoji">${item.emoji}</div>
    </div>
    <div class="card-body">
      <h3 class="card-name">${item.nombre}</h3>
      <p class="card-desc">${item.descripcion}</p>
      <div class="card-footer">
        <span class="card-price">${fmt(item.precio)}</span>
        <button class="btn-add" onclick="addAccToCart('${item.id}', this)">Agregar</button>
      </div>
    </div>
  `;
  return card;
}

// ── Selección de talla ───────────────────────────────────────
function selectTalla(btn) {
  const row = btn.closest(".tallas-row");
  row.querySelectorAll(".talla-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

// ── Agregar al carrito ───────────────────────────────────────
function addToCart(itemId, btn) {
  const card = btn.closest(".product-card");
  const activeTalla = card.querySelector(".talla-btn.active");
  if (!activeTalla) {
    showToast("Por favor selecciona una talla ⚠️");
    card.querySelector(".tallas-row").classList.add("shake");
    setTimeout(() => card.querySelector(".tallas-row").classList.remove("shake"), 500);
    return;
  }

  const all = [
    ...window.PYMEDATA.polerones.tierra,
    ...window.PYMEDATA.polerones.pastel,
    ...window.PYMEDATA.buzos.tierra,
    ...window.PYMEDATA.buzos.pastel,
  ];
  const producto = all.find(p => p.id === itemId);
  if (!producto) return;

  const talla = activeTalla.dataset.talla;
  const key = `${itemId}-${talla}`;
  const existing = cart.find(c => c.key === key);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ key, id: itemId, nombre: producto.nombre, talla, precio: producto.precio, qty: 1, emoji: "🧥", color: producto.color.name });
  }

  updateCartUI();
  showToast(`✅ ${producto.nombre} (${talla}) agregado`);
  openCart();
}

function addAccToCart(itemId, btn) {
  const producto = window.PYMEDATA.accesorios.find(a => a.id === itemId);
  if (!producto) return;

  const existing = cart.find(c => c.key === itemId);
  if (existing) { existing.qty++; }
  else { cart.push({ key: itemId, id: itemId, nombre: producto.nombre, talla: "—", precio: producto.precio, qty: 1, emoji: producto.emoji, color: null }); }

  updateCartUI();
  showToast(`✅ ${producto.nombre} agregado`);
  openCart();
}

// ── Carrito UI ───────────────────────────────────────────────
function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelector(".cart-count").textContent = count;

  const container = document.getElementById("cartItems");
  if (cart.length === 0) {
    container.innerHTML = `<p class="cart-empty">Tu carrito está vacío.</p>`;
    document.getElementById("cartTotal").textContent = "$0";
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <span class="ci-emoji">${item.emoji}</span>
      <div class="ci-info">
        <strong>${item.nombre}</strong>
        <span>${item.color ? `Color: ${item.color} · ` : ""}Talla: ${item.talla}</span>
      </div>
      <div class="ci-controls">
        <button onclick="changeQty('${item.key}', -1)">−</button>
        <span>${item.qty}</span>
        <button onclick="changeQty('${item.key}', 1)">+</button>
      </div>
      <span class="ci-price">${fmt(item.precio * item.qty)}</span>
    </div>
  `).join("");

  const total = cart.reduce((s, i) => s + i.precio * i.qty, 0);
  document.getElementById("cartTotal").textContent = fmt(total);
}

function changeQty(key, delta) {
  const item = cart.find(c => c.key === key);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(c => c.key !== key);
  updateCartUI();
}

function openCart() {
  document.getElementById("cartPanel").classList.add("open");
  document.getElementById("cartOverlay").classList.add("open");
}

function closeCart() {
  document.getElementById("cartPanel").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");
}

document.querySelector(".cart-btn").addEventListener("click", () => {
  document.getElementById("cartPanel").classList.toggle("open");
  document.getElementById("cartOverlay").classList.toggle("open");
});

function checkout() {
  if (cart.length === 0) { showToast("Tu carrito está vacío"); return; }
  const total = cart.reduce((s, i) => s + i.precio * i.qty, 0);
  const msg = `¡Hola Ascend With Porpuse! Quiero hacer el siguiente pedido:\n\n${
    cart.map(i => `• ${i.nombre} (Talla: ${i.talla}${i.color ? `, Color: ${i.color}` : ""}) x${i.qty} = ${fmt(i.precio * i.qty)}`).join("\n")
  }\n\nTOTAL: ${fmt(total)}`;
  window.open(`https://wa.me/56900000000?text=${encodeURIComponent(msg)}`, "_blank");
}

// ── Toast ────────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2800);
}

function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("open");
}

function handleForm(e) {
  e.preventDefault();
  showToast("✅ Mensaje enviado. ¡Te contactaremos pronto!");
  e.target.reset();
}

function renderGrid(containerId, items, builder) {
  const el = document.getElementById(containerId);
  if (!el) return;
  items.forEach(item => el.appendChild(builder(item)));
}

document.addEventListener("DOMContentLoaded", () => {
  const d = window.PYMEDATA;
  renderGrid("grid-polerones-tierra", d.polerones.tierra, createProductCard);
  renderGrid("grid-polerones-pastel", d.polerones.pastel, createProductCard);
  renderGrid("grid-buzos-tierra",     d.buzos.tierra,     createProductCard);
  renderGrid("grid-buzos-pastel",     d.buzos.pastel,     createProductCard);
  renderGrid("grid-accesorios",       d.accesorios,       createAccCard);
});
