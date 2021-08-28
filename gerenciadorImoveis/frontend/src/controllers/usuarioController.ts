import criarUsuarioApi from "../resources/usuario.resource";

export const criarUsuarioController = async (dados:object) => {
  try {
    const result = await criarUsuarioApi(dados);
    return result.data;
  } catch (error) {
    console.log(error.message);
  }

  return;
}
