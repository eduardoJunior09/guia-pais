const buscaInput = document.getElementById("pais-input");
const buscaBtn = document.getElementById("pesquisa-btn");
const resultado = document.getElementById("resultado");

buscaBtn.addEventListener("click", () => {
  let nomePais = buscaInput.value;

  let url = `https://restcountries.com/v3.1/translation/${nomePais}`; //O
  console.log(url);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data[0]);
      let nomeBR = data[0].name.common;
      let img = data[0].flags.svg; // Bandeira do país
      let capital = data[0].capital[0]; //Capital do país
      let continente = data[0].continents[0]; //Continente do país
      let populacao = data[0].population; //População do país
      let moeda = Object.keys(data[0].currencies)[0]; //Moeda do país
      let moedaSimbolo =
        data[0].currencies[Object.keys(data[0].currencies)].symbol; //Simbolo da moeda do país
      let idioma = Object.values(data[0].languages)
        .toString()
        .split(",")
        .join(", "); //Idioma do país
      dadosPais(
        nomeBR,
        img,
        capital,
        continente,
        populacao,
        moeda,
        moedaSimbolo,
        idioma
      );
    })
    .catch(() => {
      if (nomePais.length === 0) {
        resultado.innerHTML = `<h3>O campo de entrada não pode ficar vazio!</h3>`;
      } else {
        resultado.innerHTML = `<h3>Insira o nome de um país válido.</h3>`;
      }
    });
});

function dadosPais(
  nomeBR,
  img,
  capital,
  continente,
  populacao,
  moeda,
  moedaSimbolo,
  idioma
) {
  resultado.innerHTML = `
    <img src="${img}" alt="" class="bandeira"/>
        <h2>${nomeBR}</h2>
        <section class="box">
          <section class="data-box">
            <h4>Capital:</h4>
            <span>${capital}</span>
          </section>
          <section class="data-box">
            <h4>Continente:</h4>
            <span>${continente}</span>
          </section>
          <section class="data-box">
            <h4>População:</h4>
            <span>${populacao}</span>
          </section>
          <section class="data-box">
            <h4>Moeda:</h4>
            <span>${moeda} - ${moedaSimbolo}</span>
          </section>
          <section class="data-box">
            <h4>Idioma:</h4>
            <span>${idioma}</span>
          </section>
        </section>
    `;
}
