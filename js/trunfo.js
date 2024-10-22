function iniciarBatalha() {

    document.getElementById("btn").style.display = "none";

    document.getElementById("hp").textContent = "vida";
    document.getElementById("force").textContent = "Forca";
    document.getElementById("defesa").textContent = "Defesa";
    document.getElementById("speed").textContent = "velocidade";



    btn_poke();
}

function btn_poke() {
    var disputaInicial = Math.floor(Math.random() * 2) + 1;

    if (disputaInicial === 1) {
        alert("A disputa iniciará com você !!!!");
    } else {
        alert("A disputa iniciará com a máquina !!!!");
        alert("A máquina irá escolher o atributo que iniciará a disputa !!!");
    }

    function gerarPokemon(numeroAleatorio) {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${numeroAleatorio}`)
            .then((response) => response.json())
            .then((data) => {
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
                return null;
            });
    }

    const numeroJogador = Math.floor(Math.random() * 1025) + 1;
    const numeroMaquina = Math.floor(Math.random() * 1025) + 1;

    let atributoEscolhido = null;

   
    function compararAtributos(pokemonJogador, pokemonMaquina, atributo) {
        let valorJogador = pokemonJogador[atributo];
        let valorMaquina = pokemonMaquina[atributo];

        if (valorJogador > valorMaquina) {
            alert(`Você venceu! Seu ${pokemonJogador.nome} tem ${valorJogador} em ${atributo}, enquanto o ${pokemonMaquina.nome} da máquina tem ${valorMaquina}.`);
        } else if (valorJogador < valorMaquina) {
            alert(`Você perdeu! O ${pokemonMaquina.nome} da máquina tem ${valorMaquina} em ${atributo}, enquanto seu ${pokemonJogador.nome} tem ${valorJogador}.`);
        } else {
            alert("Empate! Ambos têm o mesmo valor de " + valorJogador + " em " + atributo);
        }
    }

 
    function exibirDetalhesPokemon(pokemon, jogador) {
        if (jogador === 'jogador') {
        
        document.getElementById("txt_title").textContent = `What will ${pokemon.nome} do?`;
        document.getElementById("hp_pts").textContent = pokemon.vida;
        document.getElementById("force_pts").textContent = pokemon.forca;
        document.getElementById("defesa_pts").textContent = pokemon.defesa;
        document.getElementById("speed_pts").textContent = pokemon.velocidade;
    }
    }

  
    Promise.all([gerarPokemon(numeroJogador), gerarPokemon(numeroMaquina)]).then(([pokemonJogador, pokemonMaquina]) => {
        if (pokemonJogador && pokemonMaquina) {
         
            exibirDetalhesPokemon(pokemonJogador, 'jogador');

           
            exibirDetalhesPokemon(pokemonMaquina, 'maquina');

            
            setTimeout(() => {
                if (disputaInicial === 1) {
                    
                    atributoEscolhido = prompt("Escolha o atributo: vida, forca, defesa, velocidade");
                } else {
                    
                    const atributos = ["vida", "forca", "defesa", "velocidade"];
                    atributoEscolhido = atributos[Math.floor(Math.random() * atributos.length)];
                    alert(`A máquina escolheu o atributo ${atributoEscolhido}`);
                }

                
                compararAtributos(pokemonJogador, pokemonMaquina, atributoEscolhido);
            }, 1000); 
        }
    }).catch((erro) => {
        console.log("Erro ao carregar Pokémons: ", erro);
    });
}