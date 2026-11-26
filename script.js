const books = [
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    category: "Fiction",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=85",
    alt: "A colorful stack of books"
  },
  {
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    price: 14.5,
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=700&q=85",
    alt: "Open book on a table"
  },
  {
    title: "The Creative Code",
    author: "Markus du Sautoy",
    category: "Technology",
    price: 19.25,
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=700&q=85",
    alt: "Books arranged on a bookshelf"
  },
  {
    title: "Becoming",
    author: "Michelle Obama",
    category: "Biography",
    price: 18.0,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=85",
    alt: "A book opened to a page"
  },
  {
    title: "The Art of Looking",
    author: "Mira Bell",
    category: "Art & Design",
    price: 21.0,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=700&q=85",
    alt: "Colorful paints and art supplies"
  },
  {
    title: "Color & Composition",
    author: "Theo Rivers",
    category: "Art & Design",
    price: 17.5,
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=700&q=85",
    alt: "Sketchbook and pencils on a desk"
  },
  {
    title: "Small Ideas, Big Art",
    author: "Lena Hart",
    category: "Art & Design",
    price: 23.0,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=700&q=85",
    alt: "Creative workspace with art and books"
  }
];

const bookGrid = document.querySelector("#book-grid");
const searchInput = document.querySelector("#book-search");
const categoryFilter = document.querySelector("#category-filter");
const noResults = document.querySelector("#no-results");
const cartCount = document.querySelector(".cart-count");
const cartButton = document.querySelector(".cart-button");
const categoryChips = document.querySelectorAll(".category-chip");
let selectedCategory = "all";
let cartItems = 0;

function renderBooks() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const visibleBooks = books.filter((book) => {
    const matchesTitle = book.title.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory === "all" || book.category === selectedCategory;
    return matchesTitle && matchesCategory;
  });

  bookGrid.innerHTML = visibleBooks.map((book) => `
    <article class="book-card">
      <div class="book-cover">
        ${book.category === "Art & Design" ? '<span class="book-badge">NEW ARRIVAL</span>' : ""}
        <img src="${book.image}" alt="${book.alt}" loading="lazy">
      </div>
      <div class="book-info">
        <p class="book-category">${book.category}</p>
        <h3 title="${book.title}">${book.title}</h3>
        <p class="book-author">by ${book.author}</p>
        <div class="book-purchase">
          <span class="book-price">$${book.price.toFixed(2)}</span>
          <button class="add-to-cart" type="button" data-book="${book.title}">Add to cart</button>
        </div>
      </div>
    </article>
  `).join("");

  noResults.hidden = visibleBooks.length > 0;
}

function setCategory(category) {
  selectedCategory = category;
  categoryFilter.value = category;
  categoryChips.forEach((chip) => {
    const isActive = chip.dataset.category === category;
    chip.classList.toggle("active", isActive);
    chip.setAttribute("aria-pressed", String(isActive));
  });
  renderBooks();
}

searchInput.addEventListener("input", renderBooks);
categoryFilter.addEventListener("change", (event) => setCategory(event.target.value));
categoryChips.forEach((chip) => {
  chip.setAttribute("aria-pressed", String(chip.dataset.category === "all"));
  chip.addEventListener("click", () => setCategory(chip.dataset.category));
});

bookGrid.addEventListener("click", (event) => {
  const addButton = event.target.closest(".add-to-cart");
  if (!addButton) return;

  cartItems += 1;
  cartCount.textContent = String(cartItems);
  cartButton.setAttribute("aria-label", `Shopping cart, ${cartItems} ${cartItems === 1 ? "item" : "items"}`);
  addButton.textContent = "Added!";
  addButton.disabled = true;
  window.setTimeout(() => {
    addButton.textContent = "Add to cart";
    addButton.disabled = false;
  }, 900);
});

const contactForm = document.querySelector("#contact-form");
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  document.querySelector("#form-status").textContent = "Thanks for your note! We'll be in touch soon.";
  contactForm.reset();
});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#nav-links");
menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  navLinks.classList.toggle("open", !isExpanded);
});
navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("open");
  }
});

document.querySelector("#current-year").textContent = String(new Date().getFullYear());
renderBooks();
