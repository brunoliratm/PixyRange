import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadoraDistanciaComponent } from './calculadora-distancia.component';

describe('CalculadoraDistanciaComponent', () => {
  let component: CalculadoraDistanciaComponent;
  let fixture: ComponentFixture<CalculadoraDistanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculadoraDistanciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculadoraDistanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
