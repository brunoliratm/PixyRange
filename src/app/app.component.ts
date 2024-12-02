import { Component, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ImageSelectionComponent } from './image-selection/image-selection.component';
import { CalculadoraDistanciaComponent } from './calculadora-distancia/calculadora-distancia.component';



declare var EXIF: any;

@Component({
    selector: 'app-root',
    imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, MatIconModule, MatSidenavModule, MatListModule, MatSlideToggleModule,
        ImageSelectionComponent,
        CalculadoraDistanciaComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pixy Range';
  objectSizeInImage: number = 0;
  isDarkMode: boolean = false;
  language: string = 'EN';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    const body = document.body;
    body.classList.toggle('dark-mode', this.isDarkMode);
  }

  toggleLanguage() {
    this.language = this.language === 'EN' ? 'PT' : 'EN';
    if (isPlatformBrowser(this.platformId)) {
      const descriptionText = document.querySelector('.description-text');
      if (descriptionText) {
        if (this.language === 'EN') {
          descriptionText.textContent = 'Pixy Range is an Angular web application that calculates the distance of objects in images based on the object\'s actual size, its size in the image, and the camera\'s focal length. Ideal for photographers, developers and enthusiasts, it simplifies calculating distances accurately and intuitively.';
        } else {
          descriptionText.textContent = 'Pixy Range é uma aplicação web Angular que calcula a distância de objetos em imagens com base no tamanho real do objeto, seu tamanho na imagem e a distância focal da câmera. Ideal para fotógrafos, desenvolvedores e entusiastas, simplifica o cálculo de distâncias de forma precisa e intuitiva.';
        }
      }
    }
  }

}
