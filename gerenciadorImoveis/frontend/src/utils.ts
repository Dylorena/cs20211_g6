export const apenasNumeros = (string:string) => {
  return string.replace(/\D+/g, '');
};