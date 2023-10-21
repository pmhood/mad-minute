import type { PdfGeneratorConfig } from './pdf-generator-config';
import { PageLayout } from './page-layout.enum';
import { Operation } from './operation.enum';
import { ImageSet } from './image-set.enum';

export class PdfGenerator {
  private doc: any;
  private stream: any;

  constructor(private config: PdfGeneratorConfig) {
    const pdfDocument = window[<any>'PDFDocument'] as any;
    const blobStream = window[<any>'blobStream'] as any;
    this.doc = new pdfDocument({ autoFirstPage: false });
    this.stream = this.doc.pipe(blobStream());
  }

  async generate() {
    for (let i = 0; i < this.config.numOfPages; ++i) {
      await this.createPage();
    }

    this.doc.end();
    this.stream.on('finish', () => {
      const blob = this.stream.toBlobURL('application/pdf');
      // console.log(blob);
      // window.location.href = blob;
      window.open(blob);
    });
  }

  private async createPage() {
    switch (this.config.pageLayout) {
      case PageLayout.SideBySide:
        await this.createSideBySidePage();
        break;
      case PageLayout.TopBottom:
        break;
    }
  }

  private async createSideBySidePage() {
    this.doc.addPage();

    const origins: Origin[] = [
      { x: 8, y: 0, width: this.doc.page.width / 2, height: this.doc.page.height },
      {
        x: this.doc.page.width / 2,
        y: 0,
        width: this.doc.page.width / 2,
        height: this.doc.page.height
      }
    ];

    await this.createSideBySideSheet(origins[0]);
    await this.createSideBySideSheet(origins[1]);
  }

  private async createSideBySideSheet(origin: Origin) {
    const top = origin.y;
    // const bottom = origin.y + origin.height;

    this.doc
      .rect(origin.x, origin.y, origin.width, origin.height)
      .lineWidth(16)
      .fillAndStroke('#eee', '#fff');

    this.doc
      .fontSize(14)
      .fill('black')
      .text('Name: ___________________', origin.x + 16, top + 24);

    if (this.config.imageSet === ImageSet.Pokemon) {
      const pokemonImage = randomPokemonImage();
      const res = await fetch(`/images/pokemon/${pokemonImage}`);
      const blob = await res.blob();
      const base64String = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
      this.doc.image(base64String, origin.width + origin.x - 50 - 32, top + 16, {
        width: 50
      });
    }

    const equations = this.generateEquations();
    for (let index = 0; index < equations.length; ++index) {
      const x = origin.x + 16;
      const y = top + 72 + (index % 20) * 33;

      this.doc.text(`${index + 1}.`, x, y);
      this.doc.text(equations[index], x + 64, y);
    }
  }

  private generateEquations(): string[] {
    let symbol = '';
    const equations = [];
    switch (this.config.operation) {
      case Operation.Subtraction:
        symbol = '-';
        break;

      case Operation.Addition:
        symbol = '+';
        break;

      case Operation.Multiplication:
        symbol = 'x';
        break;
    }

    for (let index = 0; index < this.config.numOfEquations; ++index) {
      const x = between(this.config.xMin, this.config.xMax);
      const y = between(this.config.yMin, this.config.yMax);

      if (between(0, 1) === 0) {
        equations.push(`${x} ${symbol} ${y} =`);
      } else {
        equations.push(`${y} ${symbol} ${x} =`);
      }
    }

    return equations;
  }
}

interface Origin {
  x: number;
  y: number;
  width: number;
  height: number;
}

function between(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomPokemonImage() {
  const num = between(1, 150).toString().padStart(3, '0');
  return `${num}.png`;
}
