import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare var EXIF: any; // Importando a biblioteca EXIF.js

@Component({
  selector: 'app-exif-reader',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exif-reader.component.html',
  styleUrls: ['./exif-reader.component.scss']
})
export class ExifReaderComponent {
  focalLength: number = 0;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;

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
