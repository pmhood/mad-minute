import type { ImageSet } from './image-set.enum';
import type { Operation } from './operation.enum';
import type { PageLayout } from './page-layout.enum';

export class PdfGeneratorConfig {
  constructor(
    public readonly operation: Operation,
    public readonly xMin: number,
    public readonly xMax: number,
    public readonly yMin: number,
    public readonly yMax: number,
    public readonly numOfEquations: number,
    public readonly numOfPages: number,
    public readonly pageLayout: PageLayout,
    public readonly imageSet: ImageSet
  ) {}
}
