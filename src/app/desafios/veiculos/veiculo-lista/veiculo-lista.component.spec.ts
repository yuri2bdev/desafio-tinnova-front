import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

import { VeiculoListaComponent } from './veiculo-lista.component';
import { VeiculoService } from '../veiculo.service';
import { Marca, Veiculo } from '../veiculo.model';

describe('VeiculoListaComponent', () => {
  let component: VeiculoListaComponent;
  let fixture: ComponentFixture<VeiculoListaComponent>;
  let veiculoService: VeiculoService;
  let dialog: MatDialog;
  let snackBar: MatSnackBar;

  // Mock para veículos
  const mockVeiculos: Veiculo[] = [
    {
      id: '1',
      veiculo: 'Gol',
      marca: Marca.VOLKSWAGEN,
      ano: 2020,
      descricao: 'Carro em ótimo estado',
      vendido: false,
      created: '2023-01-01T10:00:00',
      updated: '2023-01-01T10:00:00'
    },
    {
      id: '2',
      veiculo: 'Onix',
      marca: Marca.CHEVROLET,
      ano: 2021,
      descricao: 'Seminovo',
      vendido: true,
      created: '2023-01-02T10:00:00',
      updated: '2023-01-02T10:00:00'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VeiculoListaComponent],
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
        MatSnackBarModule,
        RouterTestingModule,
        NoopAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [VeiculoService]
    }).compileComponents();

    fixture = TestBed.createComponent(VeiculoListaComponent);
    component = fixture.componentInstance;
    veiculoService = TestBed.inject(VeiculoService);
    dialog = TestBed.inject(MatDialog);
    snackBar = TestBed.inject(MatSnackBar);
    
    spyOn(veiculoService, 'listarTodos').and.returnValue(of(mockVeiculos));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load vehicles on init', () => {
    expect(veiculoService.listarTodos).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(mockVeiculos);
    expect(component.carregando).toBeFalse();
  });

  it('should handle error when loading vehicles', () => {
    // Reset spy de listarTodos
    (veiculoService.listarTodos as jasmine.Spy).and.returnValue(throwError(() => new Error('Erro ao carregar')));
    spyOn(snackBar, 'open');
    
    component.carregarVeiculos();
    
    expect(component.carregando).toBeFalse();
    expect(snackBar.open).toHaveBeenCalledWith(
      'Erro ao carregar veículos. Tente novamente mais tarde.',
      'Fechar',
      jasmine.any(Object)
    );
  });

  it('should apply filter', () => {
    spyOn(component.dataSource, 'filter').and.callThrough();
    
    component.filtro = 'gol';
    component.aplicarFiltro();
    
    expect(component.dataSource.filter).toBe('gol');
  });

  it('should clear filter', () => {
    component.filtro = 'teste';
    spyOn(component, 'aplicarFiltro');
    
    component.limparFiltro();
    
    expect(component.filtro).toBe('');
    expect(component.aplicarFiltro).toHaveBeenCalled();
  });

  it('should toggle search expansion', () => {
    expect(component.pesquisaExpandida).toBeFalse();
    
    component.togglePesquisa();
    expect(component.pesquisaExpandida).toBeTrue();
    
    spyOn(component, 'limparFiltro');
    component.togglePesquisa();
    expect(component.pesquisaExpandida).toBeFalse();
    expect(component.limparFiltro).toHaveBeenCalled();
  });

  it('should navigate to details page', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    const id = '1';
    
    component.verDetalhes(id);
    
    expect(routerSpy).toHaveBeenCalledWith(['/desafios/veiculos/detalhes', id]);
  });

  it('should navigate to edit page', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    const id = '1';
    
    component.editarVeiculo(id);
    
    expect(routerSpy).toHaveBeenCalledWith(['/desafios/veiculos/editar', id]);
  });

  it('should delete vehicle after confirmation', () => {
    const veiculo = mockVeiculos[0];
    const dialogRefMock = {
      afterClosed: () => of(true)
    };
    spyOn(dialog, 'open').and.returnValue(dialogRefMock as any);
    spyOn(veiculoService, 'deletar').and.returnValue(of(void 0));
    spyOn(snackBar, 'open');
    spyOn(component, 'carregarVeiculos');
    
    component.excluirVeiculo(veiculo);
    
    expect(dialog.open).toHaveBeenCalled();
    expect(veiculoService.deletar).toHaveBeenCalledWith(veiculo.id);
    expect(snackBar.open).toHaveBeenCalledWith(
      'Veículo excluído com sucesso!',
      'Fechar',
      jasmine.any(Object)
    );
    expect(component.carregarVeiculos).toHaveBeenCalled();
  });

  it('should not delete vehicle if not confirmed', () => {
    const veiculo = mockVeiculos[0];
    const dialogRefMock = {
      afterClosed: () => of(false)
    };
    spyOn(dialog, 'open').and.returnValue(dialogRefMock as any);
    spyOn(veiculoService, 'deletar');
    
    component.excluirVeiculo(veiculo);
    
    expect(dialog.open).toHaveBeenCalled();
    expect(veiculoService.deletar).not.toHaveBeenCalled();
  });

  it('should handle error when deleting vehicle', () => {
    const veiculo = mockVeiculos[0];
    const dialogRefMock = {
      afterClosed: () => of(true)
    };
    spyOn(dialog, 'open').and.returnValue(dialogRefMock as any);
    spyOn(veiculoService, 'deletar').and.returnValue(throwError(() => new Error('Erro ao excluir')));
    spyOn(snackBar, 'open');
    
    component.excluirVeiculo(veiculo);
    
    expect(dialog.open).toHaveBeenCalled();
    expect(veiculoService.deletar).toHaveBeenCalledWith(veiculo.id);
    expect(snackBar.open).toHaveBeenCalledWith(
      'Erro ao excluir veículo. Tente novamente.',
      'Fechar',
      jasmine.any(Object)
    );
    expect(component.carregando).toBeFalse();
  });

  it('should format date correctly', () => {
    // Sobrescrever o toLocaleString para garantir um resultado fixo no teste
    const originalToLocaleString = Date.prototype.toLocaleString;
    Date.prototype.toLocaleString = function() {
      return '01/01/2023 10:00:00';
    };
    
    const formattedDate = component.formatarData('2023-01-01T10:00:00');
    expect(formattedDate).toBe('01/01/2023 10:00:00');
    
    // Restaurar o método original
    Date.prototype.toLocaleString = originalToLocaleString;
  });
}); 