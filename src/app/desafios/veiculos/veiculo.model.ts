export enum Marca {
  VOLKSWAGEN = 'Volkswagen',
  FIAT = 'Fiat',
  CHEVROLET = 'Chevrolet',
  FORD = 'Ford',
  RENAULT = 'Renault',
  TOYOTA = 'Toyota',
  HONDA = 'Honda',
  HYUNDAI = 'Hyundai',
  NISSAN = 'Nissan',
  MERCEDES = 'Mercedes-Benz',
  BMW = 'BMW',
  AUDI = 'Audi',
  JEEP = 'Jeep',
  MITSUBISHI = 'Mitsubishi',
  SUBARU = 'Subaru',
  VOLVO = 'Volvo',
  PEUGEOT = 'Peugeot',
  CITROEN = 'Citroën',
  KIA = 'Kia',
  LAND_ROVER = 'Land Rover',
  PORSCHE = 'Porsche',
  FERRARI = 'Ferrari',
  LAMBORGHINI = 'Lamborghini',
  MASERATI = 'Maserati',
  JAGUAR = 'Jaguar',
  LEXUS = 'Lexus',
  SUZUKI = 'Suzuki',
  TESLA = 'Tesla',
  BYD = 'BYD',
  CHERY = 'Chery',
  JAC = 'JAC',
  RAM = 'RAM',
  DODGE = 'Dodge',
  MINI = 'MINI'
}

export interface Veiculo {
  id?: string;
  veiculo: string;
  marca: Marca;
  ano: number;
  descricao: string;
  vendido: boolean;
  created?: string;
  updated?: string;
}

export interface VeiculoRequest {
  veiculo: string;
  marca: Marca;
  ano: number;
  descricao: string;
  vendido: boolean;
}

export interface RelatorioDecada {
  [decada: string]: number;
}

export interface RelatorioMarca {
  [marca: string]: number;
} 