// Function to fetch and display tattoos
async function displayTattoos() {
	// ... (keep the existing function as is)
}

// Sticky navbar functionality
let lastScrollTop = 0;
const navbar = document.querySelector('header');
const menu = document.getElementById('menu');
const scrollThreshold = 50;

function hideNavbarAndMenu() {
	navbar.classList.add('navbar-hidden');
	if (menu && window.innerWidth < 768) {
		// Check if it's mobile view
		menu.classList.add('hidden');
		document.body.classList.remove('menu-open');
	}
}

function showNavbar() {
	navbar.classList.remove('navbar-hidden');
}

window.addEventListener('scroll', () => {
	let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

	if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
		// Scrolling down
		hideNavbarAndMenu();
	} else {
		// Scrolling up
		showNavbar();
	}

	lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Improved mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');

if (menuToggle && menu) {
	menuToggle.addEventListener('click', e => {
		e.stopPropagation(); // Prevent this click from being caught by the document click listener
		menu.classList.toggle('hidden');
		document.body.classList.toggle('menu-open');
	});

	// Close menu when clicking outside
	document.addEventListener('click', e => {
		if (!menu.contains(e.target) && !menuToggle.contains(e.target) && !menu.classList.contains('hidden')) {
			menu.classList.add('hidden');
			document.body.classList.remove('menu-open');
		}
	});
}

// Booking form submission
const form = document.querySelector('form');
if (form) {
	form.addEventListener('submit', e => {
		e.preventDefault();
		alert('Booking submitted! We will contact you soon to confirm your appointment.');
	});
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();

		const targetId = this.getAttribute('href').substring(1);
		const targetElement = document.getElementById(targetId);

		if (targetElement) {
			targetElement.scrollIntoView({
				behavior: 'smooth',
			});

			// Close the mobile menu after clicking a link
			if (menu && window.innerWidth < 768) {
				menu.classList.add('hidden');
				document.body.classList.remove('menu-open');
			}
		}
	});
});

// Add to cart functionality (only for "Add to Cart" buttons)
const addToCartButtons = document.querySelectorAll('button:not([type="submit"])');
addToCartButtons.forEach(button => {
	button.addEventListener('click', e => {
		if (e.target.textContent.trim().toLowerCase() === 'add to cart') {
			alert('Item added to cart!');
		}
	});
});

// Scroll animation
const scrollAnimElements = document.querySelectorAll('.scroll-anim');

const scrollAnimObserver = new IntersectionObserver(
	entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('scroll-anim-visible');
				scrollAnimObserver.unobserve(entry.target);
			}
		});
	},
	{ threshold: 0.1 }
);

scrollAnimElements.forEach(el => scrollAnimObserver.observe(el));

// Check if user is logged into CMS
if (window.netlifyIdentity) {
	window.netlifyIdentity.on('init', user => {
		if (!user) {
			window.netlifyIdentity.on('login', () => {
				document.location.href = '/admin/';
			});
		}
	});
}

// Call displayTattoos function when the DOM is loaded
document.addEventListener('DOMContentLoaded', displayTattoos);
