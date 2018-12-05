const intentos = 4;
const numCartas = 6;
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
     //console.log(rutFinal);

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
               //console.log('Tu Rut es valido')
               container.innerHTML = templateCartas;
          }

          //REDUCIR TEMPLATE CARTAS
          // for (let index = 0; index < numCartas.length; index++) {
          //      const element = numCartas[index];
               
          // }


          //console.log(approved);
          let promoUno = approved.map(usuario => usuario.promocion01)
          let promoDos = approved.map(usuario => usuario.promocion02)
          let promoTres = approved.map(usuario => usuario.promocion03)
          //let promoDos = approved.map(usuario => usuario.promocion02.porcentaje_descuento)
          //console.log(promoUno[0].img);

          const values = [promoUno, promoDos, promoTres];
          const valueToUse = values[Math.floor(Math.random() * values.length)];
          // do something with the selected value
          console.log(valueToUse[0].img);

          const positions = [cardOne, cardTwo, cardThree, cardFour, cardFive, cardSix];
          const positionToUse = positions[Math.floor(Math.random() * positions.length)];
          //console.log(positionToUse);


          let productos = 
          `<img class="imagen-producto" src="${valueToUse[0].img}" alt="${valueToUse[0].productos}">
          <h2>${valueToUse[0].porcentaje_descuento}</h2>
          <h4>${valueToUse[0].productos}</h4>
          <h5>${valueToUse[0].codigo_promocion}</h5>
          `

          
          // const img =
          // const codigo =
           const resultado = document.getElementById(positionToUse).innerHTML = productos;

          
          //console.log(resultado);

     }

}