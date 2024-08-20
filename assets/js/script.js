function definirClave() {
    let numero1 = Math.floor(Math.random() * 6);  
    let numero2 = Math.floor(Math.random() * 5); 
    let suma = `${numero1} + ${numero2}`; 
    document.getElementById("clave").innerHTML = suma;
    return numero1 + numero2;
};
let clave =  definirClave(); 

function mensajeEncriptado() {
    let texto1 = document.getElementById("texto1").value;
    let arrTexto1 = Array.from(texto1); 
    let textocambiado = ""; 
    console.log(texto1);
    for (let i = 0; i < arrTexto1.length; i++) {
        let defCaracter = arrTexto1[i].charCodeAt(0); 
        //console.log(defCaracter);
        if(defCaracter >= 65 && defCaracter <= 90){
            textocambiado += String.fromCharCode(((defCaracter - 65 + clave)% 26)+65); 
        } else if (defCaracter >= 97  && defCaracter <=122){
            textocambiado += String.fromCharCode(((defCaracter - 97 + clave)% 26)+97);
        } else {
            textocambiado += arrTexto1[i]; 
        }
        
    }
    document.getElementById("texto2").value = textocambiado;
    //return textocambiado; 
};

function mensajeDesencriptado() {
    let texto1 = document.getElementById("texto1").value;
    let arrTexto1 = Array.from(texto1); 
    let textocambiado = "";
    for (let i = 0; i < arrTexto1.length; i++) {
        let defCaracter = arrTexto1[i].charCodeAt(0); 
        if(defCaracter >= 65 && defCaracter <= 90){
            textocambiado += String.fromCharCode(((defCaracter - 65 - clave +26)% 26)+65); 
        } else if (defCaracter >= 97  && defCaracter <=122){
            textocambiado += String.fromCharCode(((defCaracter - 97 - clave + 26)% 26)+97);
        } else {
            textocambiado += arrTexto1[i]; 
        }
        
    }
    document.getElementById("texto2").value = textocambiado;
};
function validarResultado() {
    let usuarioResultado = parseInt(document.getElementById("resultadoClave").value);
    let TEXTO1 = document.getElementById("texto1").value; 
    let TEXTO2 = document.getElementById("texto2").value;
    let encriptar = document.getElementById("encriptar");
    let desencriptar = document.getElementById("desencriptar");

    if ((usuarioResultado == clave && /^[a-zA-Z\s]+$/.test(TEXTO1)) ){
        encriptar.disabled = false; 
        desencriptar.disabled = false;
    } else {
        encriptar.disabled = true;
        desencriptar.disabled = true;
    }
};

let T1 = document.getElementById("texto1"); 
T1.addEventListener("input",function () {//se ejecuta cada que vez que el usuario modifca texto1
    validarResultado(); 
});
let RS = document.getElementById("resultadoClave"); 
RS.addEventListener("input",function () {
    validarResultado(); 
});
let encriptar = document.getElementById("encriptar");//boton encriptar
encriptar.addEventListener("click", function () {//se ejecuta cuando hagamos click en encrpiptar
    mensajeEncriptado(); 
    document.getElementById("texto1").value = "";
    encriptar.disabled = true;
    desencriptar.disabled = true;
});

let copiar = document.getElementById("copiar");
copiar.addEventListener("click", function () {
    let textoEncriptado = document.getElementById("texto2").value; 
    navigator.clipboard.writeText(textoEncriptado); 
    document.getElementById("texto1").value = "";
    document.getElementById("texto2").value = "";
    encriptar.disabled = true;
    desencriptar.disabled = true;
});

let desencriptar = document.getElementById("desencriptar");  
desencriptar.addEventListener("click", function () {
    mensajeDesencriptado(); 
    document.getElementById("texto1").value = "";
    desencriptar.disabled = true;
    encriptar.disabled = true;
});

let T2 = document.getElementById("texto2"); 

if(T1.value == "" &&  RS.value == ""  &&  T2.value == ""){
    encriptar.disabled = true;
    desencriptar.disabled = true;
}