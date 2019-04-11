var config = {
    apiKey: "AIzaSyB2U-tcoXJBfByTsDlwrGncRGP0I0L9j3Y",
    authDomain: "maril-d27bf.firebaseapp.com",
    databaseURL: "https://maril-d27bf.firebaseio.com",
    projectId: "maril-d27bf",
    storageBucket: "maril-d27bf.appspot.com",
    messagingSenderId: "955449389554"
};
firebase.initializeApp(config);
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
var base = $("#base").text();
$(document).ready(function(){
    M.AutoInit();
    $('.modal').modal({
      startingTop: '0%',
      endingTop: '0%'
    });
    
    $('#modal1').modal({
      startingTop: '0%',
      endingTop: '0%',
      onOpenEnd: function() { 
      monSlider = Object.create(Slider)
      monSlider.init();
      imgIndex =0;
       }
    });
});
Vue.component('product-card', {
    // declara las propiedades
    props: ['img','title','price','about','id'],
    // como 'data', las propiedades pueden ser utilizadas dentro de las
    // plantillas y está disponibles en la vm como this.message
    template: `
    <div :id="id" class="card" >
        <div class="card-image">
        <img class="modal-trigger" :src="img[0].url" href="#modal1" v-on:click="detalles">
        </div>
        <div class="card-content modal-trigger" href="#modal1" v-on:click="detalles">
        <span class="card-title black-text ">{{ title }}</span>
        <h6 class="green-text">$`+`{{ price }}</h6>
        <p class="truncate">{{ about }}</p>
        </div>
    </div>`,
    methods:{
        detalles: function(){
            app._data.img = this.img;
            app._data.titulo = this.title;
            app._data.precio = this.price;
            app._data.descripcion = this.about;
            imgArray = this.img;
            imgIndex =0;
        }
    }
  });
  var app = new Vue({
    el: '#app',
    data: {
      productos:[],
      img:[],
      titulo:"",
      precio:"",
      descripcion:"",
      tmpimg:[]
    }
  });

db.collection(base).onSnapshot((querySnapshot) => {
    app._data.productos = [];
    querySnapshot.forEach((doc) => {
        app._data.productos.push({img: doc.data().imagen, title: doc.data().nombre, price: doc.data().precio, about: doc.data().descripcion, id:doc.id});
    });
});