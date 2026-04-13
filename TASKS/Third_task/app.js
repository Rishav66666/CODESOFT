// ─── DATA ─────────────────────────────────────────────────────────────────────

const DATA = {
  movies: [
    { id: "m1",  title: "Inception",         emoji: "🌀", genres: ["Sci-Fi","Thriller","Drama"],     year: 2010, director: "Nolan" },
    { id: "m2",  title: "The Godfather",      emoji: "🎩", genres: ["Drama","Crime","Classic"],       year: 1972, director: "Coppola" },
    { id: "m3",  title: "Interstellar",       emoji: "🚀", genres: ["Sci-Fi","Drama","Adventure"],    year: 2014, director: "Nolan" },
    { id: "m4",  title: "Parasite",           emoji: "🏚️", genres: ["Thriller","Drama","Dark"],       year: 2019, director: "Bong" },
    { id: "m5",  title: "The Dark Knight",    emoji: "🦇", genres: ["Action","Thriller","Crime"],     year: 2008, director: "Nolan" },
    { id: "m6",  title: "Pulp Fiction",       emoji: "🔫", genres: ["Crime","Drama","Classic"],       year: 1994, director: "Tarantino" },
    { id: "m7",  title: "Spirited Away",      emoji: "🐉", genres: ["Animation","Fantasy","Family"],  year: 2001, director: "Miyazaki" },
    { id: "m8",  title: "The Matrix",         emoji: "💊", genres: ["Sci-Fi","Action","Thriller"],    year: 1999, director: "Wachowski" },
    { id: "m9",  title: "Her",               emoji: "💬", genres: ["Sci-Fi","Drama","Romance"],      year: 2013, director: "Jonze" },
    { id: "m10", title: "Mad Max: Fury Road", emoji: "🔥", genres: ["Action","Sci-Fi","Adventure"],  year: 2015, director: "Miller" },
    { id: "m11", title: "Get Out",            emoji: "😱", genres: ["Horror","Thriller","Drama"],     year: 2017, director: "Peele" },
    { id: "m12", title: "The Grand Budapest Hotel", emoji: "🏨", genres: ["Comedy","Drama","Fantasy"], year: 2014, director: "Anderson" },
    { id: "m13", title: "Blade Runner 2049",  emoji: "🌆", genres: ["Sci-Fi","Drama","Thriller"],    year: 2017, director: "Villeneuve" },
    { id: "m14", title: "Whiplash",           emoji: "🥁", genres: ["Drama","Music","Thriller"],      year: 2014, director: "Chazelle" },
    { id: "m15", title: "Hereditary",         emoji: "🕯️", genres: ["Horror","Drama","Thriller"],    year: 2018, director: "Aster" },
  ],
  books: [
    { id: "b1",  title: "Dune",                    emoji: "🏜️", genres: ["Sci-Fi","Fantasy","Epic"],       year: 1965, author: "Herbert" },
    { id: "b2",  title: "1984",                    emoji: "👁️", genres: ["Dystopia","Thriller","Classic"],  year: 1949, author: "Orwell" },
    { id: "b3",  title: "The Alchemist",           emoji: "✨", genres: ["Philosophy","Adventure","Fable"], year: 1988, author: "Coelho" },
    { id: "b4",  title: "Sapiens",                 emoji: "🦴", genres: ["Non-Fiction","History","Science"],year: 2011, author: "Harari" },
    { id: "b5",  title: "The Name of the Wind",    emoji: "🎵", genres: ["Fantasy","Epic","Adventure"],     year: 2007, author: "Rothfuss" },
    { id: "b6",  title: "Crime and Punishment",    emoji: "⚖️", genres: ["Classic","Drama","Psychological"],year: 1866, author: "Dostoevsky" },
    { id: "b7",  title: "Project Hail Mary",       emoji: "🌌", genres: ["Sci-Fi","Adventure","Thriller"],  year: 2021, author: "Weir" },
    { id: "b8",  title: "The Great Gatsby",        emoji: "🥂", genres: ["Classic","Drama","Romance"],      year: 1925, author: "Fitzgerald" },
    { id: "b9",  title: "Atomic Habits",           emoji: "⚛️", genres: ["Non-Fiction","Self-Help","Science"],year: 2018, author: "Clear" },
    { id: "b10", title: "Thinking, Fast and Slow", emoji: "🧠", genres: ["Non-Fiction","Psychology","Science"],year: 2011, author: "Kahneman" },
    { id: "b11", title: "The Road",                emoji: "🌑", genres: ["Drama","Thriller","Dark"],        year: 2006, author: "McCarthy" },
    { id: "b12", title: "Neuromancer",             emoji: "🕹️", genres: ["Sci-Fi","Cyberpunk","Thriller"],  year: 1984, author: "Gibson" },
    { id: "b13", title: "Brief History of Time",   emoji: "⏳", genres: ["Non-Fiction","Science","Philosophy"],year: 1988, author: "Hawking" },
    { id: "b14", title: "Piranesi",                emoji: "🏛️", genres: ["Fantasy","Mystery","Drama"],      year: 2020, author: "Clarke" },
    { id: "b15", title: "The Hitchhiker's Guide",  emoji: "🌍", genres: ["Sci-Fi","Comedy","Adventure"],    year: 1979, author: "Adams" },
  ],
  products: [
    { id: "p1",  title: "Mechanical Keyboard",   emoji: "⌨️", genres: ["Tech","Productivity","Gaming"],   brand: "Various" },
    { id: "p2",  title: "Noise-Cancelling Headphones", emoji: "🎧", genres: ["Audio","Tech","Lifestyle"], brand: "Premium" },
    { id: "p3",  title: "Standing Desk",          emoji: "🖥️", genres: ["Productivity","Health","Office"],brand: "Ergonomic" },
    { id: "p4",  title: "Smart Watch",            emoji: "⌚", genres: ["Tech","Health","Lifestyle"],     brand: "Wearable" },
    { id: "p5",  title: "French Press",           emoji: "☕", genres: ["Kitchen","Lifestyle","Wellness"],brand: "Artisan" },
    { id: "p6",  title: "Kindle e-Reader",        emoji: "📱", genres: ["Books","Tech","Lifestyle"],      brand: "Amazon" },
    { id: "p7",  title: "DSLR Camera",            emoji: "📷", genres: ["Photography","Creative","Tech"], brand: "Pro" },
    { id: "p8",  title: "Running Shoes",          emoji: "👟", genres: ["Sports","Health","Lifestyle"],   brand: "Athletic" },
    { id: "p9",  title: "Smart Speaker",          emoji: "🔊", genres: ["Audio","Tech","Smart Home"],     brand: "AI" },
    { id: "p10", title: "Yoga Mat",               emoji: "🧘", genres: ["Health","Wellness","Sports"],    brand: "Eco" },
    { id: "p11", title: "Ergonomic Chair",        emoji: "🪑", genres: ["Productivity","Health","Office"],brand: "Ergonomic" },
    { id: "p12", title: "Drawing Tablet",         emoji: "🎨", genres: ["Creative","Tech","Art"],         brand: "Digital" },
    { id: "p13", title: "Sous Vide Cooker",       emoji: "🍳", genres: ["Kitchen","Lifestyle","Gourmet"],brand: "Culinary" },
    { id: "p14", title: "Portable Projector",     emoji: "📽️", genres: ["Tech","Entertainment","Lifestyle"],brand: "Portable" },
    { id: "p15", title: "Espresso Machine",       emoji: "☕", genres: ["Kitchen","Lifestyle","Gourmet"],brand: "Artisan" },
  ]
};

// Gradient palettes per tab
const GRADIENTS = {
  movies:   ["#1a0a2e, #3a1a5e", "#0a1a2e, #1a3a5e", "#2e0a0a, #5e1a1a", "#0a2e1a, #1a5e3a"],
  books:    ["#1a1a0a, #3a3a1a", "#0a1a2e, #1a3a5e", "#2e1a0a, #5e3a1a", "#1a0a2e, #3a1a4e"],
  products: ["#0a2e2e, #1a5e5e", "#2e0a2e, #5e1a5e", "#1a2e0a, #3a5e1a", "#2e2e0a, #5e5e1a"],
};

// ─── STATE ────────────────────────────────────────────────────────────────────

let state = {
  tab:    "movies",
  ratings: {},   // id -> 1..5
};

// ─── CONTENT-BASED FILTERING ──────────────────────────────────────────────────

function buildGenreProfile(items, ratings) {
  const profile = {};
  items.forEach(item => {
    const score = ratings[item.id] || 0;
    if (score > 0) {
      item.genres.forEach(g => {
        profile[g] = (profile[g] || 0) + score;
      });
    }
  });
  return profile;
}

function contentScore(item, profile) {
  let total = 0;
  item.genres.forEach(g => { total += (profile[g] || 0); });
  return total;
}

// ─── COLLABORATIVE SIGNAL (simulated user similarity) ────────────────────────
// We define a small matrix of "simulated users" per tab for richer recs

const SIM_USERS = {
  movies: [
    { ratings: { m1:5, m3:5, m8:4, m13:4, m9:3 } },  // Sci-Fi lover
    { ratings: { m2:5, m6:5, m4:4, m14:4, m11:3 } },  // Drama/Crime
    { ratings: { m5:5, m10:5, m8:4, m3:3, m15:3 } },  // Action/Thriller
    { ratings: { m7:5, m12:5, m9:4, m14:3, m2:3 } },  // Artsy/Unique
  ],
  books: [
    { ratings: { b1:5, b7:5, b12:4, b5:4, b13:3 } },  // Sci-Fi
    { ratings: { b2:5, b6:5, b11:4, b8:4, b3:3 } },   // Classic/Dark
    { ratings: { b4:5, b9:5, b10:4, b13:4, b3:3 } },  // Non-Fiction
    { ratings: { b5:5, b1:4, b14:5, b15:4, b7:3 } },  // Fantasy/Adventure
  ],
  products: [
    { ratings: { p1:5, p2:5, p3:4, p6:4, p9:3 } },   // Tech/Productivity
    { ratings: { p5:5, p13:5, p15:4, p10:4, p8:3 } }, // Lifestyle/Wellness
    { ratings: { p7:5, p12:5, p2:4, p14:4, p6:3 } },  // Creative/Media
    { ratings: { p8:5, p10:5, p4:4, p2:3, p3:4 } },   // Health/Active
  ]
};

function cosineSimilarity(vecA, vecB) {
  const keys = new Set([...Object.keys(vecA), ...Object.keys(vecB)]);
  let dot = 0, normA = 0, normB = 0;
  keys.forEach(k => {
    const a = vecA[k] || 0, b = vecB[k] || 0;
    dot   += a * b;
    normA += a * a;
    normB += b * b;
  });
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

function collaborativeScore(itemId, userRatings) {
  const simUsers = SIM_USERS[state.tab] || [];
  let weightedSum = 0, simSum = 0;
  simUsers.forEach(su => {
    const sim = cosineSimilarity(userRatings, su.ratings);
    if (sim > 0 && su.ratings[itemId]) {
      weightedSum += sim * su.ratings[itemId];
      simSum       += sim;
    }
  });
  return simSum > 0 ? weightedSum / simSum : 0;
}

// ─── HYBRID RECOMMENDATION ────────────────────────────────────────────────────

function getRecommendations() {
  const items      = DATA[state.tab];
  const ratedIds   = Object.keys(state.ratings);
  const unrated    = items.filter(i => !state.ratings[i.id]);
  const profile    = buildGenreProfile(items, state.ratings);
  const ratedCount = ratedIds.length;

  if (ratedCount < 3) return [];

  const scored = unrated.map(item => {
    const cbScore   = contentScore(item, profile);
    const cfScore   = collaborativeScore(item.id, state.ratings);
    const hybrid    = 0.55 * cbScore + 0.45 * (cfScore * 5); // normalise cf
    return { item, score: hybrid };
  });

  scored.sort((a, b) => b.score - a.score);

  const maxScore = scored[0]?.score || 1;
  return scored.slice(0, 8).map((s, i) => ({
    ...s.item,
    matchPct: Math.round((s.score / maxScore) * 100 * (1 - i * 0.03)),
  }));
}

// ─── RENDER ───────────────────────────────────────────────────────────────────

function renderRateList() {
  const list  = document.getElementById("rate-list");
  const items = DATA[state.tab];
  list.innerHTML = "";

  items.forEach((item, idx) => {
    const rating = state.ratings[item.id] || 0;
    const card   = document.createElement("div");
    card.className = `rate-card${rating > 0 ? " rated" : ""}`;
    card.style.animationDelay = `${idx * 0.04}s`;

    const metaParts = item.genres.slice(0, 2).map(g => `<span class="genre-tag">${g}</span>`).join("");
    const extra     = item.year || item.author || item.brand || "";
    const stars     = [1,2,3,4,5].map(n =>
      `<button class="star-btn${n <= rating ? " active" : ""}" data-id="${item.id}" data-val="${n}" aria-label="${n} star">★</button>`
    ).join("");

    card.innerHTML = `
      <div class="rate-card-emoji">${item.emoji}</div>
      <div class="rate-card-info">
        <div class="rate-card-title">${item.title}</div>
        <div class="rate-card-meta">${metaParts}${extra ? `<span>${extra}</span>` : ""}</div>
      </div>
      <div class="rate-stars">${stars}</div>
    `;

    list.appendChild(card);
  });

  // Star click delegation
  list.addEventListener("click", e => {
    const btn = e.target.closest(".star-btn");
    if (!btn) return;
    const id  = btn.dataset.id;
    const val = parseInt(btn.dataset.val);

    // Toggle off if same rating
    if (state.ratings[id] === val) {
      delete state.ratings[id];
    } else {
      state.ratings[id] = val;
    }
    update();
  });
}

function renderRecs() {
  const grid  = document.getElementById("recs-grid");
  const empty = document.getElementById("recs-empty");
  const recs  = getRecommendations();

  if (recs.length === 0) {
    empty.style.display = "flex";
    grid.style.display  = "none";
    grid.innerHTML      = "";
    return;
  }

  empty.style.display = "none";
  grid.style.display  = "grid";
  grid.innerHTML      = "";

  const grads = GRADIENTS[state.tab];

  recs.forEach((item, i) => {
    const card = document.createElement("div");
    card.className = "rec-card";
    card.style.animationDelay = `${i * 0.07}s`;
    const grad = grads[i % grads.length];

    card.innerHTML = `
      <div class="rec-card-top">
        <div class="rec-card-gradient" style="background: linear-gradient(135deg, ${grad})"></div>
        <span style="position:relative;z-index:1">${item.emoji}</span>
      </div>
      <div class="rec-card-body">
        <div class="rec-card-title">${item.title}</div>
        <div class="rec-card-genre">${item.genres[0]}</div>
        <div class="match-bar-wrap">
          <div class="match-bar-bg">
            <div class="match-bar-fill" style="width:0%" data-target="${item.matchPct}"></div>
          </div>
          <span class="match-pct">${item.matchPct}%</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  // Animate bars after paint
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      grid.querySelectorAll(".match-bar-fill").forEach(bar => {
        bar.style.width = bar.dataset.target + "%";
      });
    });
  });
}

function renderTasteProfile() {
  const section = document.getElementById("taste-section");
  const barsDiv = document.getElementById("genre-bars");
  const profile = buildGenreProfile(DATA[state.tab], state.ratings);
  const genres  = Object.entries(profile).sort((a,b) => b[1]-a[1]).slice(0, 8);

  if (genres.length === 0) {
    section.style.display = "none";
    return;
  }

  section.style.display = "block";
  barsDiv.innerHTML = "";

  const max = genres[0][1] || 1;
  genres.forEach(([genre, score]) => {
    const pct = Math.round((score / max) * 100);
    const row = document.createElement("div");
    row.className = "genre-bar-row";
    row.innerHTML = `
      <div class="genre-bar-label">
        <span>${genre}</span>
        <span>${pct}%</span>
      </div>
      <div class="genre-bar-track">
        <div class="genre-bar-inner" style="width:0%" data-target="${pct}"></div>
      </div>
    `;
    barsDiv.appendChild(row);
  });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      barsDiv.querySelectorAll(".genre-bar-inner").forEach(b => {
        b.style.width = b.dataset.target + "%";
      });
    });
  });
}

function updateStats() {
  const ratedCount = Object.keys(state.ratings).length;
  const recs       = getRecommendations();
  const topMatch   = recs[0]?.matchPct;

  animateNumber("stat-rated", ratedCount);
  animateNumber("stat-recs",  recs.length);
  document.getElementById("stat-match").textContent = topMatch ? topMatch + "%" : "—";
}

function animateNumber(id, target) {
  const el   = document.getElementById(id);
  const from = parseInt(el.textContent) || 0;
  const diff = target - from;
  const dur  = 400;
  const start = performance.now();
  function step(now) {
    const t = Math.min((now - start) / dur, 1);
    el.textContent = Math.round(from + diff * t);
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ─── FULL UPDATE ──────────────────────────────────────────────────────────────

function update() {
  // Refresh star states without full re-render for snappier UX
  const items = DATA[state.tab];
  items.forEach(item => {
    const rating = state.ratings[item.id] || 0;
    const card   = document.querySelector(`.rate-card [data-id="${item.id}"]`)?.closest(".rate-card");
    if (card) {
      card.className = `rate-card${rating > 0 ? " rated" : ""}`;
      card.querySelectorAll(".star-btn").forEach(btn => {
        const n = parseInt(btn.dataset.val);
        btn.classList.toggle("active", n <= rating);
      });
    }
  });
  renderRecs();
  renderTasteProfile();
  updateStats();

  const ratedCount = Object.keys(state.ratings).length;
  if (ratedCount > 0) {
    showToast(ratedCount < 3
      ? `Rate ${3 - ratedCount} more to unlock picks ✦`
      : `Recommendations updated ✦`
    );
  }
}

// ─── TOAST ────────────────────────────────────────────────────────────────────

let toastTimer;
function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

// ─── TAB SWITCHING ────────────────────────────────────────────────────────────

function switchTab(tab) {
  state.tab     = tab;
  state.ratings = {};

  document.querySelectorAll(".tab-btn").forEach(b => b.classList.toggle("active", b.dataset.tab === tab));

  renderRateList();
  renderRecs();
  renderTasteProfile();
  updateStats();
}

// ─── INIT ─────────────────────────────────────────────────────────────────────

document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => switchTab(btn.dataset.tab));
});

switchTab("movies");