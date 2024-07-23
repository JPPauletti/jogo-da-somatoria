export const calcularPontuacao = (cartas) => {
  return cartas.reduce((acumulador, carta) => {
    const valor = carta.value;
    if (valor === "ACE") return acumulador + 1;
    if (valor === "JACK") return acumulador + 11;
    if (valor === "QUEEN") return acumulador + 12;
    if (valor === "KING") return acumulador + 13;
    return acumulador + parseInt(valor, 10);
  }, 0);
};
