import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VotosComponent } from './votos.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { VotosService, VotoRequest, VotoResponse } from './votos.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

describe('VotosComponent', () => {
  let component: VotosComponent;
  let fixture: ComponentFixture<VotosComponent>;
  let votosService: VotosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VotosComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [FormBuilder, VotosService]
    });

    fixture = TestBed.createComponent(VotosComponent);
    component = fixture.componentInstance;
    votosService = TestBed.inject(VotosService);
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
    const totalVotersControl = component.votesForm.get('totalVoters');
    const validVotesControl = component.votesForm.get('validVotes');
    const blankVotesControl = component.votesForm.get('blankVotes');
    const nullVotesControl = component.votesForm.get('nullVotes');

    expect(totalVotersControl).toBeTruthy();
    expect(validVotesControl).toBeTruthy();
    expect(blankVotesControl).toBeTruthy();
    expect(nullVotesControl).toBeTruthy();

    expect(totalVotersControl?.hasError('required')).toBeTruthy();
    expect(validVotesControl?.hasError('required')).toBeTruthy();
    expect(blankVotesControl?.hasError('required')).toBeTruthy();
    expect(nullVotesControl?.hasError('required')).toBeTruthy();
  });

  it('should show error when form is submitted with empty values', () => {
    component.calculatePercentages();
    expect(component.error).toBeNull(); // O erro é tratado pelo Angular Forms
    expect(component.votesForm.get('totalVoters')?.hasError('required')).toBeTruthy();
    expect(component.votesForm.get('validVotes')?.hasError('required')).toBeTruthy();
    expect(component.votesForm.get('blankVotes')?.hasError('required')).toBeTruthy();
    expect(component.votesForm.get('nullVotes')?.hasError('required')).toBeTruthy();
  });

  it('should show error when totalVoters is less than 1', () => {
    component.votesForm.patchValue({
      totalVoters: 0,
      validVotes: 0,
      blankVotes: 0,
      nullVotes: 0
    });
    component.calculatePercentages();
    expect(component.error).toBeNull(); // O erro é tratado pelo Angular Forms
    expect(component.votesForm.get('totalVoters')?.hasError('min')).toBeTruthy();
  });

  it('should show error when votes are negative', () => {
    component.votesForm.patchValue({
      totalVoters: 100,
      validVotes: -1,
      blankVotes: 0,
      nullVotes: 0
    });
    component.calculatePercentages();
    expect(component.error).toBeNull(); // O erro é tratado pelo Angular Forms
    expect(component.votesForm.get('validVotes')?.hasError('min')).toBeTruthy();
  });

  it('should calculate percentages successfully', () => {
    const mockResponse: VotoResponse = {
      percentValidos: '60.00%',
      percentBrancos: '20.00%',
      percentNulos: '20.00%'
    };
    spyOn(votosService, 'calcularPercentuais').and.returnValue(of(mockResponse));

    component.votesForm.patchValue({
      totalVoters: 100,
      validVotes: 60,
      blankVotes: 20,
      nullVotes: 20
    });
    component.calculatePercentages();

    expect(component.loading).toBeFalse();
    expect(component.results).toEqual(mockResponse);
    expect(component.error).toBeNull();
  });

  it('should handle server error with specific message', () => {
    const errorMessage = 'Total de votos excede o número de eleitores';
    spyOn(votosService, 'calcularPercentuais').and.returnValue(
      throwError(() => ({ error: errorMessage }))
    );

    component.votesForm.patchValue({
      totalVoters: 100,
      validVotes: 60,
      blankVotes: 20,
      nullVotes: 30
    });
    component.calculatePercentages();

    expect(component.loading).toBeFalse();
    expect(component.results).toBeNull();
    expect(component.error).toBe(errorMessage);
  });

  it('should handle generic server error', () => {
    spyOn(votosService, 'calcularPercentuais').and.returnValue(
      throwError(() => ({ error: null }))
    );

    component.votesForm.patchValue({
      totalVoters: 100,
      validVotes: 60,
      blankVotes: 20,
      nullVotes: 20
    });
    component.calculatePercentages();

    expect(component.loading).toBeFalse();
    expect(component.results).toBeNull();
    expect(component.error).toBe('Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.');
  });

  it('should reset loading state even when error occurs', () => {
    spyOn(votosService, 'calcularPercentuais').and.returnValue(
      throwError(() => ({ error: 'Erro' }))
    );

    component.votesForm.patchValue({
      totalVoters: 100,
      validVotes: 60,
      blankVotes: 20,
      nullVotes: 20
    });
    component.calculatePercentages();

    expect(component.loading).toBeFalse();
  });
});
