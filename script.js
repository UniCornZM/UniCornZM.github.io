const textArea = document.querySelector(".text-area");//Entonces aqui se coloca el nombre de la clase del archivo que quiero capturar
const mensaje = document.querySelector(".mensaje");
const matrizCodigo = [["em", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
//Cuando iniciamos el programa, ningun campo estará seleccionado
let t1=false;
let t2 = false;
let t3 = true;

//una posible solucion de la profe es: almacenar todas las llaves de encriptacion dentro de una matriz y trabajar con arroz multidimensionales (arreglos de arreglos)



function btnEncriptar() {

    const textoEncriptado = encriptar(textArea.value);//llamamos a la funcion encriptar y le enviamos el valor que el usuario digito en textArea

    if (textoEncriptado === 0) {
        alert("Ingrese texto o ingrese texto sin tilde ni caracter especial");
    }
    else if (textoEncriptado === 10) {
        alert("Por favor ingrese texto en el campo 1");
    }
    else {
        mensaje.value = textoEncriptado;//Enviamos el textoencriptado al campo de mensaje que fue definido en el encabezado.
        textArea.value = "";//quitamos el texto
        mensaje.style.backgroundImage = "none";//quitamos la imagen del candado cuando le demos en encriptar. 
    }

    
    
}


function encriptar(texto) {

    //implementar que no reciba caracteres especiales ni tildes
    
    texto = texto.toLowerCase();

    const format = /^[a-zA-Z0-9\s]+$/;
    /*La expresión regular utilizada es /^[a-zA-Z0-9\s]+$/ esta expresión regular busca valores que empiecen con cualquier caracter alfanumérico o espacio en blanco (a-zA-Z0-9\s) y que estén seguidos de uno o más caracteres alfanuméricos o espacio en blanco (+). El indicador ^ indica que la búsqueda debe comenzar al principio de la cadena y el indicador $ indica que debe finalizar al final de la cadena.*/

    console.log(Number(texto))

    //Si el usuario no ingresa texto y le da en encriptar:

    //al usar Number(texto) lo que hacemos es que comvertimos el string vacio en 0, entonces asi validamos que no haya campos ingresados.
    if (Number(texto) ===0) {
        console.log("ingrese texto")
        return 10;
    }

    else {
        if (!format.test(texto)) {
            //si el usuario ingreso un caracter especial, tilde o algo no admitido
            return 0;
        }
        else {
            //Si el usuario ingreso un texto valido, entonces encriptamos
            for (let i = 0; i < matrizCodigo.length; i++) {//Recorro la matriz

                //vamos a verificar las letras ingresadas. Este metodo me valida si el texto que ingreso el usuario me incluye la posicion 0 de cada elelmento de la matriz, con ello lo que hacemos es que validamos para cambiar el caracter.
                if (texto.includes(matrizCodigo[i][0])) {
                    //como esta en el texto, vamos a reemplazar

                    //el replaceAll(1,2) me cambia todos los caracteres.Entonces en 1 va lo que vamos a sustituir y en 2 colocamos por cual valor vamos a sustuir. 
                    texto = texto.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1])

                }
            }
            return texto;
            
        }
    }
   
}


function desencriptar(textoEncriptado) {

    for (let i = 0; i < matrizCodigo.length; i++){

        //Si incluye la palabra, vamos a cambiarla
        if (textoEncriptado.includes(matrizCodigo[i][1])) {

            textoEncriptado = textoEncriptado.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0])
            
        }
    }

    return textoEncriptado;
}


function btnDesencriptar() {
    
    const textoDesencriptado = desencriptar(textArea.value)
    mensaje.value = textoDesencriptado;
    textArea.value = "";//quitamos el texto
    mensaje.style.backgroundImage = "none";//quitamos la imagen del candado cuando le demos en encriptar. 
}


async function copiar() {
    //definimos si el usuario tiene el cursor en el texto1 o texto2.
    //si dio clic en copiar, dejamos los dos campos en false y verdadero el t3 (que es el que simula al darle clic fuera de los recuadros) con ello cuando le damos copiar y si no hemos seleccionado el texto que queremos copiar, nos da un mensaje

    
    if (t1 === true) {
        console.log(textArea.value)
        if (Number(textArea.value) === 0) {
            alert("Primero seleccione campo o ingrese texto en el campo 1 o 2");
        }
        else {
            await navigator.clipboard.writeText(textArea.value);
            console.log("texto a copiar: ", textArea.value);
            document.querySelector(".texto-copiar").innerHTML = "Campo 1 copiado"//el iinerHTML me ayuda a escribir un valor en el html.
            mostrarMensaje();
            setTimeout(apagarTextoCopiar, 3000);//apago el texto copiar cuando le doy click.
        }
        
    }
    else if (t2 === true) {
        if (Number(mensaje.value) === 0) {
            alert("Primero seleccione campo o ingrese texto en el campo 1 o 2");
        }
        else {
            await navigator.clipboard.writeText(mensaje.value);
            console.log("texto a copiar: ", mensaje.value);
            document.querySelector(".texto-copiar").innerHTML = "Campo 2 copiado";//el iinerHTML me ayuda a escribir un valor en el html.
            mostrarMensaje();
            setTimeout(apagarTextoCopiar, 3000)//apago el texto copiar cuando le doy click.
        }

    }
    
    else if (t3 === true) {
        document.querySelector(".texto-copiar").innerHTML = "Seleccione un campo para copiar"//el iinerHTML me ayuda a escribir un valor en el html.
        document.querySelector(".texto-copiar").style.background = "#bd5656";
        document.querySelector(".texto-copiar").style.opacity = 1//para que cuando le de click en copiar, salga el texto de copiado
        setTimeout(apagarTextoCopiar, 3000);//apago el texto copiar cuando le doy click.
        //alert("Seleccione por favor cual campo quiere copiar")
    }      

    
}

function apagarTextoCopiar() {
    document.querySelector(".texto-copiar").style.opacity = 0
}

//esto nos toma a donde esta el cursor puesto antes de que el usuario le de click en copiar
textArea.onfocus = function () {
    t1 = true;
    t2 = false;
}

mensaje.onfocus = function () {
    t1 = false;
    t2 = true;
}


function mostrarMensaje() {
    t3 = true; t1 = false; t2 = false;
    
    document.querySelector(".texto-copiar").style.background = "#03989e";
    document.querySelector(".texto-copiar").style.opacity = 1;
}