import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdenacaoComponent } from './ordenacao.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BubbleSortService } from './bubble-sort.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

describe('OrdenacaoComponent', () => {
  let component: OrdenacaoComponent;
  let fixture: ComponentFixture<OrdenacaoComponent>;
  let bubbleSortService: BubbleSortService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdenacaoComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [FormBuilder, BubbleSortService]
    });

    fixture = TestBed.createComponent(OrdenacaoComponent);
    component = fixture.componentInstance;
    bubbleSortService = TestBed.inject(BubbleSortService);
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
    const numerosControl = component.ordenacaoForm.get('numeros');
    expect(numerosControl).toBeTruthy();
    expect(numerosControl?.hasError('required')).toBeTruthy();
  });

  it('should show error when form is submitted with empty value', () => {
    component.ordenarComBubbleSort();
    expect(component.erro).toBe('Por favor, informe pelo menos um número.');
  });

  it('should show error when form is submitted with invalid pattern', () => {
    component.ordenacaoForm.patchValue({ numeros: '1,2,a' });
    component.ordenarComBubbleSort();
    expect(component.erro).toBe('Apenas números separados por vírgula são permitidos.');
  });

  it('should show error when form is submitted with empty numbers after processing', () => {
    component.ordenacaoForm.patchValue({ numeros: ',,,' });
    component.ordenarComBubbleSort();
    expect(component.erro).toBe('Por favor, informe pelo menos um número.');
  });

  it('should process and sort numbers successfully', () => {
    const mockResult = [1, 2, 3, 4, 5];
    spyOn(bubbleSortService, 'ordenar').and.returnValue(of(mockResult));

    component.ordenacaoForm.patchValue({ numeros: '5,3,1,4,2' });
    component.ordenarComBubbleSort();

    expect(component.loading).toBeFalse();
    expect(component.listaOriginal).toEqual([5, 3, 1, 4, 2]);
    expect(component.listaOrdenada).toEqual(mockResult);
    expect(component.erro).toBeNull();
  });

  it('should handle server error 400', () => {
    spyOn(bubbleSortService, 'ordenar').and.returnValue(
      throwError(() => ({ status: 400 }))
    );

    component.ordenacaoForm.patchValue({ numeros: '1,2,3' });
    component.ordenarComBubbleSort();

    expect(component.loading).toBeFalse();
    expect(component.listaOrdenada).toBeNull();
    expect(component.erro).toBe('Entrada inválida. Verifique os valores informados.');
  });

  it('should handle server error 500', () => {
    spyOn(bubbleSortService, 'ordenar').and.returnValue(
      throwError(() => ({ status: 500 }))
    );

    component.ordenacaoForm.patchValue({ numeros: '1,2,3' });
    component.ordenarComBubbleSort();

    expect(component.loading).toBeFalse();
    expect(component.listaOrdenada).toBeNull();
    expect(component.erro).toBe('Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.');
  });

  it('should handle generic error', () => {
    spyOn(bubbleSortService, 'ordenar').and.returnValue(
      throwError(() => ({ status: 0 }))
    );

    component.ordenacaoForm.patchValue({ numeros: '1,2,3' });
    component.ordenarComBubbleSort();

    expect(component.loading).toBeFalse();
    expect(component.listaOrdenada).toBeNull();
    expect(component.erro).toBe('Ocorreu um erro ao ordenar os números. Por favor, tente novamente.');
  });

  it('should clear form and reset states', () => {
    component.ordenacaoForm.patchValue({ numeros: '1,2,3' });
    component.listaOriginal = [1, 2, 3];
    component.listaOrdenada = [1, 2, 3];
    component.erro = 'Erro';

    component.limparForm();

    expect(component.ordenacaoForm.get('numeros')?.value).toBeNull();
    expect(component.listaOriginal).toBeNull();
    expect(component.listaOrdenada).toBeNull();
    expect(component.erro).toBeNull();
  });

  it('should toggle mostrarPassos', () => {
    expect(component.mostrarPassos).toBeFalse();
    component.togglePassos();
    expect(component.mostrarPassos).toBeTrue();
    component.togglePassos();
    expect(component.mostrarPassos).toBeFalse();
  });
});
