import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private imageSrc: string = '';

  setImage(src: string) {
    this.imageSrc = src;
  }

  getImage(): string {
    return this.imageSrc;
  }
}
