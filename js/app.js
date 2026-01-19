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
  return "⭐".repeat(rating) + "☆".repeat(5 - rating);
}

function renderGames() {
  const container = document.getElementById("reviews");

  container.className = "games-grid";

  container.innerHTML = games
    .map(
      (game) => `
      <article class="game-card" data-id="${game.id}">
        <div class="card-header">
          <img src="${game.image}" alt="${game.title}" loading="lazy">
          <span class="score-badge">${game.ratings.metacritic}</span>
        </div>

        <div class="card-body">
          <div class="meta-info">
            <span class="developer">${game.developer}</span>
            <span class="year">${game.release_date.split("-")[0]}</span>
          </div>

          <h2>${game.title}</h2>

          <div class="tags">
            ${game.genre
              .slice(0, 2)
              .map((g) => `<span class="badge genre">${g}</span>`)
              .join("")}
          </div>

          <p class="synopsis">${game.synopsis.substring(0, 100)}...</p>
        </div>

        <div class="card-footer">
          <button class="btn-card" onclick="renderReviews(${game.id})">
            Ver Reseñas
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

init();
