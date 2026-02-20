import { Component, EventEmitter, Output } from '@angular/core';
import { ImageService } from '../image.service';
declare var EXIF: any;

@Component({
  selector: 'app-exif-reader',
  imports: [],
  templateUrl: './exif-reader.component.html',
  styleUrls: ['./exif-reader.component.scss'],
})
export class ExifReaderComponent {
  @Output() focalLengthChange = new EventEmitter<number>();
  focalLength: number = 0;

  constructor(private imageService: ImageService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imgSrc = reader.result as string;
      this.imageService.setImage(imgSrc);
      const img = new Image();
      img.src = imgSrc;

      img.onload = () => {
        EXIF.getData(img, () => {
          this.focalLength = EXIF.getTag(img, 'FocalLength');
          this.focalLengthChange.emit(this.focalLength);
        });
      };
    };
    reader.readAsDataURL(file);
  }
}
