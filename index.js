const { createApp } = Vue

createApp({
    data() {
    return {
        peliculas: "",
        filtro: "",
        texto: "",
        pagina: 0,
        peticionAjax: false,
        detallesPelicula: false,
        detalles: ""
    }
    },
    methods: {
        nuevaEntrada(){
            if(this.pagina == 0){
                this.pagina = 1;
                this.peliculas = "";
            }
            this.peticionAjax = true;

            axios 
            .get(`https://www.omdbapi.com/?apikey=e5e01699&s=${this.filtro}&page=${this.pagina}`)
            .then((response) => {
                if(response.data.Response == "True"){
                    if(this.peliculas === ""){
                        this.peliculas = response.data.Search;
                    }else{
                        this.peliculas = this.peliculas.concat(response.data.Search);
                    }
                    this.peticionAjax = false;
                }else{
                    this.peticionAjax = false;
                }
            })
            .catch((error) => {
                console.log(error);
            });
            this.pagina++;
        },

        eventScroll(){
            if(window.scrollY + window.innerHeight >= document.body.offsetHeight){
                this.nuevaEntrada();
            }
        },

        informacionPelicula(id){
            axios
            .get(`https://www.omdbapi.com/?apikey=e5e01699&i=${id}`)
            .then((response) => {
                this.detalles = response.data;
            })
            .catch((error) => {
                console.log(error);
            });
            this.detallesPelicula = !this.detallesPelicula;
        },
        
        cerrarDetalles(){
            this.detallesPelicula = !this.detallesPelicula;
        }
        
    },
    computed:{
       
    },
    watch:{
        filtro(){
            this.pagina = 0;
        }
    },
    mounted(){
       window.addEventListener("scroll", this.eventScroll)
    }
}).mount('#app')



















// window.onload = () => {
//     document.getElementById("boton").addEventListener("click", nuevaPagina);

//     document.getElementById("titulo").addEventListener("keyup", function(event) {
//         if (event.keyCode === 13) {
//             event.preventDefault();
//             document.getElementById("boton").click();
//         }
//     }
//     );
// };

// window.addEventListener("scroll", () => {
//     if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight -5){
//         lanzaPeticion();
//     }
// });


// var httpRequest;
// var page = 1;
// var peticion = false;

// function lanzaPeticion(){

//    if(peticion==false){

//         peticion = true;
//         httpRequest = new XMLHttpRequest();

//         httpRequest.open("GET", `https://www.omdbapi.com/?apikey=e5e01699&s=${document.getElementById("titulo").value}&page=${page}`);
//         httpRequest.onreadystatechange = trataRespuesta;
//         httpRequest.send();
//         page ++;
//    }
// }


// function nuevaPagina(){
//     document.getElementById("container").innerHTML = "";
//     lanzaPeticion();
// }


// function trataRespuesta(){
//     let container = document.getElementById("container");
//     if (httpRequest.readyState === XMLHttpRequest.DONE) {
//         if (httpRequest.status === 200) {
//             let respuesta = JSON.parse(httpRequest.responseText);
//             for(let i = 0; i < respuesta.Search.length; i++){
//                 let div = document.createElement("div");
//                 div.innerHTML = `<h2>`+respuesta.Search[i].Title+`</h2>` + `<br>`;
//                 div.innerHTML += `<img src="`+respuesta.Search[i].Poster+`">`;
//                 container.appendChild(div);
//                 peticion = false;
//             }
//         } else {
//           alert("There was a problem with the request.");
//         }
//     }
// }