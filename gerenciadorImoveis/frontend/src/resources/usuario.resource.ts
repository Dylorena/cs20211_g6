import axios from "axios";
import { BaseReturn, ListarImoveisReturn } from "../types/types";

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export function criarUsuarioApi(dados: object) {
  return api.post('/imoveiscs/criarusuario', { ...dados });
}

export function logarUsuario(dados: object) {
  return api.post<BaseReturn>('/imoveiscs/login', { ...dados });
}

export function criarAluguel(dados: object) {
  return api.post<BaseReturn>('/imoveiscs/criarAluguel', { ...dados });
}

export function listarImoveis() {
  return api.get<ListarImoveisReturn>('/imoveiscs/imoveis');
}

export function listarCorretores() {
  return api.get<any>('/imoveiscs/corretores');
}

export function listarClientes() {
  return api.get<any>('/imoveiscs/clientes');
}

export function excluirImovel(dados: Object) {
  return api.post<BaseReturn>('/imoveiscs/deletarimovel', { ...dados });
}
