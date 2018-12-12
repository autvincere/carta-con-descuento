function app() {

     //CONSTANTES
     // cartas
     const cardOne = 'one'
     const cardTwo = 'two'
     const cardThree = 'three'
     const cardFour = 'four'
     const cardFive = 'five'
     const cardSix = 'six'

     // cartas
     const campoRut = document.querySelector('input[name=rut]');
     const enviar = document.querySelector('#enviar');
     const carta = document.getElementsByClassName('card');
     const form = document.querySelector('form');


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
                    form.classList.add("hide");
               }

               //console.log(approved);
               let promoUno = approved.map(usuario => usuario.promocion01)
               let promoDos = approved.map(usuario => usuario.promocion02)
               let promoTres = approved.map(usuario => usuario.promocion03)
               //let promoDos = approved.map(usuario => usuario.promocion02.porcentaje_descuento)
               //console.log(promoUno[0].img);

               const values = [promoUno, promoDos, promoTres];
               const valueToUse = values[Math.floor(Math.random() * values.length)];
               // do something with the selected value
               //console.log(valueToUse[0].img);

               const positions = [cardOne, cardTwo, cardThree, cardFour, cardFive, cardSix];
               const positionToUse = positions[Math.floor(Math.random() * positions.length)];
               //console.log(positionToUse);

               let productos =
                    `
          <img class="imagen-producto absolute" src="${valueToUse[0].img}" alt="${valueToUse[0].productos}">
          <h2 class="absolute">${valueToUse[0].porcentaje_descuento}</h2>
          <h4 class="absolute">${valueToUse[0].productos}</h4>
          <h5 class="absolute">${valueToUse[0].codigo_promocion}</h5>
          `

               // const img =
               // const codigo =
               const resultado = document.getElementById(positionToUse).lastElementChild.innerHTML = productos;
               //console.log(resultado);

               //TEMPLATES
               const modal = `
               <div class="modal">
                    <button class="close" type="button">X</button>
                    <h2>¡Felicitaciones!</h2>
                    <h4>Ganaste un:</h4>
                    <img class="imagen-producto" src="${valueToUse[0].img}" alt="${valueToUse[0].productos}">
                    <h3>${valueToUse[0].porcentaje_descuento}</h3>
                    <h4>${valueToUse[0].productos}</h4>
                    <h5>${valueToUse[0].codigo_promocion}</h5>
               </div>
               `

               for (i = 0; i < carta.length; i++) {
                    carta[i].addEventListener("click", rotar);
               }

               let counter = 0;

               function rotar(e) {
                    e.preventDefault();

                    counter++;
                    this.classList += " rotate";

                    let idClickeado = e.target.parentNode.getAttribute("id");
                    //console.log(idClickeado);

                    //const detectId= e.target.nextSibling.nextElementSibling.firstChild;

                    if (counter == 5) {
                         console.log('acabaste tus oportunidades');
                    }

                    if (idClickeado != positionToUse) {
                         setTimeout(function () {
                              // counter ++
                              document.getElementById(idClickeado).classList += " desrotate";
                              console.log('desrotar');
                         }, 2000);
                    } else {
                         console.log('ganaste');
                         setTimeout(function () {
                              container.innerHTML += modal;
                              const close = document.querySelector('.close');
                              close.addEventListener("click", resetApp);
                         }, 1000);

                         
                    }
                   
               }
              
          }
         

     }
     function resetApp() {
          console.log('retornar');
          container.innerHTML = '';
          //document.innerHTML += formulario;
          form.classList.remove("hide");
          campoRut.value ='';
          // form.value = '';
     }
}

app();