import { loginReturn } from './../types/types';
import { criarAluguel, criarUsuarioApi, excluirImovel, listarClientes, listarCorretores, listarImoveis, logarUsuario } from "../resources/usuario.resource";

export const criarUsuarioController = async (dados: object) => {
  try {
    const result = await criarUsuarioApi(dados);
    return result.data;
  } catch (error: any) {
    console.log(error.message);
  }

  return;
}

export const loginController = async (dados: object) => {
  try {
    const result = await logarUsuario(dados);
    return result.data as loginReturn;
  } catch (error: any) {
    console.log(error.message);
  }

  return;
}

export const criarAluguelController = async (dados: object) => {
  try {
    const result = await criarAluguel(dados);
    return result.data;
  } catch (error: any) {
    console.log(error.message);
  }

  return;
}

export const listarImoveisController = async () => {
  try {
    const result = await listarImoveis();
    return result.data;
  } catch (error: any) {
    console.log(error.message);
  }

  return;
}

export const listarCorretoresController = async () => {
  try {
    const result = await listarCorretores();
    return result.data;
  } catch (error: any) {
    console.log(error.message);
  }

  return;
}

export const listarClientesController = async () => {
  try {
    const result = await listarClientes();
    return result.data;
  } catch (error: any) {
    console.log(error.message);
  }

  return;
}

export const deletarImovelController = async (idImovel: number, idUser: number) => {
  try {
    const result = await excluirImovel({ idImovel, idUser });
    return result.data;
  } catch (error: any) {
    console.log(error.message);
  }
}
