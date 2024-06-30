// Function to fetch and display tattoos
async function displayTattoos() {
	try {
		const response = await fetch('/_tattoos/index.json');
		const tattoos = await response.json();
		const container = document.getElementById('gallery-container');

		if (container) {
			tattoos.forEach((tattoo, index) => {
				const tattooElement = document.createElement('div');
				tattooElement.className =
					'bg-white p-6 rounded shadow-md transform hover:scale-105 transition-all duration-300';
				tattooElement.innerHTML = `
                    <img src="${tattoo.image}" alt="${tattoo.title}" class="w-full h-48 object-cover mb-4 rounded">
                    <h3 class="text-xl font-bold mb-2 text-secondary">${tattoo.title}</h3>
                    <p class="text-gray-600">${tattoo.description}</p>
                `;
				container.appendChild(tattooElement);
			});
		}
	} catch (error) {
		console.error('Error loading tattoos:', error);
		const container = document.getElementById('gallery-container');
		if (container) {
			container.innerHTML =
				'<p class="text-center text-red-500">Sorry, gallery is not working! Please try again later.</p>';
		}
	}
}

// Hamburger menu toggle
const menuToggle = document.querySelector('.hamburger');
const menu = document.getElementById('menu');

function toggleMenu() {
	menuToggle.classList.toggle('open');
	menu.classList.toggle('open');
	document.body.classList.toggle('menu-open');
}

function closeMenu() {
	menuToggle.classList.remove('open');
	menu.classList.remove('open');
	document.body.classList.remove('menu-open');
}

if (menuToggle && menu) {
	menuToggle.addEventListener('click', e => {
		e.stopPropagation();
		toggleMenu();
	});

	// Close menu when clicking outside
	document.addEventListener('click', e => {
		if (menu.classList.contains('open') && !menu.contains(e.target) && e.target !== menuToggle) {
			closeMenu();
		}
	});

	// Prevent clicks inside the menu from closing it
	menu.addEventListener('click', e => {
		e.stopPropagation();
	});
}

// Close menu when a link is clicked
const menuLinks = menu.querySelectorAll('a');
menuLinks.forEach(link => {
	link.addEventListener('click', closeMenu);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();

		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
			window.scrollTo({
				top: target.offsetTop - 100,
				behavior: 'smooth',
			});
		}
	});
});

// Call displayTattoos function when the DOM is loaded
document.addEventListener('DOMContentLoaded', displayTattoos);

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

// Web3form email

const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function (e) {
	e.preventDefault();
	const formData = new FormData(form);
	const object = Object.fromEntries(formData);
	const json = JSON.stringify(object);
	result.innerHTML = 'Please wait...';

	fetch('https://api.web3forms.com/submit', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: json,
	})
		.then(async response => {
			let json = await response.json();
			if (response.status == 200) {
				result.innerHTML = 'Form submitted successfully';
			} else {
				console.log(response);
				result.innerHTML = json.message;
			}
		})
		.catch(error => {
			console.log(error);
			result.innerHTML = 'Something went wrong!';
		})
		.then(function () {
			form.reset();
			setTimeout(() => {
				result.style.display = 'none';
			}, 3000);
		});
});
