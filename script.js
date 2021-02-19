let timeline = document.getElementById('timeline');
let tempoAtual = document.getElementById('atual');
let tempoTotal = document.getElementById('total');
let anterior = document.getElementById('anterior');
let botaoPlay = document.getElementById('play-pause');
let proxima = document.getElementById('proxima');
let nomeMusica = document.getElementById('nome-musica');
let nomeArtista = document.getElementById('nome-artista');
let capa = document.getElementById('capa');

let playlist = [
    "musicas/Mac Ayres - The Devil's in The Details.mp3",
    "musicas/H.E.R. - Going.mp3",
    "musicas/Ed Sheeran - She.mp3",
    "musicas/J_ust - Soft.mp3",
    "musicas/O Terno - O Bilhete.mp3"
];

let titulos = [
    "The Devil's in The Details",
    "Going",
    "She",
    "Soft",
    "O Bilhete"
];

let artistas = [
    "Mac Ayres",
    "H.E.R.",
    "Ed Sheeran",
    "J_ust",
    "O Terno",
];

let capas = [
    "imagens/macayres.png",
    "imagens/her.png",
    "imagens/edsheeran.png",
    "imagens/just.png",
    "imagens/oterno.png"
];

contagem = 0;
audio = new Audio();
audio.src = playlist[contagem];
audio.loop = false;

capa.src = capas[contagem];
nomeMusica.innerHTML = titulos[contagem];
nomeArtista.innerHTML = artistas[contagem];

botaoPlay.addEventListener("click", playPause);
proxima.addEventListener("click", proximaMusica);
anterior.addEventListener("click", musicaAnterior);
audio.addEventListener("timeupdate", atualizarContagem);

function playPause(){
    if(audio.paused){
        audio.play();
        botaoPlay.innerHTML = '<i class="fas fa-pause-circle fa-lg"></i>';
    }
    else{
        audio.pause();
        botaoPlay.innerHTML = '<i class="fas fa-play-circle fa-lg"></i>';
    }
}

function modificacoes(){
    nomeMusica.innerHTML = titulos[contagem];
    nomeArtista.innerHTML = artistas[contagem];
    capa.src = capas[contagem];
    botaoPlay.innerHTML = '<i class="fas fa-pause-circle fa-lg"></i>';
    audio.src = playlist[contagem];
    audio.play();
}

function proximaMusica(){
    contagem++;
    if(contagem > playlist.length - 1){
        contagem = 0
    }
    modificacoes();
}

function musicaAnterior(){
    contagem--;
    if(contagem < 0){
        contagem = playlist.length - 1;
    }
    modificacoes();
}


timeline.onchange = function(){
    timeline_position = audio.duration * (timeline.value / 100);
    audio.currentTime = timeline_position;
}

function atualizarContagem(){
    if(audio.duration){
        let reset = audio.currentTime * (100 / audio.duration);
        timeline.value = reset;
        var minutoAtual = Math.floor(audio.currentTime / 60);
        var segundoAtual = Math.floor(audio.currentTime - (minutoAtual * 60));
        var minutoTotal = Math.floor(audio.duration / 60);
        var segundoTotal = Math.floor(audio.duration - minutoTotal * 60);
        if(segundoAtual < 10){ segundoAtual = "0" + segundoAtual}
        if(segundoTotal < 10){ segundoTotal = "0" + segundoTotal}
        if(minutoAtual < 10){ minutoAtual = "0" + minutoAtual}
        if(minutoTotal < 10){ minutoTotal = "0" + minutoTotal}
        tempoAtual.innerHTML = minutoAtual + ":" + segundoAtual
        tempoTotal.innerHTML = minutoTotal + ":" + segundoTotal
    }
}
