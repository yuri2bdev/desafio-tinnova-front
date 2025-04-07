import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { VeiculoFormComponent } from './veiculo-form.component';
import { VeiculoService } from '../veiculo.service';
import { Marca, Veiculo, VeiculoRequest } from '../veiculo.model';

describe('VeiculoFormComponent', () => {
  let component: VeiculoFormComponent;
  let fixture: ComponentFixture<VeiculoFormComponent>;
  let veiculoService: VeiculoService;
  let snackBar: MatSnackBar;
  let router: Router;

  // Mock para veículo
  const mockVeiculo: Veiculo = {
    id: '1',
    veiculo: 'Gol',
    marca: Marca.VOLKSWAGEN,
    ano: 2020,
    descricao: 'Carro em ótimo estado',
    vendido: false,
    created: '2023-01-01T10:00:00',
    updated: '2023-01-01T10:00:00'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VeiculoFormComponent],
      imports: [
        ReactiveFormsModule,
        MatSnackBarModule,
        RouterTestingModule,
        NoopAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [
        FormBuilder,
        VeiculoService,
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(new Map())
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VeiculoFormComponent);
    component = fixture.componentInstance;
    veiculoService = TestBed.inject(VeiculoService);
    snackBar = TestBed.inject(MatSnackBar);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with validators', () => {
    expect(component.veiculoForm).toBeDefined();
    expect(component.veiculoForm.get('veiculo')).toBeTruthy();
    expect(component.veiculoForm.get('marca')).toBeTruthy();
    expect(component.veiculoForm.get('ano')).toBeTruthy();
    expect(component.veiculoForm.get('descricao')).toBeTruthy();
    expect(component.veiculoForm.get('vendido')).toBeTruthy();
    
    expect(component.veiculoForm.get('veiculo')?.hasError('required')).toBeTrue();
    expect(component.veiculoForm.get('marca')?.hasError('required')).toBeTrue();
    expect(component.veiculoForm.get('ano')?.hasError('required')).toBeTrue();
    expect(component.veiculoForm.get('descricao')?.hasError('required')).toBeTrue();
  });

  it('should set editando to false by default', () => {
    expect(component.editando).toBeFalse();
    expect(component.veiculoId).toBeNull();
  });

  it('should have correct validation for ano field', () => {
    const anoControl = component.veiculoForm.get('ano');
    anoControl?.setValue(1800);
    expect(anoControl?.hasError('min')).toBeTrue();
    
    anoControl?.setValue(new Date().getFullYear() + 5);
    expect(anoControl?.hasError('max')).toBeTrue();
    
    anoControl?.setValue(2020);
    expect(anoControl?.valid).toBeTrue();
  });

  it('should load vehicle data when in edit mode', () => {
    // Simular rota com ID
    component.veiculoId = '1';
    component.editando = true;
    
    spyOn(veiculoService, 'buscarPorId').and.returnValue(of(mockVeiculo));
    component.carregarVeiculo('1');
    
    expect(veiculoService.buscarPorId).toHaveBeenCalledWith('1');
    expect(component.veiculoForm.value.veiculo).toBe(mockVeiculo.veiculo);
    expect(component.veiculoForm.value.marca).toBe(mockVeiculo.marca);
    expect(component.veiculoForm.value.ano).toBe(mockVeiculo.ano);
    expect(component.veiculoForm.value.descricao).toBe(mockVeiculo.descricao);
    expect(component.veiculoForm.value.vendido).toBe(mockVeiculo.vendido);
    expect(component.carregando).toBeFalse();
  });

  it('should handle error when loading vehicle data', () => {
    spyOn(veiculoService, 'buscarPorId').and.returnValue(throwError(() => new Error('Erro ao carregar')));
    spyOn(snackBar, 'open');
    spyOn(router, 'navigate');
    
    component.carregarVeiculo('1');
    
    expect(component.carregando).toBeFalse();
    expect(snackBar.open).toHaveBeenCalledWith(
      'Erro ao carregar dados do veículo. Tente novamente.',
      'Fechar',
      jasmine.any(Object)
    );
    expect(router.navigate).toHaveBeenCalledWith(['/desafios/veiculos']);
  });

  it('should not submit when form is invalid', () => {
    spyOn(veiculoService, 'criar');
    spyOn(veiculoService, 'atualizar');
    
    component.onSubmit();
    
    expect(veiculoService.criar).not.toHaveBeenCalled();
    expect(veiculoService.atualizar).not.toHaveBeenCalled();
  });

  it('should create a new vehicle when form is valid', () => {
    component.veiculoForm.patchValue({
      veiculo: 'Gol',
      marca: Marca.VOLKSWAGEN,
      ano: 2020,
      descricao: 'Carro em ótimo estado',
      vendido: false
    });
    
    const expectedRequest: VeiculoRequest = {
      veiculo: 'Gol',
      marca: Marca.VOLKSWAGEN,
      ano: 2020,
      descricao: 'Carro em ótimo estado',
      vendido: false
    };
    
    spyOn(veiculoService, 'criar').and.returnValue(of(mockVeiculo));
    spyOn(snackBar, 'open');
    spyOn(router, 'navigate');
    
    component.onSubmit();
    
    expect(veiculoService.criar).toHaveBeenCalledWith(expectedRequest);
    expect(snackBar.open).toHaveBeenCalledWith(
      'Veículo cadastrado com sucesso!',
      'Fechar',
      jasmine.any(Object)
    );
    expect(router.navigate).toHaveBeenCalledWith(['/desafios/veiculos']);
    expect(component.carregando).toBeFalse();
  });

  it('should update an existing vehicle when form is valid and in edit mode', () => {
    component.veiculoId = '1';
    component.editando = true;
    component.veiculoForm.patchValue({
      veiculo: 'Gol Atualizado',
      marca: Marca.VOLKSWAGEN,
      ano: 2021,
      descricao: 'Carro atualizado',
      vendido: true
    });
    
    const expectedRequest: VeiculoRequest = {
      veiculo: 'Gol Atualizado',
      marca: Marca.VOLKSWAGEN,
      ano: 2021,
      descricao: 'Carro atualizado',
      vendido: true
    };
    
    spyOn(veiculoService, 'atualizar').and.returnValue(of(mockVeiculo));
    spyOn(snackBar, 'open');
    spyOn(router, 'navigate');
    
    component.onSubmit();
    
    expect(veiculoService.atualizar).toHaveBeenCalledWith('1', expectedRequest);
    expect(snackBar.open).toHaveBeenCalledWith(
      'Veículo atualizado com sucesso!',
      'Fechar',
      jasmine.any(Object)
    );
    expect(router.navigate).toHaveBeenCalledWith(['/desafios/veiculos']);
    expect(component.carregando).toBeFalse();
  });

  it('should handle error when creating a vehicle', () => {
    component.veiculoForm.patchValue({
      veiculo: 'Gol',
      marca: Marca.VOLKSWAGEN,
      ano: 2020,
      descricao: 'Carro em ótimo estado',
      vendido: false
    });
    
    spyOn(veiculoService, 'criar').and.returnValue(throwError(() => new Error('Erro ao cadastrar')));
    spyOn(snackBar, 'open');
    
    component.onSubmit();
    
    expect(component.carregando).toBeFalse();
    expect(snackBar.open).toHaveBeenCalledWith(
      'Erro ao cadastrar veículo. Tente novamente.',
      'Fechar',
      jasmine.any(Object)
    );
  });

  it('should handle error when updating a vehicle', () => {
    component.veiculoId = '1';
    component.editando = true;
    component.veiculoForm.patchValue({
      veiculo: 'Gol',
      marca: Marca.VOLKSWAGEN,
      ano: 2020,
      descricao: 'Carro em ótimo estado',
      vendido: false
    });
    
    spyOn(veiculoService, 'atualizar').and.returnValue(throwError(() => new Error('Erro ao atualizar')));
    spyOn(snackBar, 'open');
    
    component.onSubmit();
    
    expect(component.carregando).toBeFalse();
    expect(snackBar.open).toHaveBeenCalledWith(
      'Erro ao atualizar veículo. Tente novamente.',
      'Fechar',
      jasmine.any(Object)
    );
  });

  it('should navigate back to vehicle list on cancelar()', () => {
    spyOn(router, 'navigate');
    
    component.cancelar();
    
    expect(router.navigate).toHaveBeenCalledWith(['/desafios/veiculos']);
  });
}); 