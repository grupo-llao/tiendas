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
var imgArray,monSlider,imgsproducto = [];
var base = base = "Maril";
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
    $( "#toyashop" ).click(function() {
      $('#logo').attr('src',"img/toyashop.svg") ;
      $("#bar").removeClass( "brown" ).removeClass( "teal" ).addClass( "red" );
      $(".botones .dis").removeClass( "dis" );
      $(this).addClass( "dis" );
      $(".up").css("border-color", "#d50000");
      $("#modal1").removeClass( "browng" ).removeClass( "tealg" ).addClass( "redg" );
      base = "ToyaShop";
      db.collection("ToyaShop").onSnapshot((querySnapshot) => {
        app._data.productos = [];
        querySnapshot.forEach((doc) => {
            app._data.productos.push({img: doc.data().imagen, title: doc.data().nombre, price: doc.data().precio, about: doc.data().descripcion, id:doc.id});
        });
    });
  });
  $( "#todoenpalma" ).click(function() {
    $('#logo').attr('src',"img/todoenpalma.svg") ;
    $("#bar").removeClass( "teal" ).removeClass( "red" ).addClass( "brown" );
    $(".botones .dis").removeClass( "dis" );
      $(this).addClass( "dis" );
      $(".up").css("border-color", "#795548");
      $("#modal1").removeClass( "tealg" ).removeClass( "redg" ).addClass( "browng" );
      base = "TodoEnPalma";
    db.collection("TodoEnPalma").onSnapshot((querySnapshot) => {
      app._data.productos = [];
      querySnapshot.forEach((doc) => {
          app._data.productos.push({img: doc.data().imagen, title: doc.data().nombre, price: doc.data().precio, about: doc.data().descripcion, id:doc.id});
      });
  });
});


$( "#maril" ).click(function() {
  $('#logo').attr('src',"img/maril.svg") ;
  $("#bar").removeClass( "brown" ).removeClass( "red" ).addClass( "teal" );
  $(".botones .dis").removeClass( "dis" );
      $(this).addClass( "dis" );
      $(".up").css("border-color", "#00bfa5");
      $("#modal1").removeClass( "browng" ).removeClass( "redg" ).addClass( "tealg" );
      base = "Maril";
  db.collection("Maril").onSnapshot((querySnapshot) => {
    app._data.productos = [];
    querySnapshot.forEach((doc) => {
        app._data.productos.push({img: doc.data().imagen, title: doc.data().nombre, price: doc.data().precio, about: doc.data().descripcion, id:doc.id});
    });
});
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
        <div class="halfway-fab btms right">
                    <a class="btn-floating btn orange modal-trigger" href="#modal2" v-on:click="editarb"><i class="material-icons">edit</i></a>
                    <a class="btn-floating btn red" v-on:click="eliminar"><i class="material-icons">delete</i></a>
                </div>
        </div>
        <div class="card-content modal-trigger" href="#modal1" v-on:click="detalles">
        <span class="card-title black-text ">{{ title }}</span>
        <h6 class="teal-text text-accent-3">$`+`{{ price }}</h6>
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
        },
        eliminar: function(){
          var r = confirm("¿Seguro quiere eliminar este producto?");
          if (r == true) {
            var id = this.id;
          Promise.all(
            // Array of "Promises"
            this.img.map(img => borrarimagen(img.name))
          )
          .then((url) => {
            db.collection(base).doc(id).delete().then(function() {
              console.log("Document successfully deleted!");
             }).catch(function(error) {
              console.error("Error removing document: ", error);
          });
          })
          .catch((error) => {
            console.log(`Some failed: `, error.message)
          });
          } 
        },
        editarb: function(){
          editar(this.id,this.img,this.title,this.price,this.about);
        }
    }
  })
  Vue.component('img-card', {
    props: ['img'],
    template: `
    <div class="item slideimg">
      <img class="slideimg" :src="img">
    </div>`,
  });
  Vue.component('img-chip', {
    props: ['img','name','size'],
    template: `
    <li class="collection-item avatar">
      <img :src="img" alt="" class="circle">
      <span class="title">{{ name }}</span>
      <p class="">{{ size }} bytes</p>
  </div>
      <a id="elimr" href="#!" class="secondary-content eli" v-on:click="eliminr"><i class="material-icons">delete</i></a>
    </li>`,
    methods:{
      eliminr: function(){
        borrarimagen(this.name);
        app._data.tmpimg.splice(this.$vnode.data.key,1)
        imgsproducto = app._data.tmpimg;
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
  
  // use it!
  
  var a = app._data;


  function guardar(){
    var nombre = $("#titulo").val();
    var precio = $("#precio").val();
    var descripcion = $("#descripcion").val();
    
    if(nombre == null | nombre=="" | precio == null | precio=="" | descripcion == null | descripcion=="" | app._data.tmpimg==null){
      alert("campos vacios");
    }else{
      var tienda = $('#tienda').val();
      db.collection(tienda).add({
        imagen: imgsproducto,
        nombre: nombre,
        precio: precio,
        descripcion: descripcion
    })
    .then(function(docRef) {
      console.log(imgsproducto)
        $("#titulo").val(null).blur();
        $("#precio").val(null).blur();
        $("#descripcion").val(null).blur();
        app._data.tmpimg=[];
        imgsproducto=[]
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
      
      
    }
}
function putStorageItem(item,p) {
  // the return value will be a Promise
  return firebase.storage().ref("fotos/"+item.name).put(item)
  .then((snapshot) => {
    console.log('One success:', item)
    snapshot.ref.getDownloadURL().then(function(downloadURL) {
      //app._data.tmpimg.push({url: downloadURL,name:file.name});
      imgsproducto.push({url: downloadURL,name:item.name,size:item.size});
      a.tmpimg = imgsproducto;
      $('#uploader').width($('#uploader').width()+p);
      });
  }).catch((error) => {
    console.log('One failed:', item, error.message)
  });
}


// Obtener Elementos
var fileButton = document.getElementById('fileButton');
// Vigilar selección archivo
fileButton.addEventListener('change', function(e) {
  //Obtener archivo
  $("#uper").toggleClass("dis");
  var filesp = Object.values(e.target.files);
  var partes = $('#uploader').parent().width()/filesp.length;
  Promise.all(
    // Array of "Promises"
    filesp.map(file => putStorageItem(file,partes))
  )
  .then((url) => {
    $("#uper").toggleClass("dis");
    $("#filebox").val(null);
    console.log(`All success`)
  })
  .catch((error) => {
    console.log(`Some failed: `, error.message)
  });
});

function borrarimagen(nombre) {
  // Create a reference to the file to delete
var desertRef = firebase.storage().ref('fotos/'+nombre);

// Delete the file
desertRef.delete().then(function() {
  // File deleted successfully
  
}).catch(function(error) {
  // Uh-oh, an error occurred!
  alert(error)
});
}


function editar(id,img,nombre,precio,descripcion){
  $("#titulo").val(nombre);
  $("#precio").val(precio);
  $("#descripcion").val(descripcion);
  $('#modal2 h4').text("Editar Producto");
  $('#select').addClass("dis");
  a.tmpimg = img;
  imgsproducto = a.tmpimg
  var boton = document.getElementById('operacion');
  var cancel = document.getElementById('cancel');
  boton.innerHTML = 'Editar Producto';
cancel.onclick = function(){
  $('#select').removeClass("dis")
  a.tmpimg = [];
  $('#modal2 h4').text("Agregar Producto");
  boton.innerHTML = 'Crear Producto';
          $("#titulo").val("");
          $("#precio").val("");
          $("#descripcion").val("");
}
  boton.onclick = function(){
      var washingtonRef = db.collection(base).doc(id);
      // Set the "capital" field of the city 'DC'
      var n = $("#titulo").val();
      var p = $("#precio").val();
      var d = $("#descripcion").val();

      return washingtonRef.update({
        imagen: imgsproducto,
        nombre: n,
        precio: p,
        descripcion: d
      })
      .then(function() {
        $('#select').removeClass("dis")
        $('#modal2 h4').text("Agregar Producto");
          boton.innerHTML = 'Crear Producto';
          $("#titulo").val("");
          $("#precio").val("");
          $("#descripcion").val("");
      })
      .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });
  }
}




  db.collection("Maril").onSnapshot((querySnapshot) => {
    app._data.productos = [];
    querySnapshot.forEach((doc) => {
        app._data.productos.push({img: doc.data().imagen, title: doc.data().nombre, price: doc.data().precio, about: doc.data().descripcion, id:doc.id});
    });
});

