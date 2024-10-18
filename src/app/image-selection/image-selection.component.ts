import { Component, ViewChild, ElementRef, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-image-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-selection.component.html',
  styleUrls: ['./image-selection.component.scss']
})
export class ImageSelectionComponent implements OnInit {
  @ViewChild('myCanvas', { static: true }) canvas: ElementRef<HTMLCanvasElement> | null = null; // Inicializado como null
  ctx: CanvasRenderingContext2D | null = null; // Inicializado como null
  objectSizeInImage: number = 0; // Tamanho em pixels

  constructor(
    private imageService: ImageService,
    @Inject(PLATFORM_ID) private platformId: Object // Injeta platformId
  ) {}

  ngOnInit() {
    // Verifica se está no navegador
    if (isPlatformBrowser(this.platformId)) {
      const canvasEl = this.canvas?.nativeElement;
      if (canvasEl) {
        this.ctx = canvasEl.getContext('2d') as CanvasRenderingContext2D;
        const imgSrc = this.imageService.getImage();
        console.log(`Image Source: ${imgSrc}`); // Verifique a URL da imagem

        const img = new Image();
        img.src = imgSrc;

        img.onload = () => {
          console.log('Imagem carregada com sucesso.'); // Log para verificar se a imagem foi carregada
          // Limpa o canvas antes de desenhar a nova imagem
          this.ctx?.clearRect(0, 0, canvasEl.width, canvasEl.height);
          this.ctx?.drawImage(img, 0, 0, canvasEl.width, canvasEl.height);
        };

        img.onerror = (error) => {
          console.error('Erro ao carregar a imagem:', error); // Log para capturar erros
        };
      }
      this.addSelectionListener(); // Adiciona listeners após garantir que está no navegador
    }
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
}
