// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

let voz = document.getElementById("voz");
let texto = document.getElementById("texto");
let button = document.getElementById("btn-converter");
let vozSelecionada = 0;
let contador = document.getElementById('contador');
var quantidadeCaracteres = 762;
texto.innerHTML = "";
contador.innerHTML = quantidadeCaracteres;

window.speechSynthesis.addEventListener("voiceschanged", () => {
    let vozes = window.speechSynthesis.getVoices();
    if (vozes.length < 1) {
        voz.disabled = true;
        button.disabled = true;
        let span = document.createElement("span");
        span.classList.add("text-danger");
        span.innerHTML = "Navegador incompatível"
        button.parentElement.appendChild(span)
    }
    for (let i in vozes) {
        let option = document.createElement("option");
        option.setAttribute("value", i);
        option.innerHTML = vozes[i].name;
        voz.appendChild(option);
    }
})

button.addEventListener("click", () => {
    if (texto.value != "") {
        if (button.innerHTML == "Cancelar") {
            window.speechSynthesis.cancel();
        } else {
            console.log(button)
            let utterance = new SpeechSynthesisUtterance(texto.value)
            let vozes = window.speechSynthesis.getVoices();

            utterance.voice = vozes[vozSelecionada]
            window.speechSynthesis.speak(utterance)
        }
    }
})

voz.addEventListener("change", () => {
    vozSelecionada = voz.value;
})

setInterval(verificarAudio, 500)

function verificarAudio() {
    if (window.speechSynthesis.speaking) {
        voz.disabled = true;
        button.innerHTML = "Cancelar"
        button.classList.remove("btn-primary")
        button.classList.add("btn-danger")
    } else {
        voz.disabled = false;
        button.innerHTML = "Converter"
        button.classList.remove("btn-danger")
        button.classList.add("btn-primary")
    }
}

texto.addEventListener("keyup", function (e) {
    var total = texto.value.length;
    if (total <= quantidadeCaracteres) {
        var resto = quantidadeCaracteres - total;
        contador.innerHTML = resto;
    } else {
        texto.value = texto.value.substr(0, quantidadeCaracteres);
    }
})
