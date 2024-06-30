function createDecorativeSVG() {
	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.setAttribute('width', '100');
	svg.setAttribute('height', '100');
	svg.setAttribute('viewBox', '0 0 100 100');
	svg.style.position = 'absolute';
	svg.style.opacity = '0.1';
	svg.style.zIndex = '-1';

	const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	path.setAttribute('d', 'M10 10 H 90 V 90 H 10 L 10 10');
	path.setAttribute('fill', 'none');
	path.setAttribute('stroke', '#000');
	path.setAttribute('stroke-width', '2');

	svg.appendChild(path);
	return svg;
}

function addDecorativeSVGs() {
	const sections = document.querySelectorAll('section');
	sections.forEach(section => {
		const svg = createDecorativeSVG();
		svg.style.top = Math.random() * 100 + '%';
		svg.style.left = Math.random() * 100 + '%';
		section.appendChild(svg);
	});
}

document.addEventListener('DOMContentLoaded', addDecorativeSVGs);
