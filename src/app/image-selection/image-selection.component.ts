import { Component, ViewChild, ElementRef, Inject, PLATFORM_ID  } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-image-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-selection.component.html',
  styleUrls: ['./image-selection.component.scss']
})
export class ImageSelectionComponent {
  @ViewChild('myCanvas', { static: true }) canvas: ElementRef<HTMLCanvasElement> | undefined;
  ctx: CanvasRenderingContext2D | null = null;
  objectSizeInImage: number = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.canvas) {
        const canvasEl = this.canvas.nativeElement;
        this.ctx = canvasEl.getContext('2d');

        const img = new Image();
        img.src = 'path/to/your/image.jpg';
        img.onload = () => {
          if (this.ctx) {
            this.ctx.drawImage(img, 0, 0, canvasEl.width, canvasEl.height);
          }
        };

        this.addSelectionListener();
      }
    }
  }

  addSelectionListener() {
    let startX = 0, endX = 0;

    if (this.canvas) {
      this.canvas.nativeElement.addEventListener('mousedown', (event: MouseEvent) => {
        startX = event.offsetX;
      });

      this.canvas.nativeElement.addEventListener('mouseup', (event: MouseEvent) => {
        endX = event.offsetX;
        this.objectSizeInImage = Math.abs(endX - startX);
        console.log(`Largura selecionada: ${this.objectSizeInImage} pixels`);
      });
    }
  }
}
