
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js")
      .then(() => console.log("Service Worker registrado"))
      .catch(err => console.log(err));
  });
}

async function buscarPokemon() {
  const nome = document.getElementById("pokemonInput").value.toLowerCase();

  if (!nome) {
    alert("Digite um nome!");
    return;
  }

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);

    if (!res.ok) {
      throw new Error("Pokémon não encontrado");
    }

    const data = await res.json();
    mostrarPokemon(data);

  } catch (error) {
    console.error(error);
    document.getElementById("card").innerHTML = "<p>Pokémon não encontrado 😢</p>";
  }
}

async function pokemonAleatorio() {
  const id = Math.floor(Math.random() * 151) + 1;

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    mostrarPokemon(data);
  } catch (error) {
    console.error(error);
  }
}

async function usarCamera() {
  let video = document.getElementById("camera");

  if (!video) {
    video = document.createElement("video");
    video.id = "camera";
    document.body.appendChild(video);
  }

  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
  video.play();
}

function vibrar() {
  if (navigator.vibrate) {
    navigator.vibrate(200);
  }
}

function mostrarPokemon(data) {
  const nome = data.name;
  const imagem = data.sprites.front_default;
  const tipo = data.types[0].type.name;

  vibrar();

  document.getElementById("card").innerHTML = `
    <h2>${nome.toUpperCase()}</h2>
    <img src="${imagem}" alt="${nome}" />
    <p>Tipo: ${tipo}</p>
  `;
}
