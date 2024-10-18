import { Component, ViewChild, ElementRef, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ImageService } from '../image.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-image-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-selection.component.html',
  styleUrls: ['./image-selection.component.scss'],
})
export class ImageSelectionComponent implements OnInit {
  @ViewChild('myCanvas', { static: true }) canvas: ElementRef<HTMLCanvasElement> | null = null;
  ctx: CanvasRenderingContext2D | null = null;
  objectSizeInImage: number = 0;
  imageSubscription: Subscription | null = null;

  constructor(
    private imageService: ImageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const canvasEl = this.canvas?.nativeElement;
      if (canvasEl) {
        this.ctx = canvasEl.getContext('2d') as CanvasRenderingContext2D;

        // Escuta as mudanças na imagem do serviço
        this.imageSubscription = this.imageService.imageSrc$.subscribe((imgSrc) => {
          if (imgSrc) {
            this.loadImage(imgSrc);
          }
        });

        this.addSelectionListener();
      }
    }
  }

  loadImage(imgSrc: string) {
    const img = new Image();
    img.src = imgSrc;

    img.onload = () => {
      console.log('Imagem carregada com sucesso.');
      const canvasEl = this.canvas?.nativeElement;
      if (this.ctx && canvasEl) {
        this.ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        this.ctx.drawImage(img, 0, 0, canvasEl.width, canvasEl.height);
      }
    };

    img.onerror = (error) => {
      console.error('Erro ao carregar a imagem:', error);
    };
  }

  addSelectionListener() {
    let startX = 0, endX = 0;
    this.canvas?.nativeElement.addEventListener('mousedown', (event: MouseEvent) => {
      startX = event.offsetX;
    });

    this.canvas?.nativeElement.addEventListener('mouseup', (event: MouseEvent) => {
      endX = event.offsetX;
      this.objectSizeInImage = Math.abs(endX - startX);
      console.log(`Largura selecionada: ${this.objectSizeInImage} pixels`);
    });
  }

  ngOnDestroy() {
    if (this.imageSubscription) {
      this.imageSubscription.unsubscribe(); // Evita vazamentos de memória
    }
  }
}
