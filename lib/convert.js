exports.convert = (cotacao, dolares) => {
  return cotacao * dolares;
};

exports.toMoney = (valor) => {
  return Number(valor).toFixed(2);
};
