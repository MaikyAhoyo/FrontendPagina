const PRECIO_ESTANDAR = 59.99;

function loadCart() {
  const cartContainer = document.getElementById("cart-items");
  const wrapper = document.getElementById("cart-wrapper");

  let cart = JSON.parse(localStorage.getItem("carrito")) || [];

  if (cart.length === 0) {
    wrapper.classList.add("empty");
    wrapper.innerHTML = `
      <div class="empty-msg">
        <i class="ph ph-shopping-cart"></i>
        <h2>Tu carrito está vacío</h2>
        <a href="index.html" class="btn">Volver al inicio</a>
      </div>
    `;
    return;
  }

  wrapper.classList.remove("empty");
  cartContainer.innerHTML = cart
    .map(
      (game) => `
    <article class="cart-item">
      <img src="${game.image}" alt="${game.title}" class="item-img">

      <div class="item-info">
        <h3>${game.title}</h3>
        <p>${game.developer} • ${game.release_date.split("-")[0]}</p>
      </div>

      <div class="item-price">$${PRECIO_ESTANDAR}</div>

      <button class="btn-remove" onclick="removeFromCart(${game.id})" aria-label="Eliminar">
        <i class="ph ph-trash"></i>
      </button>
    </article>
  `,
    )
    .join("");

  calculateTotals(cart.length);
}

function calculateTotals(quantity) {
  const subtotal = quantity * PRECIO_ESTANDAR;
  const tax = subtotal * 0.16;
  const total = subtotal + tax;

  document.getElementById("subtotal-price").textContent =
    `$${subtotal.toFixed(2)}`;
  document.getElementById("tax-price").textContent = `$${tax.toFixed(2)}`;
  document.getElementById("total-price").textContent = `$${total.toFixed(2)}`;
}

function removeFromCart(gameId) {
  let cart = JSON.parse(localStorage.getItem("carrito")) || [];
  const newCart = cart.filter((game) => game.id !== gameId);
  localStorage.setItem("carrito", JSON.stringify(newCart));
  loadCart();
}

function clearCart() {
  if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
    localStorage.removeItem("carrito");
    loadCart();
  }
}

document.addEventListener("DOMContentLoaded", loadCart);
