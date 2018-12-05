var cartas = 3;
var intentos = 4;
let contDatos = document.querySelector('#datos');
const campoRut = document.querySelector('input[name=rut]');

// cartas
const cardOne = 'one'
const cardTwo = 'two'
const cardThree = 'three'
const cardFour = 'four'
const cardFive = 'five'
const cardSix = 'six'

const enviar = document.querySelector('#enviar');
enviar.addEventListener("click", detectRut);

function detectRut(e) {
     e.preventDefault();

     let rutFinal = campoRut.value;
     console.log(rutFinal);

     let url = 'clientes.json';

     fetch(url)
          .then(res => res.json())
          .then(datos =>
               //console.log(datos)
               traerDatos(datos)
               //traerPromociones(datos)
          );

     function traerDatos(datos) {

          let approved = datos.filter(
               user => user.rut == rutFinal
          ); // DEVUELVE EL ARRAY DONDE ESTA EL DATO FILTRADO

          if (approved < 1) {
               console.log('porfavor ingresa un rut valido')

          } else {
               console.log('Tu Rut es valido')
               container.innerHTML = templateCartas;

          }
          //console.log(approved);
          let promoUno = approved.map(usuario => usuario.promocion01.porcentaje_descuento)
          let promoDos = approved.map(usuario => usuario.promocion02.porcentaje_descuento)
          let promoTres = approved.map(usuario => usuario.promocion03.porcentaje_descuento)
          //console.log(promoUno);

          var values = [promoUno, promoDos, promoTres];
          var valueToUse = values[Math.floor(Math.random() * values.length)];
          // do something with the selected value
          valueToUse;
          //console.log(valueToUse);

          var positions = [cardOne, cardTwo, cardThree, cardFour, cardFive, cardSix];
          var positionToUse = positions[Math.floor(Math.random() * positions.length)];

          //console.log(positionToUse);

          var resultado = document.getElementById(positionToUse).innerHTML = valueToUse;
          resultado;
          console.log(resultado);

     }

}