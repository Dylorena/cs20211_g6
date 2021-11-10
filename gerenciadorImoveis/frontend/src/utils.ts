export const apenasNumeros = (string:string) => {
  return string.replace(/\D+/g, '');
};

export const criarKey = (string:string) => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  return `${string}-${s4}-${s4}-${s4}`;
};