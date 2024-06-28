// Funkcja do pobrania i wyświetlenia tatuaży
async function displayTattoos() {
	try {
		const response = await fetch('/_tattoos/index.json');
		const tattoos = await response.json();
		const container = document.getElementById('gallery-container');

		if (container) {
			tattoos.forEach(tattoo => {
				const tattooElement = document.createElement('div');
				tattooElement.className = 'bg-white p-6 rounded shadow-md';
				tattooElement.innerHTML = `
                    <img src="${tattoo.image}" alt="${tattoo.title}" class="w-full h-48 object-cover mb-4 rounded">
                    <h3 class="text-xl font-bold mb-2 text-secondary">${tattoo.title}</h3>
                    <p class="text-gray-600">${tattoo.description}</p>
                `;
				container.appendChild(tattooElement);
			});
		}
	} catch (error) {
		console.error('Błąd podczas ładowania tatuaży:', error);
		const container = document.getElementById('gallery-container');
		if (container) {
			container.innerHTML =
				'<p class="text-center text-red-500">Sorry, gallery is not working! Please try again later. </p>';
		}
	}
}

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

if (menuToggle && menu) {
	menuToggle.addEventListener('click', () => {
		menu.classList.toggle('hidden');
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

		document.querySelector(this.getAttribute('href')).scrollIntoView({
			behavior: 'smooth',
		});
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

// Sprawdź, czy użytkownik jest zalogowany do CMS
if (window.netlifyIdentity) {
	window.netlifyIdentity.on('init', user => {
		if (!user) {
			window.netlifyIdentity.on('login', () => {
				document.location.href = '/admin/';
			});
		}
	});
}

// Wywołaj funkcję displayTattoos po załadowaniu strony, ale tylko jeśli jesteśmy na stronie flashes
document.addEventListener('DOMContentLoaded', () => {
	if (document.getElementById('gallery-container')) {
		displayTattoos();
	}
});
