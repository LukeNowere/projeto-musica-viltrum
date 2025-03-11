// Seleciona os elementos do DOM
const botaoMusica = document.getElementById('play_btn');
const musica = new Audio(); // Cria um objeto Audio para tocar a música

let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');

// Seleciona os elementos do carrossel
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

// Adiciona o primeiro item do carrossel ao final da lista para criar a animação de loop
thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);

// Define o tempo de duração da animação e o tempo de espera para o próximo slide automático
let timeRunning = 30000; // Tempo da animação (em milissegundos)
let timeAutonext = 90000; // Tempo de espera para o próximo slide automático (em milissegundos)

// Array de músicas (cada objeto representa uma música e o slide correspondente)
const musicas = [
    { slide: 0, caminho: 'invincible-theme.mp3' },
    { slide: 1, caminho: 'omni-man-theme.mp3' },
    { slide: 2, caminho: 'anissa-theme.mp3' },
    { slide: 3, caminho: 'conquest-theme.mp3' },
    { slide: 4, caminho: 'thragg.mp3' },
    
];

// Define o índice do slide atual (começando do 0)
let slideIndex = 0;

// Função para controlar a reprodução da música
function toggleMusica() {
    const musicaAtual = musicas[slideIndex];
    if (musicaAtual) {
        musica.src = musicaAtual.caminho; // Define a fonte da música
    }

    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
}

// Adiciona o evento de clique ao botão de música
botaoMusica.addEventListener("click", toggleMusica);

// Eventos para os botões "next" e "prev"
nextDom.onclick = function () {
    showSlider('next');
};
prevDom.onclick = function () {
    showSlider('prev');
};

// Define o tempo de espera para o próximo slide automático
let runTimeOut;
let runNextAuto = setTimeout(() => {
    nextDom.click();
}, timeAutonext);

// Função para mostrar o próximo ou o slide anterior
function showSlider(type) {
    let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if (type === "next") {
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
        slideIndex++; // Incrementa o índice do slide atual
    } else {
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
        slideIndex--; // Decrementa o índice do slide atual
    }

    // Toca a música correspondente ao slide atual
    const musicaAtual = musicas[slideIndex];
    if (musicaAtual) {
        musica.src = musicaAtual.caminho;
        if (musica.paused) {
            musica.play();
        }
    }

    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next', 'prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextDom.click();
    }, timeAutonext);
}

