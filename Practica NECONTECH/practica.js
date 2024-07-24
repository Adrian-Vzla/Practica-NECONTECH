var input = document.querySelector('input[name="arreglo"]');
var arregloNumeros = [];
var contador = {}; //Aqui se guardan las veces que se repite el numero

function RegistrarNumero(){
    //Convierte el string del input a un numero para poder compararlo
    var numero = Number(input.value);
    console.log(numero)
    //Verifica si es un entero
    if (Number.isInteger(numero)) {
        //Verifica que no sea negativo y que no sea mas de 1 digito.
        if (numero < 10 && numero >= 0) {
            arregloNumeros.push(numero);
        } else {
            alert('No se aceptan numeros de mas de 1 digito ni numeros negativos');
        }
    } else {
        alert('Por favor digite un número entero');
    }
    console.log(arregloNumeros);
    actualizarLista();
    input.value = "";
}

function actualizarLista() {
    var labelLista = document.querySelector('#listaNumeros');
    labelLista.textContent = arregloNumeros.join(', ');

    var numeroMasRepetido = calcularNumeroRepetido(arregloNumeros);
    var labelNumeroRepetido = document.querySelector('#numeroRepetido');
    labelNumeroRepetido.textContent = numeroMasRepetido !== null ? numeroMasRepetido: 'No hay numeros repetidos';
}

function calcularNumeroRepetido(arreglo) {
    contador = {};
    var maxFrecuencia = 0;
    var numeroMasRepetido = null;
    var posiciones = {};

    //Se calcula la frecuencia y las posiciones de cada numero
    arreglo.forEach(function(numero, indice) {
        if (!contador[numero]) {
            contador[numero] = 0;
            posiciones[numero] = [];
        }
        contador[numero]++;
        posiciones[numero].push(indice);
        if (contador[numero] > maxFrecuencia) {
            maxFrecuencia = contador[numero];
        }
    });

    //Encuentra los numeros con la mayor frecuencia
    var numerosPosibles = [];
    for (var numero in contador) {
        if (contador[numero] === maxFrecuencia && maxFrecuencia > 1) {
            numerosPosibles.push(numero);
        }
    }

    //Si no hay números repetidos
    if (numerosPosibles.length === 0) {
        return null;
    }

    //En caso de haber un solo numero posible que se repita mas, pasará a ser el numero mas repetido
    if (numerosPosibles.length === 1) {
        numeroMasRepetido = numerosPosibles[0];
    } else {
        //En caso de haber varios numeros posibles se elegira el que tenga menos distancia entre ellos
        var menorDistanciaPromedio =  Infinity;
        var candidatosNumPosib = [];

        numerosPosibles.forEach(function(numero) {
            var distancias = [];
            for (var indice = 1; indice < posiciones[numero].length; indice++) {
                distancias.push(posiciones[numero][indice] - posiciones[numero][indice - 1]);
            }
            var distanciaPromedio = distancias.reduce((a, b) => a + b, 0) / distancias.length;

            if (distanciaPromedio < menorDistanciaPromedio) {
                menorDistanciaPromedio = distanciaPromedio;
                candidatosNumPosib = [numero];
            } 
            else if (distanciaPromedio === menorDistanciaPromedio) {
                candidatosNumPosib.push(numero);
            }
        });

        // En caso de concidir en la misma distancia y la misma cantidad se elige el del inico del arreglo
        if (candidatosNumPosib.length === 1) {
            numeroMasRepetido = candidatosNumPosib[0];
        } else {
            var posicionMasCercana = Infinity;
            candidatosNumPosib.forEach(function(numero) {
                var primeraPosicion = posiciones[numero][0];
                if (primeraPosicion < posicionMasCercana) {
                    posicionMasCercana = primeraPosicion;
                    numeroMasRepetido = numero;
                }
            });
        }
    }
    return numeroMasRepetido;
}