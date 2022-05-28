const fetchMoedas = async () => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';

  const moedas = await fetch(URL)
    .then((response) => response.json())
    .then((response) => response)
    .catch((erro) => erro);

  return moedas;
};

export default fetchMoedas;
