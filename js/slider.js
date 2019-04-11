var suivant = document.querySelector('#suiv');
var precedent = document.querySelector('#prec');






    imgIndex = 0;

      Slider = {
        init: function(){
          document.getElementById('image1').src = imgArray[imgIndex].url;
        },

        slideImg: function(){
          if (imgIndex === imgArray.length-1) { imgIndex = -1; };
          imgIndex++;
          document.getElementById('image1').src = imgArray[imgIndex].url;
        },

        retour: function(){
          if (imgIndex == 0) { imgIndex = imgArray.length; };
          imgIndex--;
          document.getElementById('image1').src = "#";
          document.getElementById('image1').src = imgArray[imgIndex].url;
        },
      }

      

      suivant.addEventListener('click', function(){
          monSlider.slideImg();
        
    })
      precedent.addEventListener('click', function(){
        monSlider.retour();
    })
    //fleches clavier
    window.addEventListener("keydown", checkKeyPress, false); //on initialise l'écoute du clavier
    function checkKeyPress(key){
      if (key.keyCode == "37"){//si fleche de gauche
        monSlider.retour();
      }
      else if (key.keyCode == "39"){//idem droite
        monSlider.slideImg();
      }
    }
