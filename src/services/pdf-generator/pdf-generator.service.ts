import type { PdfGeneratorConfig } from './pdf-generator-config';
import '../../lib/pdfkit.standalone.js';
import '../../lib/blob-stream.js';
import { PageLayout } from './page-layout.enum';
import { Operation } from './operation.enum';

export class PdfGenerator {
  private doc: PDFDocument;
  private stream: any;

  constructor(private config: PdfGeneratorConfig) {
    this.doc = new PDFDocument({ autoFirstPage: false });
    this.stream = this.doc.pipe(blobStream());
  }

  generate() {
    for (let i = 0; i < this.config.numOfPages; ++i) {
      this.createPage();
    }

    this.doc.end();
    this.stream.on('finish', () => {
      const blob = this.stream.toBlobURL('application/pdf');
      // console.log(blob);
      // window.location.href = blob;
      window.open(blob);
    });
  }

  private createPage() {
    switch (this.config.pageLayout) {
      case PageLayout.SideBySide:
        this.createSideBySidePage();
        break;
      case PageLayout.TopBottom:
        break;
    }
  }

  private createSideBySidePage() {
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

    this.createSideBySideSheet(origins[0]);
    this.createSideBySideSheet(origins[1]);
  }

  private createSideBySideSheet(origin: Origin) {
    const top = origin.y;
    const bottom = origin.y + origin.height;

    this.doc
      .rect(origin.x, origin.y, origin.width, origin.height)
      .lineWidth(16)
      .fillAndStroke('#eee', '#fff');

    this.doc
      .fontSize(14)
      .fill('black')
      .text('Name: ___________________', origin.x + 16, top + 24);

    const equations = this.generateEquations();
    console.log(equations);
    for (let index = 0; index < equations.length; ++index) {
      const position = {
        x: origin.x + 16,
        y: top + 64 + (index % 20) * 32
      };
      const text = `${equations[index]}`;
      this.doc.text(text, position.x, position.y);
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
