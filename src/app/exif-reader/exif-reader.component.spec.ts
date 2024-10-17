import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExifReaderComponent } from './exif-reader.component';

describe('ExifReaderComponent', () => {
  let component: ExifReaderComponent;
  let fixture: ComponentFixture<ExifReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExifReaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExifReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
