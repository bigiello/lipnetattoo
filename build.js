const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const tattoosDirectory = path.join(process.cwd(), '_tattoos');
const outputDir = path.join(process.cwd(), 'public', '_tattoos');
const outputFile = path.join(outputDir, 'index.json');

function getTattoos() {
	const fileNames = fs.readdirSync(tattoosDirectory);
	const tattoos = fileNames.map(fileName => {
		const fullPath = path.join(tattoosDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, 'utf8');
		const { data } = matter(fileContents);
		return {
			title: data.title,
			image: data.image,
			description: data.description,
		};
	});
	return tattoos;
}

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true });
}

const tattoos = getTattoos();
fs.writeFileSync(outputFile, JSON.stringify(tattoos));
console.log('Tattoos JSON file generated successfully!');
