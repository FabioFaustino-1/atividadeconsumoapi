async function buscarPokemon() {
  const nome = document.getElementById("pokemonInput").value.toLowerCase();

  if (!nome) {
    alert("Digite um nome!");
    return;
  }

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);
    const data = await res.json();

    mostrarPokemon(data);
  } catch {
    document.getElementById("card").innerHTML = "<p>Pokémon não encontrado 😢</p>";
  }
}

async function pokemonAleatorio() {
  const id = Math.floor(Math.random() * 151) + 1;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();

  mostrarPokemon(data);
}

function mostrarPokemon(data) {
  const nome = data.name;
  const imagem = data.sprites.front_default;
  const tipo = data.types[0].type.name;

  document.getElementById("card").innerHTML = `
    <h2>${nome.toUpperCase()}</h2>
    <img src="${imagem}" />
    <p>Tipo: ${tipo}</p>
  `;
}
