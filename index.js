const fs = require('fs');
const PDFDocument = require('pdfkit');

const config = {
    orientation: 'horizontal', // horizontal | vertical    
    columns: [32, 192, 352],

    numberOfEquations: 30,
    
    addition: {
        maxSum: 20,
        minSum: 5
    }

};


// Create a document
const doc = new PDFDocument;

const center = {
    x: Math.round(doc.page.width / 2), 
    y: Math.round(doc.page.height / 2) - 16
};


// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream('output.pdf'));

createSheet({x: 0, y: 0, width: doc.page.width, height: center.y});
createSheet({x: 0, y: center.y, width: doc.page.width, height: center.y});

// Finalize PDF file
doc.end();

function createSheet(origin) {
    console.log(origin);
    const top = origin.y;
    const bottom = origin.y + origin.height;

    doc.rect(origin.x, origin.y, origin.width, origin.height)
        .lineWidth(16)
        .fillAndStroke("#eee", "#fff");

    doc.fontSize(18)
        .fill('black')
        .text("Name: _______________________________", 32, top + 16);  

    const pokemonImage = randomPokemonImage();
    doc.image(`assets/pokemon/${pokemonImage}`, origin.width - 100 - 32, top + 16, { width: 100 });

    doc.fontSize(12)
    .fill('black');
    const equations = generateAdditionFacts();
    for(let index = 0; index < equations.length; ++index) {
        const position = {
            x: config.columns[Math.floor(index / 10)],
            y: top + 64 + index % 10 * 28
        }
        const text = `${equations[index]}`;
        doc.text(text, position.x, position.y);
    }
}

function generateAdditionFacts() {
    const equations = [];
    for(let index = 0; index < config.numberOfEquations; ++index) {
        const sum = between(config.addition.minSum, config.addition.maxSum);
        const x = between(0, sum);
        const y = sum - x;
        
        equations.push(`${x} + ${y} =`);
    }
    return equations;
}

function between(min, max) {  
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomPokemonImage() {
    const num = between(1, 150).toString().padStart(3, '0');
    return `${num}.png`;
}
