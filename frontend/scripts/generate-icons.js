const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Configuration
const outputDir = path.join(__dirname, '../public/icons');
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const backgroundColor = '#6A0DAD';
const textColor = '#FFFFFF';

// Créer le répertoire de sortie s'il n'existe pas
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Fonction pour générer une icône
function generateIcon(size) {
  const canvas = createCanvas(size, size);
  const context = canvas.getContext('2d');
  
  // Fond
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, size, size);
  
  // Texte (première lettre du nom)
  const text = 'G';
  const fontSize = Math.floor(size * 0.6);
  context.fillStyle = textColor;
  context.font = `bold ${fontSize}px Arial`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, size / 2, size / 2);
  
  // Enregistrer l'image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(outputDir, `icon-${size}x${size}.png`), buffer);
}

// Générer toutes les tailles d'icônes
sizes.forEach(size => {
  generateIcon(size);
  console.log(`Icône générée : ${size}x${size}px`);
});

console.log('Toutes les icônes ont été générées avec succès !');
