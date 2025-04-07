import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FatorialComponent } from './fatorial.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FatorialService } from './fatorial.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

describe('FatorialComponent', () => {
  let component: FatorialComponent;
  let fixture: ComponentFixture<FatorialComponent>;
  let fatorialService: FatorialService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FatorialComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [FormBuilder, FatorialService]
    });

    fixture = TestBed.createComponent(FatorialComponent);
    component = fixture.componentInstance;
    fatorialService = TestBed.inject(FatorialService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with required validators', () => {
    const numeroControl = component.fatorialForm.get('numero');
    expect(numeroControl).toBeTruthy();
    expect(numeroControl?.hasError('required')).toBeTruthy();
  });

  it('should show error when form is submitted with empty value', () => {
    component.calcularFatorial();
    expect(component.erro).toBe('Por favor, digite um número.');
  });

  it('should show error when form is submitted with negative number', () => {
    component.fatorialForm.patchValue({ numero: -1 });
    component.calcularFatorial();
    expect(component.erro).toBe('O número deve ser maior ou igual a zero.');
  });

  it('should show error when form is submitted with non-integer value', () => {
    component.fatorialForm.patchValue({ numero: 'abc' });
    component.calcularFatorial();
    expect(component.erro).toBe('Digite apenas números inteiros positivos.');
  });

  it('should show error when number is too large', () => {
    component.fatorialForm.patchValue({ numero: 171 });
    component.calcularFatorial();
    expect(component.erro).toBe('O número é muito grande para calcular o fatorial (máximo: 170).');
  });

  it('should calculate factorial successfully', () => {
    const mockResult = '120';
    spyOn(fatorialService, 'calcularFatorial').and.returnValue(of(mockResult));

    component.fatorialForm.patchValue({ numero: 5 });
    component.calcularFatorial();

    expect(component.loading).toBeFalse();
    expect(component.resultado).toBe(mockResult);
    expect(component.erro).toBeNull();
  });

  it('should handle server error 400', () => {
    spyOn(fatorialService, 'calcularFatorial').and.returnValue(
      throwError(() => ({ status: 400 }))
    );

    component.fatorialForm.patchValue({ numero: 5 });
    component.calcularFatorial();

    expect(component.loading).toBeFalse();
    expect(component.resultado).toBeNull();
    expect(component.erro).toBe('Número inválido. O fatorial só pode ser calculado para números não negativos.');
  });

  it('should handle server error 500', () => {
    spyOn(fatorialService, 'calcularFatorial').and.returnValue(
      throwError(() => ({ status: 500 }))
    );

    component.fatorialForm.patchValue({ numero: 5 });
    component.calcularFatorial();

    expect(component.loading).toBeFalse();
    expect(component.resultado).toBeNull();
    expect(component.erro).toBe('Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.');
  });

  it('should handle generic error', () => {
    spyOn(fatorialService, 'calcularFatorial').and.returnValue(
      throwError(() => ({ status: 0 }))
    );

    component.fatorialForm.patchValue({ numero: 5 });
    component.calcularFatorial();

    expect(component.loading).toBeFalse();
    expect(component.resultado).toBeNull();
    expect(component.erro).toBe('Ocorreu um erro ao calcular o fatorial. Por favor, tente novamente.');
  });
});
