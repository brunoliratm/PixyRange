import { Component, ViewChild, ElementRef, Output, EventEmitter, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ImageService } from '../image.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-image-selection',
    imports: [CommonModule],
    templateUrl: './image-selection.component.html',
    styleUrls: ['./image-selection.component.scss']
})



export class ImageSelectionComponent implements OnInit {
  @ViewChild('myCanvas', { static: true }) canvas: ElementRef<HTMLCanvasElement> | null = null;
  @Output() objectSizeInImageChange = new EventEmitter<number>();
  ctx: CanvasRenderingContext2D | null = null;
  objectSizeInImage: number = 0;
  imageSubscription: Subscription | null = null;

  // Para suporte ao toque
  startX: number = 0;
  endX: number = 0;

  constructor(
    private imageService: ImageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const canvasEl = this.canvas?.nativeElement;
      if (canvasEl) {
        this.ctx = canvasEl.getContext('2d') as CanvasRenderingContext2D;

        // Observa mudanças de imagem
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
    const canvasEl = this.canvas?.nativeElement;

    // Eventos de mouse
    canvasEl?.addEventListener('mousedown', (event: MouseEvent) => {
      this.startX = event.offsetX;
    });

    canvasEl?.addEventListener('mouseup', (event: MouseEvent) => {
      this.endX = event.offsetX;
      this.objectSizeInImage = Math.abs(this.endX - this.startX);
      this.objectSizeInImageChange.emit(this.objectSizeInImage);

    });

    // Eventos de toque (para dispositivos móveis)
    canvasEl?.addEventListener('touchstart', (event: TouchEvent) => {
      const touch = event.touches[0];
      const rect = canvasEl.getBoundingClientRect();
      this.startX = touch.clientX - rect.left;
    });

    canvasEl?.addEventListener('touchend', (event: TouchEvent) => {
      const touch = event.changedTouches[0];
      const rect = canvasEl.getBoundingClientRect();
      this.endX = touch.clientX - rect.left;
      this.objectSizeInImage = Math.abs(this.endX - this.startX);
      this.objectSizeInImageChange.emit(this.objectSizeInImage);
    });
  }



  ngOnDestroy() {
    if (this.imageSubscription) {
      this.imageSubscription.unsubscribe();
    }
  }
}
