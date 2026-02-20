import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  Inject,
  PLATFORM_ID,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ExifReaderComponent } from './exif-reader/exif-reader.component';
import { ImageService } from './image.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ExifReaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  realSize = signal<number>(0);
  objectSizeInImage = signal<number>(0);
  focalLength = signal<number>(0);
  imageWidth = signal<number>(1);

  distancia = computed(() => {
    const r_cm = this.realSize();
    const i_px = this.objectSizeInImage();
    const f_mm = this.focalLength();
    const imgWidth_px = this.imageWidth();
    const sensorWidth_mm = 6.4;

    if (r_cm > 0 && i_px > 0 && f_mm > 0 && imgWidth_px > 0) {
      const pixelPitch_mm = sensorWidth_mm / imgWidth_px;
      const objectSizeOnSensor_mm = i_px * pixelPitch_mm;
      const distance_mm = (r_cm * 10 * f_mm) / objectSizeOnSensor_mm;
      return distance_mm / 1000;
    }
    return null;
  });

  onFocalLengthChange(newFocalLength: number) {
    this.focalLength.set(newFocalLength);
  }

  @ViewChild('myCanvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement> | null = null;
  ctx: CanvasRenderingContext2D | null = null;
  imageSubscription: Subscription | null = null;

  startX: number = 0;
  endX: number = 0;
  imageScaleX: number = 1;

  constructor(
    private imageService: ImageService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const canvasEl = this.canvas?.nativeElement;
      if (canvasEl) {
        this.ctx = canvasEl.getContext('2d') as CanvasRenderingContext2D;

        this.imageSubscription = this.imageService.imageSrc$.subscribe(
          (imgSrc) => {
            if (imgSrc) {
              this.loadImage(imgSrc);
            }
          },
        );
      }
    }
  }

  loadImage(imgSrc: string) {
    const img = new Image();
    img.src = imgSrc;

    img.onload = () => {
      this.imageWidth.set(img.width);

      const canvasEl = this.canvas?.nativeElement;
      if (this.ctx && canvasEl) {
        const availableWidth =
          canvasEl.parentElement?.clientWidth ||
          canvasEl.clientWidth ||
          img.width;
        const renderWidth = Math.max(
          1,
          Math.min(img.width, Math.floor(availableWidth)),
        );
        const aspectRatio = img.height / img.width;
        const renderHeight = Math.max(1, Math.floor(renderWidth * aspectRatio));

        canvasEl.width = renderWidth;
        canvasEl.height = renderHeight;
        this.imageScaleX = img.width / renderWidth;

        this.ctx.clearRect(0, 0, renderWidth, renderHeight);
        this.ctx.drawImage(img, 0, 0, renderWidth, renderHeight);
      }
    };

    img.onerror = (error) => {
      console.error('Error loading image: ', error);
    };
  }

  onCanvasMouseDown(event: MouseEvent) {
    this.startX = event.offsetX;
  }

  onCanvasMouseUp(event: MouseEvent) {
    this.endX = event.offsetX;
    this.updateSelectedObjectSize();
  }

  onCanvasTouchStart(event: TouchEvent) {
    this.startX = this.getTouchX(event.touches[0]);
  }

  onCanvasTouchEnd(event: TouchEvent) {
    this.endX = this.getTouchX(event.changedTouches[0]);
    this.updateSelectedObjectSize();
  }

  private getTouchX(touch: Touch) {
    const canvasEl = this.canvas?.nativeElement;
    const rect = canvasEl?.getBoundingClientRect();
    return rect ? touch.clientX - rect.left : 0;
  }

  private updateSelectedObjectSize() {
    const sizeOnCanvas = Math.abs(this.endX - this.startX);
    const sizeInImage = Math.round(sizeOnCanvas * this.imageScaleX);
    this.objectSizeInImage.set(sizeInImage);
  }

  ngOnDestroy() {
    if (this.imageSubscription) {
      this.imageSubscription.unsubscribe();
    }
  }
}
