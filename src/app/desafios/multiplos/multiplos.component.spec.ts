import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiplosComponent } from './multiplos.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MultiplosService } from './multiplos.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

describe('MultiplosComponent', () => {
  let component: MultiplosComponent;
  let fixture: ComponentFixture<MultiplosComponent>;
  let multiplosService: MultiplosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultiplosComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [FormBuilder, MultiplosService]
    });

    fixture = TestBed.createComponent(MultiplosComponent);
    component = fixture.componentInstance;
    multiplosService = TestBed.inject(MultiplosService);
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
    const limiteControl = component.multiplosForm.get('limite');
    expect(limiteControl).toBeTruthy();
    expect(limiteControl?.hasError('required')).toBeTruthy();
  });

  it('should show error when form is submitted with empty value', () => {
    component.calcularSoma();
    expect(component.error).toBeNull(); // O erro é tratado pelo Angular Forms
    expect(component.multiplosForm.get('limite')?.hasError('required')).toBeTruthy();
  });

  it('should show error when form is submitted with value less than 1', () => {
    component.multiplosForm.patchValue({ limite: 0 });
    component.calcularSoma();
    expect(component.error).toBeNull(); // O erro é tratado pelo Angular Forms
    expect(component.multiplosForm.get('limite')?.hasError('min')).toBeTruthy();
  });

  it('should calculate sum of multiples successfully', () => {
    const mockResult = 23; // Soma dos múltiplos de 3 e 5 até 10
    spyOn(multiplosService, 'calcularSomaMultiplos').and.returnValue(of(mockResult));

    component.multiplosForm.patchValue({ limite: 10 });
    component.calcularSoma();

    expect(component.loading).toBeFalse();
    expect(component.resultado).toBe(mockResult);
    expect(component.error).toBeNull();
    expect(component.numeroDigitado).toBe(10);
  });

  it('should handle server error with specific message', () => {
    const errorMessage = 'Limite inválido';
    spyOn(multiplosService, 'calcularSomaMultiplos').and.returnValue(
      throwError(() => ({ error: errorMessage }))
    );

    component.multiplosForm.patchValue({ limite: 10 });
    component.calcularSoma();

    expect(component.loading).toBeFalse();
    expect(component.resultado).toBeNull();
    expect(component.error).toBe(errorMessage);
  });

  it('should handle generic server error', () => {
    spyOn(multiplosService, 'calcularSomaMultiplos').and.returnValue(
      throwError(() => ({ error: null }))
    );

    component.multiplosForm.patchValue({ limite: 10 });
    component.calcularSoma();

    expect(component.loading).toBeFalse();
    expect(component.resultado).toBeNull();
    expect(component.error).toBe('Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.');
  });

  it('should reset loading state even when error occurs', () => {
    spyOn(multiplosService, 'calcularSomaMultiplos').and.returnValue(
      throwError(() => ({ error: 'Erro' }))
    );

    component.multiplosForm.patchValue({ limite: 10 });
    component.calcularSoma();

    expect(component.loading).toBeFalse();
  });
});
