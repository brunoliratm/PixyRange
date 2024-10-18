import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExifReaderComponent } from '../exif-reader/exif-reader.component';

@Component({
  selector: 'app-calculadora-distancia',
  standalone: true,
  imports: [CommonModule, FormsModule, ExifReaderComponent],
  templateUrl: './calculadora-distancia.component.html',
  styleUrls: ['./calculadora-distancia.component.scss']
})
export class CalculadoraDistanciaComponent {
  realSize: number = 0;
  objectSizeInImage: number = 0;
  focalLength: number = 0;
  distancia: number | null = null;

  onFocalLengthChange(newFocalLength: number) { // Adicione isso
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
}
