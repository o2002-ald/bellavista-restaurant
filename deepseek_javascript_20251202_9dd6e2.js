// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Menu Data
    const menuItems = [
        {
            id: 1,
            name: "Truffle Arancini",
            description: "Crispy risotto balls with black truffle and mozzarella",
            price: 14.99,
            category: "starters",
            tags: ["vegetarian"],
            image: "https://images.unsplash.com/photo-1563379091339-03246963d9d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 2,
            name: "Seared Scallops",
            description: "With cauliflower puree and pancetta",
            price: 18.99,
            category: "starters",
            tags: [],
            image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 3,
            name: "Filet Mignon",
            description: "8oz prime beef with red wine reduction",
            price: 38.99,
            category: "mains",
            tags: [],
            image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 4,
            name: "Lobster Linguine",
            description: "Fresh lobster with homemade pasta",
            price: 32.99,
            category: "mains",
            tags: ["spicy"],
            image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 5,
            name: "Wild Mushroom Risotto",
            description: "Carnaroli rice with porcini mushrooms",
            price: 24.99,
            category: "mains",
            tags: ["vegetarian", "gluten-free"],
            image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 6,
            name: "Tiramisu",
            description: "Classic Italian dessert with mascarpone",
            price: 9.99,
            category: "desserts",
            tags: ["vegetarian"],
            image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 7,
            name: "Chocolate Soufflé",
            description: "Warm chocolate dessert with vanilla ice cream",
            price: 11.99,
            category: "desserts",
            tags: ["vegetarian"],
            image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 8,
            name: "Craft Cocktails",
            description: "Seasonal cocktails by our expert mixologist",
            price: 14.99,
            category: "drinks",
            tags: [],
            image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        }
    ];

    // DOM Elements
    const menuGrid = document.querySelector('.menu-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const bookingForm = document.getElementById('bookingForm');
    const backToTop = document.querySelector('.back-to-top');
    const testimonialDots = document.querySelectorAll('.dot');
    const testimonials = document.querySelectorAll('.testimonial');

    // Initialize Menu
    function initializeMenu() {
        renderMenuItems(menuItems);
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                filterMenuItems(filter);
            });
        });
    }

    // Render Menu Items
    function renderMenuItems(items) {
        menuGrid.innerHTML = '';
        
        items.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.setAttribute('data-category', item.category);
            
            let tagsHTML = '';
            if (item.tags.length > 0) {
                tagsHTML = item.tags.map(tag => 
                    `<span class="tag ${tag.replace(' ', '-')}">${tag.charAt(0).toUpperCase() + tag.slice(1)}</span>`
                ).join('');
            }
            
            menuItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="menu-item-image">
                <div class="menu-item-content">
                    <div class="menu-item-title">
                        <h3>${item.name}</h3>
                        <span class="menu-item-price">$${item.price.toFixed(2)}</span>
                    </div>
                    <div class="menu-item-tags">
                        ${tagsHTML}
                    </div>
                    <p>${item.description}</p>
                </div>
            `;
            
            menuGrid.appendChild(menuItem);
        });
    }

    // Filter Menu Items
    function filterMenuItems(filter) {
        const allItems = document.querySelectorAll('.menu-item');
        
        allItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }

    // Mobile Menu Toggle
    function setupMobileMenu() {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : 
                '<i class="fas fa-bars"></i>';
        });

        // Close menu when clicking on links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // Form Handling
    function setupForms() {
        if (bookingForm) {
            // Set minimum date to today
            const dateInput = document.getElementById('reservationDate');
            const today = new Date().toISOString().split('T')[0];
            dateInput.min = today;
            dateInput.value = today;

            // Set default time (next available hour)
            const timeInput = document.getElementById('reservationTime');
            const now = new Date();
            const nextHour = now.getHours() + 1;
            timeInput.value = `${nextHour.toString().padStart(2, '0')}:00`;

            bookingForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    // Show success message
                    showNotification('Reservation submitted successfully! We will confirm via email shortly.', 'success');
                    
                    // Reset form
                    this.reset();
                    
                    // Reset date and time
                    dateInput.value = today;
                    timeInput.value = `${nextHour.toString().padStart(2, '0')}:00`;
                    
                    // Restore button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            });
        }
    }

    // Notification System
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // Add notification styles
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: white;
                    padding: 15px 20px;
                    border-radius: 8px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    z-index: 10000;
                    animation: slideIn 0.3s ease;
                    max-width: 400px;
                }
                .notification.success {
                    border-left: 4px solid #2ECC71;
                }
                .notification.error {
                    border-left: 4px solid #E74C3C;
                }
                .notification i {
                    font-size: 1.2rem;
                }
                .notification.success i {
                    color: #2ECC71;
                }
                .notification.error i {
                    color: #E74C3C;
                }
                .notification-close {
                    background: none;
                    border: none;
                    color: #777;
                    cursor: pointer;
                    margin-left: auto;
                }
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Scroll Effects
    function setupScrollEffects() {
        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Back to top button
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
            
            // Active navigation link based on scroll position
            updateActiveNavLink();
        });

        // Back to top functionality
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Update Active Navigation Link
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Testimonial Slider
    function setupTestimonialSlider() {
        let currentTestimonial = 0;
        
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Update dots
                testimonialDots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
                
                // Update testimonials
                testimonials.forEach(t => t.classList.remove('active'));
                testimonials[index].classList.add('active');
                
                currentTestimonial = index;
            });
        });
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            
            testimonialDots.forEach(d => d.classList.remove('active'));
            testimonialDots[currentTestimonial].classList.add('active');
            
            testimonials.forEach(t => t.classList.remove('active'));
            testimonials[currentTestimonial].classList.add('active');
        }, 5000);
    }

    // Smooth Scrolling for Anchor Links
    function setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#') return;
                
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Initialize everything
    function init() {
        initializeMenu();
        setupMobileMenu();
        setupForms();
        setupScrollEffects();
        setupTestimonialSlider();
        setupSmoothScrolling();
        
        // Add some interactive effects
        addHoverEffects();
        
        console.log('Bella Vista Restaurant website initialized successfully!');
    }

    // Add hover effects to interactive elements
    function addHoverEffects() {
        // Add hover effect to menu items
        document.addEventListener('mouseover', function(e) {
            if (e.target.closest('.menu-item')) {
                const menuItem = e.target.closest('.menu-item');
                menuItem.style.transition = 'transform 0.3s, box-shadow 0.3s';
            }
        }, true);
    }

    // Initialize the application
    init();
});