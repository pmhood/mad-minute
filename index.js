const fs = require('fs');
const PDFDocument = require('pdfkit');

const config = {
  totalPages: 4,
  orientation: 'vertical', // horizontal | vertical
  columns: [32, 192, 352],

  numberOfEquations: 20,

  pages: [
    // {
    //     top: {
    //         operation: 'subtraction',
    //         maxSum: 20,
    //         minSum: 0
    //     },
    //     bottom: {
    //         operation: 'subtraction',
    //         maxSum: 20,
    //         minSum: 0
    //     }
    // },
    {
      top: {
        operation: 'multiplication',
        factor: 2,
        minMultiplier: 0,
        maxMultiplier: 12
      },
      bottom: {
        operation: 'multiplication',
        factor: 2,
        minMultiplier: 0,
        maxMultiplier: 12
      }
    }
  ]
};

// Create a document
const doc = new PDFDocument({ autoFirstPage: false });

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream('output.pdf'));

console.log(`Total pages: ${config.totalPages}`);
for (let index = 0; index < config.totalPages; index++) {
  console.log(`Creating page ${index + 1}`);
  for (const page of config.pages) {
    createPage(page);
  }
}

// Finalize PDF file
doc.end();

function createPage(pageConfig) {
  doc.addPage();

  const center = {
    x: Math.round(doc.page.width / 2),
    y: Math.round(doc.page.height / 2) - 16
  };

  createSheet({ x: 0, y: 0, width: doc.page.width, height: center.y }, pageConfig.top);
  createSheet({ x: 0, y: center.y, width: doc.page.width, height: center.y }, pageConfig.bottom);
}

function createSheet(origin, sheetConfig) {
  // console.log(origin);

  const top = origin.y;
  const bottom = origin.y + origin.height;

  doc.rect(origin.x, origin.y, origin.width, origin.height).lineWidth(16).fillAndStroke('#eee', '#fff');

  doc
    .fontSize(18)
    .fill('black')
    .text('Name: _______________________________', 32, top + 16);

  const pokemonImage = randomPokemonImage();
  doc.image(`assets/pokemon/${pokemonImage}`, origin.width - 100 - 32, top + 16, { width: 100 });
  // doc.image(`/Users/pete/Desktop/Summerlake.png`, origin.width - 100 - 32, top + 16, { width: 100 });

  doc.fontSize(12).fill('black');

  let equations = [];
  switch (sheetConfig.operation) {
    case 'subtraction':
      equations = generateSubtractionFacts(sheetConfig);
      break;

    case 'addition':
      equations = generateAdditionFacts(sheetConfig);
      break;

    case 'multiplication':
      equations = generateMultiplicationFacts(sheetConfig);
      break;
  }

  for (let index = 0; index < equations.length; ++index) {
    const position = {
      x: config.columns[Math.floor(index / 10)],
      y: top + 64 + (index % 10) * 28
    };
    const text = `${equations[index]}`;
    doc.text(text, position.x, position.y);
  }
}

function generateAdditionFacts(sheetConfig) {
  const equations = [];
  for (let index = 0; index < config.numberOfEquations; ++index) {
    const sum = between(sheetConfig.minSum, sheetConfig.maxSum);
    const x = between(0, sum);
    const y = sum - x;

    equations.push(`${x} + ${y} =`);
  }
  return equations;
}

function generateSubtractionFacts(sheetConfig) {
  const equations = [];
  for (let index = 0; index < config.numberOfEquations; ++index) {
    const sum = between(sheetConfig.minSum, sheetConfig.maxSum);
    const x = between(0, sum);

    equations.push(`${sum} - ${x} =`);
  }
  return equations;
}

function generateMultiplicationFacts(sheetConfig) {
  const equations = [];
  for (let index = 0; index < config.numberOfEquations; ++index) {
    const x = sheetConfig.factor ?? between(sheetConfig.minMultiplier, sheetConfig.maxMultiplier);
    const y = between(sheetConfig.minMultiplier, sheetConfig.maxMultiplier);

    if (between(0, 1) === 0) {
      equations.push(`${x} x ${y} =`);
    } else {
      equations.push(`${y} x ${x} =`);
    }
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
