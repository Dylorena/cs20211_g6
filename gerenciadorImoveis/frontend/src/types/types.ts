export interface BaseReturn {
  Success: boolean;
  Message: string;
}

export interface Imovel {
  id: number;
  idstatus: number;
  status: string;
  endereco: string;
  descricao: string;
  tipoimovel: string;
}

export interface ListarImoveisReturn extends BaseReturn{
  Data: Imovel[];
}

export interface loginReturn extends BaseReturn{
  idUser: number;
}

