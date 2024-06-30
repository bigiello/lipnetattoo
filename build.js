const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const tattoosDirectory = path.join(process.cwd(), '_tattoos');
const outputDir = path.join(process.cwd(), '_tattoos');
const outputFile = path.join(outputDir, 'index.json');

function getTattoos() {
	try {
		const fileNames = fs.readdirSync(tattoosDirectory);
		const tattoos = fileNames.map(fileName => {
			const fullPath = path.join(tattoosDirectory, fileName);
			const fileContents = fs.readFileSync(fullPath, 'utf8');
			const { data } = matter(fileContents);
			return {
				title: data.title,
				image: data.image.startsWith('/') ? data.image : `/${data.image}`,
				description: data.description,
			};
		});
		return tattoos;
	} catch (error) {
		console.error('Error reading tattoo files:', error);
		return [];
	}
}

try {
	// Ensure the output directory exists
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	const tattoos = getTattoos();
	fs.writeFileSync(outputFile, JSON.stringify(tattoos, null, 2));
	console.log('Tattoos JSON file generated successfully!');
} catch (error) {
	console.error('Error generating tattoos JSON file:', error);
}

console.log('Current working directory:', process.cwd());
console.log('Tattoos directory:', tattoosDirectory);
console.log('Output directory:', outputDir);
console.log('Output file:', outputFile);
console.log('Tattoo files found:', fs.readdirSync(tattoosDirectory));
