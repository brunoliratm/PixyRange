import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private imageSrcSubject = new BehaviorSubject<string | null>(null);
  imageSrc$ = this.imageSrcSubject.asObservable();

  setImage(src: string) {
    this.imageSrcSubject.next(src); 
  }

  getImage(): string | null {
    return this.imageSrcSubject.value;
  }
}
