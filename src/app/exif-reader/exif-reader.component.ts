import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageService } from '../image.service';
declare var EXIF: any;

@Component({
  selector: 'app-exif-reader',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exif-reader.component.html',
  styleUrls: ['./exif-reader.component.scss']
})
export class ExifReaderComponent {
  focalLength: number = 0;

  constructor(private imageService: ImageService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imgSrc = reader.result as string;
        this.imageService.setImage(imgSrc); // Envia a imagem selecionada ao serviço

        const img = new Image();
        img.src = imgSrc;

        img.onload = () => {
          EXIF.getData(img, () => {
            this.focalLength = EXIF.getTag(img, 'FocalLength');
            console.log(`Distância focal: ${this.focalLength}`);
          });
        };
      };
      reader.readAsDataURL(file);
    }
  }
}
