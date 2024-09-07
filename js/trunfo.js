var btn = document.getElementById("btn_battle");

function btn_poke() {

    let pokemonMaquina = {}
    let pokemonJogador = {}

    function gerarPokemon(numeroAleatorio) {
        // Retorna a promessa do `fetch`
        return fetch(`https://pokeapi.co/api/v2/pokemon/${numeroAleatorio}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                // Retorna os dados do Pokémon como um objeto
                return {
                    nome: data.name,
                    tipos: data.types.map(typeInfo => typeInfo.type.name).join(" / "),
                    vida: data.stats.find(stat => stat.stat.name === "hp").base_stat,
                    forca: data.stats.find(stat => stat.stat.name === "attack").base_stat,
                    defesa: data.stats.find(stat => stat.stat.name === "defense").base_stat,
                    velocidade: data.stats.find(stat => stat.stat.name === "speed").base_stat

                };
            })
            .catch((erro) => {
                console.log("Erro ao buscar o Pokémon: " + erro);
                return null; // Retorna null caso haja erro
            });
    }

    // Gera números aleatórios entre 1 e 1025
    const numeroJogador = Math.floor(Math.random() * 1025) + 1;
    const numeroMaquina = Math.floor(Math.random() * 1025) + 1;

    // Chama a função para buscar os dois Pokémons e armazena os dados em variáveis
    gerarPokemon(numeroJogador).then((pokemonJogador) => {
        if (pokemonJogador) {
            console.log("Pokémon do Jogador: ", pokemonJogador);
        }
    });

    gerarPokemon(numeroMaquina).then((pokemonMaquina) => {
        if (pokemonMaquina) {
            console.log("Pokémon da Máquina: ", pokemonMaquina);
            // acessando os atributos
            alert("A defesa da máquina eh: " + pokemonMaquina.defesa)
        }
    });

}

// Adiciona o evento ao clicar no botão
btn.onclick = btn_poke;
