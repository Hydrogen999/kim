// WoolTech E-commerce JavaScript
// Main functionality for cart management, product filtering, and interactions

// Global state management
const AppState = {
    cart: JSON.parse(localStorage.getItem('wooltech-cart')) || [],
    products: [],
    filteredProducts: [],
    currentFilters: {
        sizes: [],
        colors: [],
        brands: [],
        maxPrice: 280
    },
    currentSort: 'featured'
};

// Product data
const PRODUCTS = [
    {
        id: 1,
        name: "Wool Runner Mizzle",
        brand: "allbirds",
        price: 125,
        originalPrice: 125,
        image: "https://kimi-web-img.moonshot.cn/img/www.rerun.allbirds.com/2f707d47e61c57673221d2bdd849a706b74a5558.jpg",
        colors: ["oat", "mist-grey", "charcoal"],
        sizes: [7, 8, 9, 10, 11, 12],
        rating: 4.6,
        reviews: 2341,
        description: "Water-repellent wool runners with enhanced grip for all-weather comfort.",
        features: ["Water-repellent finish", "Enhanced traction", "Merino wool upper", "Machine washable"],
        isNew: false,
        isFeatured: true
    },
    {
        id: 2,
        name: "Urban Wooler",
        brand: "baabuk",
        price: 135,
        originalPrice: 135,
        image: "https://kimi-web-img.moonshot.cn/img/us.baabuk.com/d380c16dc9e8805235bbdf279778689d80ad9f9d.jpg",
        colors: ["charcoal", "forest", "oat"],
        sizes: [6, 7, 8, 9, 10, 11, 12, 13],
        rating: 4.8,
        reviews: 892,
        description: "Premium felted wool sneakers crafted in Portugal with traditional techniques.",
        features: ["100% mulesing-free wool", "Handmade felted upper", "Removable insoles", "Elastic laces"],
        isNew: true,
        isFeatured: true
    },
    {
        id: 3,
        name: "Merino Wool Knit",
        brand: "giesswein",
        price: 140,
        originalPrice: 140,
        image: "https://kimi-web-img.moonshot.cn/img/us.giesswein.com/cc5ac00ccef8ef12e26d16f7a79eeb67a84f3673.jpg",
        colors: ["mist-grey", "charcoal", "forest"],
        sizes: [7, 8, 9, 10, 11, 12, 13],
        rating: 4.5,
        reviews: 1245,
        description: "Lightweight merino wool sneakers with 3D knit technology for superior comfort.",
        features: ["3D knit construction", "Lightweight EVA sole", "Machine washable", "Odor resistant"],
        isNew: false,
        isFeatured: true
    },
    {
        id: 4,
        name: "Wool Dasher Mizzle",
        brand: "allbirds",
        price: 145,
        originalPrice: 145,
        image: "https://kimi-web-img.moonshot.cn/img/www.allbirds.com/1307ccb9b365c4f36360349b84e0ba64c00616c7.jpg",
        colors: ["charcoal", "mist-grey"],
        sizes: [7, 8, 9, 10, 11, 12, 13, 14],
        rating: 4.7,
        reviews: 1876,
        description: "Performance running shoes with water-repellent wool and responsive cushioning.",
        features: ["Water-repellent coating", "Responsive midsole", "Trail-ready outsole", "Reflective details"],
        isNew: true,
        isFeatured: false
    },
    {
        id: 5,
        name: "Wool Runner",
        brand: "allbirds",
        price: 110,
        originalPrice: 110,
        image: "https://kimi-web-img.moonshot.cn/img/www.goingzerowaste.com/e5f1514f168ddd62873db62b1e89d1b1dd7fa368.jpg",
        colors: ["oat", "mist-grey", "charcoal", "forest"],
        sizes: [6, 7, 8, 9, 10, 11, 12, 13, 14],
        rating: 4.6,
        reviews: 3421,
        description: "The original wool sneaker that started it all - simple, comfortable, sustainable.",
        features: ["ZQ-certified merino wool", "Carbon-negative sole", "Machine washable", "No-slip laces"],
        isNew: false,
        isFeatured: true
    },
    {
        id: 6,
        name: "Urban Wooler High",
        brand: "baabuk",
        price: 150,
        originalPrice: 150,
        image: "https://kimi-web-img.moonshot.cn/img/www.baabuk.com/8de8924a2fa94becbb55c71d0ff45ff1edc61692.png",
        colors: ["charcoal", "forest"],
        sizes: [7, 8, 9, 10, 11, 12],
        rating: 4.9,
        reviews: 567,
        description: "High-top wool sneakers combining street style with mountain heritage.",
        features: ["High-top design", "Ankle support", "Weather resistant", "Premium materials"],
        isNew: true,
        isFeatured: false
    },
    {
        id: 7,
        name: "Trail Runner SWT",
        brand: "allbirds",
        price: 138,
        originalPrice: 138,
        image: "https://kimi-web-img.moonshot.cn/img/uncrate.com/5e4833b5226368d2e598c586b7898828d68fb598.jpg",
        colors: ["charcoal", "forest", "oat"],
        sizes: [7, 8, 9, 10, 11, 12, 13],
        rating: 4.4,
        reviews: 923,
        description: "Trail-ready wool sneakers with enhanced grip and durability for outdoor adventures.",
        features: ["Trail-specific outsole", "External heel support", "Grippy treads", "Stabilizing design"],
        isNew: false,
        isFeatured: false
    },
    {
        id: 8,
        name: "Wool Knit Slip-On",
        brand: "giesswein",
        price: 125,
        originalPrice: 125,
        image: "https://kimi-web-img.moonshot.cn/img/i.ebayimg.com/c727b63b54ab19b5f65e600325dea37fae983c38.jpg",
        colors: ["mist-grey", "oat", "charcoal"],
        sizes: [6, 7, 8, 9, 10, 11, 12],
        rating: 4.3,
        reviews: 654,
        description: "Easy slip-on wool sneakers perfect for casual wear and travel.",
        features: ["Slip-on design", "Stretch wool upper", "Lightweight construction", "Packable design"],
        isNew: false,
        isFeatured: false
    },
    {
        id: 9,
        name: "Urban Wooler Slip-On",
        brand: "baabuk",
        price: 120,
        originalPrice: 120,
        image: "https://kimi-web-img.moonshot.cn/img/us.baabuk.com/63764ba245b893577acbd92ef9bbd48e004bf08f.png",
        colors: ["oat", "mist-grey"],
        sizes: [7, 8, 9, 10, 11, 12, 13],
        rating: 4.6,
        reviews: 445,
        description: "Comfortable slip-on wool shoes with elastic laces for easy on-off convenience.",
        features: ["Elastic laces", "Slip-on convenience", "Breathable wool", "Durable construction"],
        isNew: false,
        isFeatured: false
    },
    {
        id: 10,
        name: "Wool Pacer",
        brand: "allbirds",
        price: 118,
        originalPrice: 118,
        image: "https://kimi-web-img.moonshot.cn/img/m.media-amazon.com/83b9b2aff674f5b36e42c46a80152881517bdc78.jpg",
        colors: ["charcoal", "mist-grey", "forest"],
        sizes: [7, 8, 9, 10, 11, 12, 13],
        rating: 4.5,
        reviews: 1123,
        description: "Streamlined wool sneakers designed for everyday comfort and versatility.",
        features: ["Streamlined profile", "All-day comfort", "Versatile styling", "Easy care"],
        isNew: false,
        isFeatured: false
    },
    {
        id: 11,
        name: "Merino Runner Pro",
        brand: "giesswein",
        price: 155,
        originalPrice: 155,
        image: "https://kimi-web-img.moonshot.cn/img/www.knittersreview.com/d992012f4884991af77cfa3a9e9b62c73bea09b0.jpg",
        colors: ["charcoal", "forest", "oat"],
        sizes: [8, 9, 10, 11, 12, 13, 14],
        rating: 4.7,
        reviews: 789,
        description: "Professional-grade wool running shoes with advanced cushioning and support.",
        features: ["Advanced cushioning", "Professional grade", "Enhanced support", "Performance focused"],
        isNew: true,
        isFeatured: false
    },
    {
        id: 12,
        name: "Urban Wooler Lite",
        brand: "baabuk",
        price: 115,
        originalPrice: 115,
        image: "https://kimi-web-img.moonshot.cn/img/huckberry.imgix.net/6d933aa2ec930a460cc7b82d16d1253a1d869ea1.jpg",
        colors: ["mist-grey", "oat", "charcoal"],
        sizes: [6, 7, 8, 9, 10, 11, 12, 13],
        rating: 4.4,
        reviews: 567,
        description: "Lightweight version of the classic Urban Wooler for warm weather comfort.",
        features: ["Lightweight design", "Warm weather comfort", "Breathable construction", "Summer ready"],
        isNew: false,
        isFeatured: false
    }
];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    AppState.products = PRODUCTS;
    AppState.filteredProducts = PRODUCTS;
    
    initializeApp();
    updateCartCount();
    
    // Page-specific initialization
    const currentPage = getCurrentPage();
    switch(currentPage) {
        case 'index':
            initializeHomePage();
            break;
        case 'products':
            initializeProductsPage();
            break;
        case 'cart':
            initializeCartPage();
            break;
    }
});

// Utility functions
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('products.html')) return 'products';
    if (path.includes('cart.html')) return 'cart';
    return 'index';
}

function initializeApp() {
    // Initialize animations
    initializeAnimations();
    
    // Initialize testimonials slider if on homepage
    if (getCurrentPage() === 'index') {
        initializeTestimonials();
    }
}

function initializeAnimations() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.product-card, .benefit-icon, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

function initializeTestimonials() {
    if (typeof Splide !== 'undefined') {
        const testimonialSlider = new Splide('#testimonialSlider', {
            type: 'loop',
            perPage: 1,
            perMove: 1,
            gap: '2rem',
            autoplay: true,
            interval: 5000,
            pauseOnHover: true,
            breakpoints: {
                768: {
                    perPage: 1,
                }
            }
        });
        testimonialSlider.mount();
    }
}

// Homepage initialization
function initializeHomePage() {
    loadFeaturedProducts();
}

function loadFeaturedProducts() {
    const featuredProducts = AppState.products.filter(product => product.isFeatured).slice(0, 6);
    const container = document.getElementById('featuredProducts');
    
    if (container) {
        container.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
        
        // Add event listeners
        container.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const productId = parseInt(this.dataset.productId);
                addToCart(productId);
            });
        });
    }
}

// Products page initialization
function initializeProductsPage() {
    loadAllProducts();
    initializeFilters();
    initializeSorting();
    initializePriceRange();
    initializeModal();
}

function loadAllProducts() {
    const container = document.getElementById('productGrid');
    if (container) {
        renderProducts(AppState.products);
    }
}

function renderProducts(products) {
    const container = document.getElementById('productGrid');
    if (!container) return;
    
    container.innerHTML = products.map(product => createProductCard(product)).join('');
    updateResultCount(products.length);
    
    // Add event listeners
    container.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = parseInt(this.dataset.productId);
            addToCart(productId);
        });
    });
    
    container.querySelectorAll('.quick-view').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = parseInt(this.dataset.productId);
            openProductModal(productId);
        });
    });
}

function createProductCard(product) {
    const colors = product.colors.map(color => `
        <div class="w-6 h-6 rounded-full border border-gray-300 cursor-pointer hover:scale-110 transition-transform" 
             style="background-color: ${getColorValue(color)}" 
             title="${color}"></div>
    `).join('');
    
    return `
        <div class="product-card p-6 rounded-2xl">
            <div class="relative mb-4">
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded-lg">
                ${product.isNew ? '<span class="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">New</span>' : ''}
                ${product.isFeatured ? '<span class="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">Featured</span>' : ''}
                <button class="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors quick-view" data-product-id="${product.id}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                </button>
            </div>
            
            <div class="mb-3">
                <h3 class="font-semibold text-gray-900 mb-1">${product.name}</h3>
                <p class="text-sm text-gray-600 mb-2">${product.brand.charAt(0).toUpperCase() + product.brand.slice(1)}</p>
                <div class="flex items-center mb-2">
                    <div class="flex text-yellow-400 text-sm mr-2">
                        ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                    </div>
                    <span class="text-gray-500 text-sm">(${product.reviews})</span>
                </div>
                <div class="flex items-center justify-between">
                    <div>
                        <span class="text-xl font-bold text-gray-900">$${product.price}</span>
                        ${product.originalPrice > product.price ? `<span class="text-sm text-gray-500 line-through ml-2">$${product.originalPrice}</span>` : ''}
                    </div>
                    <div class="flex space-x-1">
                        ${colors}
                    </div>
                </div>
            </div>
            
            <button class="btn-primary text-white w-full py-3 rounded-full font-semibold add-to-cart" data-product-id="${product.id}">
                Add to Cart
            </button>
        </div>
    `;
}

function getColorValue(colorName) {
    const colorMap = {
        'oat': '#F5F2ED',
        'mist-grey': '#E8E6E1',
        'charcoal': '#2C2C2C',
        'forest': '#1B4332'
    };
    return colorMap[colorName] || '#CCCCCC';
}

function updateResultCount(count) {
    const resultCount = document.getElementById('resultCount');
    if (resultCount) {
        resultCount.textContent = `Showing ${count} product${count !== 1 ? 's' : ''}`;
    }
}

// Filter functionality
function initializeFilters() {
    // Size filter checkboxes
    document.querySelectorAll('input[data-filter="size"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const size = parseInt(this.value);
            if (this.checked) {
                AppState.currentFilters.sizes.push(size);
            } else {
                AppState.currentFilters.sizes = AppState.currentFilters.sizes.filter(s => s !== size);
            }
            applyFilters();
        });
    });
    
    // Color filter checkboxes
    document.querySelectorAll('input[data-filter="color"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const color = this.value;
            if (this.checked) {
                AppState.currentFilters.colors.push(color);
            } else {
                AppState.currentFilters.colors = AppState.currentFilters.colors.filter(c => c !== color);
            }
            applyFilters();
        });
    });
    
    // Brand filter checkboxes
    document.querySelectorAll('input[data-filter="brand"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const brand = this.value;
            if (this.checked) {
                AppState.currentFilters.brands.push(brand);
            } else {
                AppState.currentFilters.brands = AppState.currentFilters.brands.filter(b => b !== brand);
            }
            applyFilters();
        });
    });
    
    // Clear filters button
    const clearFilters = document.getElementById('clearFilters');
    if (clearFilters) {
        clearFilters.addEventListener('click', function() {
            // Reset all checkboxes
            document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
                checkbox.checked = false;
            });
            
            // Reset filters
            AppState.currentFilters = {
                sizes: [],
                colors: [],
                brands: [],
                maxPrice: 280
            };
            
            // Reset price range
            const priceRange = document.getElementById('priceRange');
            if (priceRange) {
                priceRange.value = 280;
                document.getElementById('priceValue').textContent = '$280';
            }
            
            applyFilters();
        });
    }
}

function applyFilters() {
    let filtered = [...AppState.products];
    
    // Size filter
    if (AppState.currentFilters.sizes.length > 0) {
        filtered = filtered.filter(product => 
            product.sizes.some(size => AppState.currentFilters.sizes.includes(size))
        );
    }
    
    // Color filter
    if (AppState.currentFilters.colors.length > 0) {
        filtered = filtered.filter(product => 
            product.colors.some(color => AppState.currentFilters.colors.includes(color))
        );
    }
    
    // Brand filter
    if (AppState.currentFilters.brands.length > 0) {
        filtered = filtered.filter(product => 
            AppState.currentFilters.brands.includes(product.brand)
        );
    }
    
    // Price filter
    filtered = filtered.filter(product => product.price <= AppState.currentFilters.maxPrice);
    
    AppState.filteredProducts = filtered;
    
    // Apply sorting
    applySorting();
    
    // Render filtered products
    renderProducts(AppState.filteredProducts);
}

function initializeSorting() {
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            AppState.currentSort = this.value;
            applySorting();
            renderProducts(AppState.filteredProducts);
        });
    }
}

function applySorting() {
    switch (AppState.currentSort) {
        case 'price-low':
            AppState.filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            AppState.filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            AppState.filteredProducts.sort((a, b) => b.isNew - a.isNew);
            break;
        case 'rating':
            AppState.filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'featured':
        default:
            AppState.filteredProducts.sort((a, b) => b.isFeatured - a.isFeatured);
            break;
    }
}

function initializePriceRange() {
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    
    if (priceRange && priceValue) {
        priceRange.addEventListener('input', function() {
            const value = parseInt(this.value);
            priceValue.textContent = `$${value}`;
            AppState.currentFilters.maxPrice = value;
            applyFilters();
        });
    }
}

// Product modal functionality
function initializeModal() {
    const modal = document.getElementById('productModal');
    const closeBtn = modal?.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeProductModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeProductModal();
            }
        });
    }
}

function openProductModal(productId) {
    const product = AppState.products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    if (!modal) return;
    
    // Populate modal content
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalPrice').textContent = `$${product.price}`;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalImage').src = product.image;
    document.getElementById('modalImage').alt = product.name;
    
    // Populate sizes
    const sizesContainer = document.getElementById('modalSizes');
    sizesContainer.innerHTML = product.sizes.map(size => `
        <button class="border border-gray-300 rounded-lg py-2 px-3 text-sm hover:border-gray-400 transition-colors" 
                onclick="selectSize(${size})">${size}</button>
    `).join('');
    
    // Populate colors
    const colorsContainer = document.getElementById('modalColors');
    colorsContainer.innerHTML = product.colors.map(color => `
        <button class="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-gray-500 transition-colors" 
                style="background-color: ${getColorValue(color)}" 
                onclick="selectColor('${color}')" 
                title="${color}"></button>
    `).join('');
    
    // Set up add to cart button
    const addToCartBtn = document.getElementById('addToCartModal');
    addToCartBtn.onclick = () => {
        addToCart(productId);
        closeProductModal();
    };
    
    modal.style.display = 'block';
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function selectSize(size) {
    // Remove previous selection
    document.querySelectorAll('#modalSizes button').forEach(btn => {
        btn.classList.remove('border-blue-500', 'bg-blue-50');
        btn.classList.add('border-gray-300');
    });
    
    // Add selection to clicked button
    event.target.classList.remove('border-gray-300');
    event.target.classList.add('border-blue-500', 'bg-blue-50');
}

function selectColor(color) {
    // Remove previous selection
    document.querySelectorAll('#modalColors button').forEach(btn => {
        btn.classList.remove('border-blue-500');
        btn.classList.add('border-gray-300');
    });
    
    // Add selection to clicked button
    event.target.classList.remove('border-gray-300');
    event.target.classList.add('border-blue-500');
}

// Cart functionality
function addToCart(productId, quantity = 1) {
    const product = AppState.products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = AppState.cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        AppState.cart.push({
            ...product,
            quantity: quantity,
            selectedColor: product.colors[0],
            selectedSize: product.sizes[0]
        });
    }
    
    saveCart();
    updateCartCount();
    showCartNotification();
}

function removeFromCart(productId) {
    AppState.cart = AppState.cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    
    if (getCurrentPage() === 'cart') {
        renderCartItems();
        updateCartSummary();
    }
}

function updateCartQuantity(productId, quantity) {
    const item = AppState.cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            saveCart();
            updateCartCount();
            
            if (getCurrentPage() === 'cart') {
                updateCartSummary();
            }
        }
    }
}

function saveCart() {
    localStorage.setItem('wooltech-cart', JSON.stringify(AppState.cart));
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function showCartNotification() {
    // Create and show a temporary notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    notification.textContent = 'Added to cart!';
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(full)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Cart page functionality
function initializeCartPage() {
    renderCartItems();
    updateCartSummary();
    initializeCheckout();
}

function renderCartItems() {
    const container = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartWithItems = document.getElementById('cartWithItems');
    
    if (!container) return;
    
    if (AppState.cart.length === 0) {
        if (emptyCart) emptyCart.classList.remove('hidden');
        if (cartWithItems) cartWithItems.classList.add('hidden');
        return;
    }
    
    if (emptyCart) emptyCart.classList.add('hidden');
    if (cartWithItems) cartWithItems.classList.remove('hidden');
    
    const itemCount = document.getElementById('itemCount');
    if (itemCount) {
        const totalItems = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
        itemCount.textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`;
    }
    
    container.innerHTML = AppState.cart.map(item => `
        <div class="cart-item p-6 rounded-xl">
            <div class="flex items-center space-x-4">
                <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-lg">
                <div class="flex-1">
                    <h3 class="font-semibold text-gray-900 mb-1">${item.name}</h3>
                    <p class="text-sm text-gray-600 mb-2">${item.brand.charAt(0).toUpperCase() + item.brand.slice(1)}</p>
                    <div class="flex items-center space-x-4">
                        <div class="flex items-center border border-gray-300 rounded-lg">
                            <button class="quantity-btn rounded-l-lg" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <input type="number" value="${item.quantity}" class="quantity-input" readonly>
                            <button class="quantity-btn rounded-r-lg" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                        <div class="text-right">
                            <div class="font-semibold text-gray-900">$${(item.price * item.quantity).toFixed(2)}</div>
                            <div class="text-sm text-gray-500">$${item.price} each</div>
                        </div>
                    </div>
                </div>
                <button class="text-red-500 hover:text-red-700 p-2" onclick="removeFromCart(${item.id})">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');
}

function updateCartSummary() {
    const subtotal = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 9.99;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;
    
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    const checkoutTotalEl = document.getElementById('checkoutTotal');
    
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
    if (checkoutTotalEl) checkoutTotalEl.textContent = `$${total.toFixed(2)}`;
}

function initializeCheckout() {
    const checkoutBtn = document.getElementById('checkoutBtn');
    const checkoutModal = document.getElementById('checkoutModal');
    const closeCheckout = document.getElementById('closeCheckout');
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    const continueShoppingBtn = document.getElementById('continueShopping');
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (AppState.cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            openCheckoutModal();
        });
    }
    
    if (closeCheckout) {
        closeCheckout.addEventListener('click', closeCheckoutModal);
    }
    
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', placeOrder);
    }
    
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', function() {
            window.location.href = 'products.html';
        });
    }
    
    // Promo code functionality
    const applyPromoBtn = document.getElementById('applyPromo');
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', applyPromoCode);
    }
}

function openCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (modal) {
        updateCheckoutSummary();
        modal.classList.remove('hidden');
    }
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function updateCheckoutSummary() {
    const container = document.getElementById('checkoutSummary');
    if (!container) return;
    
    container.innerHTML = AppState.cart.map(item => `
        <div class="flex justify-between">
            <span>${item.name} × ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
}

function applyPromoCode() {
    const promoInput = document.getElementById('promoCode');
    const promoCode = promoInput.value.trim().toLowerCase();
    
    // Simple promo code logic
    const validCodes = {
        'wool10': 0.10,
        'save20': 0.20,
        'newbie': 0.15
    };
    
    if (validCodes[promoCode]) {
        alert(`Promo code applied! ${(validCodes[promoCode] * 100)}% off your order.`);
        // In a real app, you would apply the discount to the total
    } else if (promoCode) {
        alert('Invalid promo code. Please try again.');
    }
}

function placeOrder() {
    const form = document.getElementById('checkoutForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // Simulate order processing
    const orderNumber = 'WT' + Date.now().toString().slice(-6);
    
    // Clear cart
    AppState.cart = [];
    saveCart();
    updateCartCount();
    
    // Show success message
    closeCheckoutModal();
    const successMessage = document.getElementById('successMessage');
    const orderNumberEl = document.getElementById('orderNumber');
    
    if (successMessage && orderNumberEl) {
        orderNumberEl.textContent = orderNumber;
        successMessage.classList.remove('hidden');
    }
    
    // Hide cart items and show empty cart
    setTimeout(() => {
        if (getCurrentPage() === 'cart') {
            renderCartItems();
            updateCartSummary();
        }
    }, 1000);
}

// Utility functions for global access
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;
window.selectSize = selectSize;
window.selectColor = selectColor;