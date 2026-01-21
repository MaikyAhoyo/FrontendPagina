let games = [];
let reviews = [];

async function init() {
  try {
    games = await fetch("data/games.json").then((res) => res.json());
    reviews = await fetch("data/reviews.json").then((res) => res.json());
    renderGames();
  } catch (error) {
    console.error("Error cargando los datos:", error);
  }
}

function getStars(rating) {
  return (
    '<i class="ph-fill ph-star"></i>'.repeat(rating) +
    '<i class="ph ph-star"></i>'.repeat(5 - rating)
  );
}

function renderGames() {
  const container = document.getElementById("reviews");

  container.className = "games-grid";

  container.innerHTML = games
    .map(
      (game) => `
      <article class="game-card" data-id="${game.id}">
        <div class="card-header">
          <img src="${game.image}" alt="${game.title}">
          <ul class="score-badges">
            <li class="score-badge">
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Metacritic</title><path d="M11.99 0A12 12 0 1 0 24 12v-.014A12 12 0 0 0 11.99 0Zm-.055 2.564a9.399 9.399 0 0 1 9.407 9.389v.01a9.399 9.399 0 1 1-9.408-9.399Zm-1.61 17.198 2.046-2.046-3.94-3.94c-.165-.166-.345-.373-.442-.608-.221-.47-.318-1.203.221-1.742.664-.664 1.548-.387 2.406.47l3.788 3.788 2.046-2.046-3.954-3.954a2.48 2.48 0 0 1-.456-.622c-.263-.539-.25-1.216.235-1.7.677-.678 1.562-.429 2.544.553l3.677 3.677 2.046-2.046-3.982-3.982c-2.018-2.018-3.912-1.949-5.212-.65-.498.499-.802 1.024-.954 1.618a4.026 4.026 0 0 0-.055 1.686l-.027.028c-.996-.414-2.13-.166-3 .705-1.162 1.161-1.12 2.392-.982 3.11l-.042.043-1.009-.816-1.77 1.77a64.1 64.1 0 0 1 2.213 2.1z"/></svg>
              ${game.ratings.metacritic}
            </li>
            <li class="score-badge">
              <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>IGN</title><path d="M5.38 7.66c.59-.9 1.359-1.67 2.26-2.26.13-1.18.31-2.26.52-3.21a10.602 10.602 0 0 0-6 6c.95-.22 2.03-.39 3.21-.52m10.97-2.3v.02c.9.59 1.67 1.37 2.27 2.27 1.18.13 2.26.31 3.21.52a10.632 10.632 0 0 0-6.02-6.01c.22.95.4 2.02.54 3.2m-8.7 13.26c-.9-.59-1.67-1.37-2.27-2.27h-.03c-1.19-.14-2.26-.32-3.19-.54 1.07 2.75 3.26 4.95 6.01 6.02-.22-.95-.39-2.03-.52-3.21m11-2.27h-.03c-.59.9-1.37 1.67-2.27 2.27v.03c-.14 1.17-.32 2.25-.54 3.19a10.593 10.593 0 0 0 6.03-6.03c-.94.22-2 .4-3.19.54M10.04.01h3.9c.85 1.85 1.2 4.59 1.3 5.52.04.22.06.43.06.63L12 9.12 8.7 6.16c0-.17.02-.35.05-.55.1-.95.43-3.75 1.29-5.61M8.7 17.84c0 .17.02.35.05.55.1.95.43 3.75 1.29 5.61h3.9c.85-1.84 1.2-4.59 1.3-5.52.04-.22.06-.43.06-.64L12 14.88l-3.3 2.96ZM6.16 8.69c-.17 0-.35.02-.55.05-.95.12-3.75.45-5.61 1.31v3.9c1.84.85 4.59 1.19 5.52 1.3.22.04.43.06.64.06l2.95-3.3-2.95-3.3v-.02ZM24 10.03c-1.86-.86-4.66-1.19-5.61-1.29-.2-.03-.38-.05-.55-.05l-2.96 3.3 2.96 3.3c.2 0 .41-.02.64-.06.93-.11 3.68-.45 5.52-1.3v-3.9Z"/></svg>
              ${game.ratings.ign}
            </li>
          </ul>
        </div>

        <div class="card-body">
          <div class="meta-info">
            <span class="developer">${game.developer}</span>
            <span class="year">${game.release_date.split("-")[0]}</span>
          </div>

          <h2>${game.title}</h2>

          <div class="tags">
            ${game.genre
              .map((g) => `<span class="badge genre">${g}</span>`)
              .join("")}
          </div>

          <p class="synopsis">${game.synopsis.substring(0, 100)}...</p>
        </div>

        <div class="card-footer">
          <button class="btn-card" onclick="renderReviews(${game.id})">
            Ver Reseñas
          </button>
          <button class="btn-card-alt" onclick="addCart(${game.id})">
            <i class="ph ph-shopping-cart"></i>
          </button>
        </div>
      </article>
  `,
    )
    .join("");
}

function renderReviews(gameId) {
  const container = document.getElementById("reviews");

  const gameReviews = reviews.filter((review) => review.game_id === gameId);
  const game = games.find((g) => g.id === gameId);

  container.className = "reviews-container";

  const backButton = `
    <div class="reviews-header">
        <button class="btn-back" onclick="renderGames()">← Volver al catálogo</button>
        <h2>Reseñas de: <span class="highlight">${game ? game.title : "Juego"}</span></h2>
    </div>
  `;

  if (gameReviews.length === 0) {
    container.innerHTML =
      backButton +
      `<p class="no-reviews">Aún no hay reseñas para este juego.</p>`;
    return;
  }

  const reviewsHTML = gameReviews
    .map(
      (review) => `
      <article class="review-card">
          <div class="review-user">
            <img src="${review.avatar}" alt="${review.author}" class="avatar">
            <div>
              <h3>${review.author}</h3>
              <small>${review.date}</small>
            </div>
          </div>

          <div class="review-content">
            <div class="stars">${getStars(review.rating)}</div>
            <p>"${review.comment}"</p>
          </div>
      </article>
  `,
    )
    .join("");

  container.innerHTML =
    backButton + `<div class="reviews-list">${reviewsHTML}</div>`;
}

function addCart(gameId) {
  const game = games.find((g) => g.id === gameId);
  if (!game) return;
  let cart = JSON.parse(localStorage.getItem("carrito")) || [];
  const existe = cart.find((item) => item.id === gameId);
  if (existe) {
    alert(`¡El juego "${game.title}" ya está en tu carrito!`);
    return;
  }
  cart.push(game);
  localStorage.setItem("carrito", JSON.stringify(cart));
  alert(`${game.title}" ha sido añadido al carrito.`);
}

init();
