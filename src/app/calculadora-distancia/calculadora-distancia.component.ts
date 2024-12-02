import { Component, Input, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExifReaderComponent } from '../exif-reader/exif-reader.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ImageSelectionComponent } from '../image-selection/image-selection.component';

@Component({
    selector: 'app-calculadora-distancia',
    imports: [CommonModule, FormsModule, MatFormFieldModule,
    MatInputModule, ExifReaderComponent],
    templateUrl: './calculadora-distancia.component.html',
    styleUrls: ['./calculadora-distancia.component.scss']
})
export class CalculadoraDistanciaComponent {
  realSize: number = 0;
  objectSizeInImage: number = 0;
  focalLength: number = 0;
  distancia: number | null = null;
  @Input() language: string = 'EN';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  onObjectSizeInImageChange(newSize: number) {
    this.objectSizeInImage = newSize;
  }

  onFocalLengthChange(newFocalLength: number) { 
    this.focalLength = newFocalLength;
  }

  calcularDistancia() {
    if (this.realSize > 0 && this.objectSizeInImage > 0 && this.focalLength > 0) {
      const focalLengthMeters = this.focalLength / 1000;
      this.distancia = (this.realSize * focalLengthMeters) / this.objectSizeInImage;
      console.log(`Distância calculada: ${this.distancia} metros`);
    } else {
      console.log("Preencha todos os campos corretamente.");
    }
  }

  ngOnChanges() {
    this.updateLanguage();
  }

  updateLanguage() {
    if (isPlatformBrowser(this.platformId)) {
      const distanceDescription = document.querySelector('.distance-description');
      if (distanceDescription) {
        if (this.language === 'EN') {
          distanceDescription.textContent = 'Calculate Object Distance';
        } else {
          distanceDescription.textContent = 'Calcular Distância do Objeto';
        }
      }
    }
  }

  toggleLanguage() {
    this.language = this.language === 'EN' ? 'PT' : 'EN';
    const distanceDescription = document.querySelector('.distance-description');
    if (distanceDescription) {
      if (this.language === 'EN') {
        distanceDescription.textContent = 'Calculate Object Distance';
      } else {
        distanceDescription.textContent = 'Calcular Distância do Objeto';
      }
    }
  }
}
