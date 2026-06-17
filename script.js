const thumbnails = document.querySelectorAll('.thumb');
const mainImage = document.getElementById('mainImage');
const colors = document.querySelectorAll('.color');
const sizes = document.querySelectorAll('.size');
const quantityValue = document.getElementById('quantityValue');
const cartCount = document.getElementById('cartCount');
const addToCartBtn = document.getElementById('addToCart');
const tabs = document.querySelectorAll('.tab');
const tabPanels = document.querySelectorAll('.tab-panel');
const themeToggle = document.getElementById('themeToggle');
const sliderPrev = document.getElementById('prevSlide');
const sliderNext = document.getElementById('nextSlide');
const relatedSlider = document.querySelector('.related-slider');

let quantity = 1;
let currentIndex = 0;

thumbnails.forEach((thumb, index) => {
  thumb.addEventListener('click', () => {
    thumbnails.forEach((item) => item.classList.remove('active'));
    thumb.classList.add('active');
    mainImage.src = thumb.src;
    currentIndex = index;
  });
});

colors.forEach((button) => {
  button.addEventListener('click', () => {
    colors.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
  });
});

sizes.forEach((button) => {
  button.addEventListener('click', () => {
    sizes.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
  });
});

document.getElementById('increaseQty').addEventListener('click', () => {
  quantity += 1;
  quantityValue.textContent = quantity;
});

document.getElementById('decreaseQty').addEventListener('click', () => {
  if (quantity > 1) {
    quantity -= 1;
    quantityValue.textContent = quantity;
  }
});

addToCartBtn.addEventListener('click', () => {
  const newCount = Number(cartCount.textContent) + quantity;
  cartCount.textContent = newCount;
  addToCartBtn.textContent = 'Added ✓';
  setTimeout(() => {
    addToCartBtn.textContent = 'Add to Cart';
  }, 1400);
});

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    tabs.forEach((item) => item.classList.remove('active'));
    tabPanels.forEach((panel) => panel.classList.remove('active'));
    tab.classList.add('active');
    document.querySelector(`[data-panel="${target}"]`).classList.add('active');
  });
});

const applyTheme = (isDark) => {
  document.body.classList.toggle('dark', isDark);
  themeToggle.textContent = isDark ? '☀️' : '🌙';
};

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  applyTheme(true);
} else {
  applyTheme(false);
}

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
});

let scrollPosition = 0;
sliderPrev.addEventListener('click', () => {
  scrollPosition = Math.max(0, scrollPosition - 220);
  relatedSlider.style.transform = `translateX(-${scrollPosition}px)`;
});

sliderNext.addEventListener('click', () => {
  const maxScroll = relatedSlider.scrollWidth - relatedSlider.clientWidth;
  scrollPosition = Math.min(maxScroll, scrollPosition + 220);
  relatedSlider.style.transform = `translateX(-${scrollPosition}px)`;
});
