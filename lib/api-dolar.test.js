const api = require("./api-dolar");
const axios = require("axios");

jest.mock("axios");

test("get cotacao api", () => {
  const res = {
    data: {
      value: [{ cotacaoVenda: 5.2 }],
    },
  };
  axios.get.mockResolvedValue(res);
  api.getCotacaoAPI("url").then((resp) => {
    expect(resp).toEqual(res);
    expect(axios.get.mock.calls[0][0]).toBe("url");
  });
});

test("extract cotacao", () => {
  const cotacao = api.extractCotacao({
    data: {
      value: [{ cotacaoVenda: 5.2 }],
    },
  });
  expect(cotacao).toBe(5.2);
});

describe("get today", () => {
  const RealDate = Date;

  function mockDate(date) {
    global.Date = class extends RealDate {
      constructor() {
        return new RealDate(date);
      }
    };
  }

  afterEach(() => {
    global.Date = RealDate;
  });

  test("getToday", () => {
    mockDate("2020-07-25T12:00:00z");
    const today = api.getToday();
    expect(today).toBe("7-25-2020");
  });
});

test("get Url", () => {
  const url = api.getUrl("MINHA-DATA");
  expect(url).toBe(
    `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='MINHA-DATA'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`,
  );
});

test("get cotacao", () => {
  const res = {
    data: {
      value: [{ cotacaoVenda: 5.2 }],
    },
  };

  const getToday = jest.fn();
  getToday.mockReturnValue("07-25-2020");

  const getUrl = jest.fn();
  getUrl.mockReturnValue("url");

  const getCotacaoAPI = jest.fn();
  getCotacaoAPI.mockResolvedValue(res);

  const extractCotacao = jest.fn();
  extractCotacao.mockReturnValue(5.2);

  api.pure
    .getCotacao({ getToday, getUrl, getCotacaoAPI, extractCotacao })()
    .then((res) => {
      expect(res).toBe(5.2);
    });
});

test("get cotacao", () => {
  const res = {};

  const getToday = jest.fn();
  getToday.mockReturnValue("07-25-2020");

  const getUrl = jest.fn();
  getUrl.mockReturnValue("url");

  const getCotacaoAPI = jest.fn();
  getCotacaoAPI.mockReturnValue(Promise.reject("err"));

  api.pure
    .getCotacao({ getToday, getUrl, getCotacaoAPI })()
    .then((res) => {
      expect(res).toBe("");
    });
});
