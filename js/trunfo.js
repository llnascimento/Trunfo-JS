

function btn_poke() {

    var disputaInicial = Math.floor(Math.random() * 2) + 1;

    if (disputaInicial === 1) {
        alert("A disputa iniciará com o jogador 1 (você)");
        alert("Escolha o atributo que iniciará a disputa");
    }

    else {
        alert("A disputa iniciará com o jogador 2 (máquina)");
        alert("A máquina irá escolher o atributo que iniciará a disputa");
    }

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
                    tipo: data.types.map(typeInfo => typeInfo.type.name).join(" / "),
                    vida: data.stats.find(stat => stat.stat.name === "hp").base_stat,
                    forca: data.stats.find(stat => stat.stat.name === "attack").base_stat,
                    defesa: data.stats.find(stat => stat.stat.name === "defense").base_stat,
                    velocidade: data.stats.find(stat => stat.stat.name === "speed").base_stat,
                    imagem: data.sprites.front_default

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
            //Irá exibir os atributos do pokemon
            document.getElementById("info_name_jogador").textContent = pokemonJogador.nome
            document.getElementById("info_tipo_jogador").textContent = pokemonJogador.tipo
            document.getElementById("info_vida_jogador").textContent = pokemonJogador.vida
            document.getElementById("info_forca_jogador").textContent = pokemonJogador.forca
            document.getElementById("info_defesa_jogador").textContent = pokemonJogador.defesa
            document.getElementById("info_velocidade_jogador").textContent = pokemonJogador.velocidade
            // Exibe a imagem do Pokémon
            document.getElementById("imgJogador").src = pokemonJogador.imagem;
        }
    });

    gerarPokemon(numeroMaquina).then((pokemonMaquina) => {
        if (pokemonMaquina) {
            console.log("Pokémon da Máquina: ", pokemonMaquina);
             //Irá exibir os atributos do pokemon
             document.getElementById("info_name_maquina").textContent = pokemonMaquina.nome
             document.getElementById("info_tipo_maquina").textContent = pokemonMaquina.tipo
             document.getElementById("info_vida_maquina").textContent = pokemonMaquina.vida
             document.getElementById("info_forca_maquina").textContent = pokemonMaquina.forca
             document.getElementById("info_defesa_maquina").textContent = pokemonMaquina.defesa
             document.getElementById("info_velocidade_maquina").textContent = pokemonMaquina.velocidade
             // Exibe a imagem do Pokémon
            document.getElementById("imgMaquina").src = pokemonMaquina.imagem;

        }
    });


    /* 

   
    */
}

