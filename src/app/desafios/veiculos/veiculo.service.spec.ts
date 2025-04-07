import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VeiculoService } from './veiculo.service';
import { Marca, Veiculo, VeiculoRequest, RelatorioDecada, RelatorioMarca } from './veiculo.model';

describe('VeiculoService', () => {
  let service: VeiculoService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8080/veiculos';
  
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
  
  // Mock para lista de veículos
  const mockVeiculos: Veiculo[] = [
    mockVeiculo,
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
  
  const mockVeiculoRequest: VeiculoRequest = {
    veiculo: 'Gol',
    marca: Marca.VOLKSWAGEN,
    ano: 2020,
    descricao: 'Carro em ótimo estado',
    vendido: false
  };
  
  const mockRelatorioDecada: RelatorioDecada = {
    '2000': 10,
    '2010': 15,
    '2020': 8
  };
  
  const mockRelatorioMarca: RelatorioMarca = {
    'Volkswagen': 12,
    'Chevrolet': 8,
    'Fiat': 5
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VeiculoService]
    });
    
    service = TestBed.inject(VeiculoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  // Testes dos métodos CRUD
  it('should list all vehicles', () => {
    service.listarTodos().subscribe(veiculos => {
      expect(veiculos).toEqual(mockVeiculos);
    });
    
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockVeiculos);
  });
  
  it('should fetch vehicle by id', () => {
    const id = '1';
    
    service.buscarPorId(id).subscribe(veiculo => {
      expect(veiculo).toEqual(mockVeiculo);
    });
    
    const req = httpMock.expectOne(`${apiUrl}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockVeiculo);
  });
  
  it('should create a new vehicle', () => {
    service.criar(mockVeiculoRequest).subscribe(veiculo => {
      expect(veiculo).toEqual(mockVeiculo);
    });
    
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockVeiculoRequest);
    req.flush(mockVeiculo);
  });
  
  it('should update a vehicle', () => {
    const id = '1';
    
    service.atualizar(id, mockVeiculoRequest).subscribe(veiculo => {
      expect(veiculo).toEqual(mockVeiculo);
    });
    
    const req = httpMock.expectOne(`${apiUrl}/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockVeiculoRequest);
    req.flush(mockVeiculo);
  });
  
  it('should delete a vehicle', () => {
    const id = '1';
    
    service.deletar(id).subscribe();
    
    const req = httpMock.expectOne(`${apiUrl}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
  
  // Testes dos métodos para filtros e relatórios
  it('should fetch unsold vehicles', () => {
    service.buscarNaoVendidos().subscribe(veiculos => {
      expect(veiculos).toEqual([mockVeiculo]);
    });
    
    const req = httpMock.expectOne(`${apiUrl}/nao-vendidos`);
    expect(req.request.method).toBe('GET');
    req.flush([mockVeiculo]);
  });
  
  it('should count unsold vehicles', () => {
    const count = 5;
    
    service.contarNaoVendidos().subscribe(total => {
      expect(total).toBe(count);
    });
    
    const req = httpMock.expectOne(`${apiUrl}/nao-vendidos/contagem`);
    expect(req.request.method).toBe('GET');
    req.flush(count);
  });
  
  it('should fetch vehicles by brand', () => {
    const marca = Marca.VOLKSWAGEN;
    
    service.buscarPorMarca(marca).subscribe(veiculos => {
      expect(veiculos).toEqual([mockVeiculo]);
    });
    
    const req = httpMock.expectOne(`${apiUrl}/marca/${marca}`);
    expect(req.request.method).toBe('GET');
    req.flush([mockVeiculo]);
  });
  
  it('should count vehicles by brand', () => {
    service.contarPorMarca().subscribe(relatorio => {
      expect(relatorio).toEqual(mockRelatorioMarca);
    });
    
    const req = httpMock.expectOne(`${apiUrl}/contagem-por-marca`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRelatorioMarca);
  });
  
  it('should fetch vehicles by year', () => {
    const ano = 2020;
    
    service.buscarPorAno(ano).subscribe(veiculos => {
      expect(veiculos).toEqual([mockVeiculo]);
    });
    
    const req = httpMock.expectOne(`${apiUrl}/ano/${ano}`);
    expect(req.request.method).toBe('GET');
    req.flush([mockVeiculo]);
  });
  
  it('should fetch vehicles by decade', () => {
    const decada = 2020;
    
    service.buscarPorDecada(decada).subscribe(veiculos => {
      expect(veiculos).toEqual([mockVeiculo]);
    });
    
    const req = httpMock.expectOne(`${apiUrl}/decada/${decada}`);
    expect(req.request.method).toBe('GET');
    req.flush([mockVeiculo]);
  });
  
  it('should count vehicles by decade', () => {
    service.contarPorDecada().subscribe(relatorio => {
      expect(relatorio).toEqual(mockRelatorioDecada);
    });
    
    const req = httpMock.expectOne(`${apiUrl}/contagem-por-decada`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRelatorioDecada);
  });
  
  it('should fetch vehicles registered in the last week', () => {
    service.buscarRegistradosUltimaSemana().subscribe(veiculos => {
      expect(veiculos).toEqual([mockVeiculo]);
    });
    
    const req = httpMock.expectOne(`${apiUrl}/ultima-semana`);
    expect(req.request.method).toBe('GET');
    req.flush([mockVeiculo]);
  });
}); 