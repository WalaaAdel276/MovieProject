"use strict";
let allMovies = [];
let Name = document.getElementById("Name");
let Email = document.getElementById("Email");
let Phone = document.getElementById("Phone");
let Age = document.getElementById("Age");
let Password = document.getElementById(" Password");
let RePassword = document.getElementById("RePassword");
let nameAlert = document.getElementById("nameAlert");
let emailAlert = document.getElementById("emailAlert");
let phoneAlert = document.getElementById("phoneAlert");
let ageAlert = document.getElementById("ageAlert");
let passwordAlert = document.getElementById("passwordAlert");
let rePasswordAlert = document.getElementById("rePasswordAlert");
let submitBtn = document.getElementById("submitBtn");
let validation = document.getElementById("validation ");
let searchMovies = document.getElementById("searchMovies");
let searchWord = document.getElementById("searchWord");


$(document).ready(function () {
  let innerBoxWidth = $(".innerBox").outerWidth();
  $("#Box").animate({ left: `-${innerBoxWidth}` }, 0);


  $("#loading .spinner").fadeOut(100, () => {
    $("#loading .spinner").parent().fadeOut(100, () => {
      $("#loading").remove();
      $("body").css("overflow-y", "auto");

    })

  });


});


async function getMovies(api = 'movie/now_playing') {
  let response = await fetch(`https://api.themoviedb.org/3/${api}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR32Px4_3ZTHYF-tjdSOdkN82Esd5XSCl7c0ueF0LR8urOnlJBZ4TJJdf_k`);
  let finalResult = await response.json();
  allMovies = finalResult.results;
  displayMovies();

};
getMovies();
$(".tab-options ul li a").click(function (e) {
  let myAPI = e.target.getAttribute("myKey");
  console.log(myAPI);
  getMovies(myAPI);

});

function displayMovies() {
  let temp = "";
  for (let i = 0; i < allMovies.length; i++) {
    temp += ` 
      <div class=" col-md-4"> 
         <div class=" movie my-4">
          <img  class="w-100 " src=" https://image.tmdb.org/t/p/w500${allMovies[i].poster_path}" alt="posterImage">
          <div class="layer d-flex align-items-center ">
            <div>
              <h2 class="col-md-12">${allMovies[i].title}</h2><br>
              <p class="col-md-12">${allMovies[i].overview}</p><br>
              <p class="col-md-12">Rate : ${allMovies[i].vote_average}</p><br>
              <p class="col-md-12"> ${allMovies[i].release_date}</p><br>
          
              </div>
              </div>
             </div>
         
      </div>`

  }
  document.getElementById("movies").innerHTML = temp;
}

searchMovies.addEventListener("keyup", function () {
  searchMovie(searchMovies.value)
});


function searchMovie(term) {
  let temp = "";
  for (var i = 0; i < allMovies.length; i++) {
    if (allMovies[i].title.toLowerCase().includes(term.toLowerCase())) {
      temp += ` 
        <div class=" col-md-4"> 
           <div class=" movie my-4">
            <img  class="w-100 " src=" https://image.tmdb.org/t/p/w500${allMovies[i].poster_path}" alt="posterImage">
            <div class="layer d-flex align-items-center ">
              <div>
                <h2 class="col-md-12">${allMovies[i].title}</h2><br>
                <p class="col-md-12">${allMovies[i].overview}</p><br>
                <p class="col-md-12">Rate : ${allMovies[i].vote_average}</p><br>
                <p class="col-md-12"> ${allMovies[i].release_date}</p><br>
            
                </div>
                </div>
               </div>
           
        </div>`

    }

  }
  document.getElementById("movies").innerHTML = temp;
}
searchWord.addEventListener("keyup", function () {
  searchByWord(searchWord.value.toLowerCase())
});

async function searchByWord(title) {
  let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR32Px4_3ZTHYF-tjdSOdkN82Esd5XSCl7c0ueF0LR8urOnlJBZ4TJJdf_k&query=${title}`);
  let finalResult = await response.json();
  allMovies = finalResult.results;
  displayMovies();
  console.log("hello")


};

$("#toggleBtn").click(function () {
  let innerBoxWidth = $(".innerBox").outerWidth();
  if ($("#Box").css("left") == "0px") {
    $("#Box").animate({ left: `-${innerBoxWidth}` }, 1000);
    $("i.fa-times").replaceWith("<i class=' fas fa-align-justify'></i>");
    $(`.tab-options .item1 , .tab-options .item2 , .tab-options .item3 , .tab-options .item4,
     .tab-options .item5 , .tab-options .item6 `).animate({ opacity: "0", paddingTop: "500px" }, 500)
  }
  else {
    $("#Box").animate({ left: `0px` }, 1000);
    $("i.fa-align-justify").replaceWith("<i class='fas fa-align-justify fa-times'></i>");
    $(".tab-options .item1").animate({ opacity: "1", paddingTop: "10px" }, 1000)
    $(".tab-options .item2").animate({ opacity: "1", paddingTop: "10px" }, 1200)
    $(".tab-options .item3").animate({ opacity: "1", paddingTop: "10px" }, 1400)
    $(".tab-options .item4").animate({ opacity: "1", paddingTop: "10px" }, 1600)
    $(".tab-options .item5").animate({ opacity: "1", paddingTop: "10px" }, 1800)
    $(".tab-options .item6").animate({ opacity: "1", paddingTop: "10px" }, 2000)


  }

});

function validationName() {
  var regex = /^(?![\s.]+$)[a-zA-Z\s.]*$/;
  if (regex.test(Name.value)) {
    nameAlert.style.display = "none";
    return true;

  } else {
    nameAlert.style.display = "block";
    return false;
  }
}

function validationEmail() {
  var regex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(Email.value)) {
    emailAlert.style.display = "none";
    return true;
  } else {
    emailAlert.style.display = "block";
    return false;
  }
}
function validationPassword() {
  var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (regex.test(Password.value)) {
    passwordAlert.style.display = "none";
    return true;
  } else {
    passwordAlert.style.display = "block";
    return false;
  }
}
function validationRePassword() {
  if (RePassword.value == Password.value) {
    rePasswordAlert.style.display = "none";
    return true;
  } else {
    rePasswordAlert.style.display = "block";
    return false;
  }
}
function validationPhone() {
  var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  if (regex.test(Phone.value)) {
    phoneAlert.style.display = "none";
    return true;
  } else {
    phoneAlert.style.display = "block";
    return false;
  }
}
function validationAge() {
  var regex = /^[1-9][0-9]?$|^100$/;
  if (regex.test(Age.value)) {
    ageAlert.style.display = "none";
    return true;
  } else {
    ageAlert.style.display = "block";
    return false;
  }
}

Name.addEventListener("keyup", validationName);
Email.addEventListener("keyup", validationEmail);
Password.addEventListener("keyup", validationPassword);
RePassword.addEventListener("keyup", validationRePassword);
Phone.addEventListener("keyup", validationPhone);
Age.addEventListener("keyup", validationAge);
