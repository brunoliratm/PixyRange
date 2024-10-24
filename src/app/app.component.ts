import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { ExifReaderComponent } from './exif-reader/exif-reader.component';
import { ImageSelectionComponent } from './image-selection/image-selection.component';
import { CalculadoraDistanciaComponent } from './calculadora-distancia/calculadora-distancia.component';



declare var EXIF: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatIconModule,MatButtonModule, MatMenuModule, MatIconModule, MatSidenavModule, MatListModule, MatSlideToggleModule,
    ExifReaderComponent,
    ImageSelectionComponent,
    CalculadoraDistanciaComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pixy Range';
  objectSizeInImage: number = 0;
  isDarkMode: boolean = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    const body = document.body;
    body.classList.toggle('dark-mode', this.isDarkMode);
    const toolbar = document.getElementById('toolbar-container');
    if (toolbar) {
      toolbar.classList.toggle('dark-mode', this.isDarkMode);
    }
    const mainContainer = document.getElementById('main-container');
    if (mainContainer) {
      mainContainer.classList.toggle('dark-mode', this.isDarkMode);
    }
    const leftContainer = document.getElementById('leftside-container');
    const rightContainer = document.getElementById('rightside-container');
    if (leftContainer) {
      leftContainer.classList.toggle('dark-mode', this.isDarkMode);
    }
    if (rightContainer) {
      rightContainer.classList.toggle('dark-mode', this.isDarkMode);
    }
  }

}
