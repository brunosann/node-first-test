const axios = require("axios");

const getUrl = (data) =>
  `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${data}'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`;

const getToday = () => {
  const today = new Date();
  return `${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}`;
};

const getCotacaoAPI = (url) => axios.get(url);
const extractCotacao = (res) => res.data.value[0].cotacaoVenda;
const getCotacao = ({ getToday, getUrl, getCotacaoAPI, extractCotacao }) => async () => {
  try {
    const today = getToday();
    const url = getUrl(today);
    const res = await getCotacaoAPI(url);
    const cotacao = extractCotacao(res);
    return cotacao;
  } catch (error) {
    console.log("Falha na requisição da api-dolar", error);
    return "";
  }
};

module.exports = {
  getCotacaoAPI,
  extractCotacao,
  getCotacao: getCotacao({ getToday, getUrl, getCotacaoAPI, extractCotacao }),
  getToday,
  getUrl,
  pure: {
    getCotacao
  }
};
