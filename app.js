const searchInput = document.getElementById("inputS");
const clearBtn = document.getElementById("clear");
const picture = document.querySelector(".pictureDiv");
const h1 = document.querySelector("h1");
let value;

function showLoadingSpinner() {
  picture.innerHTML = '<div class="loading-spinner"></div>';
}

function hideLoadingSpinner() {
  const loadingSpinner = document.querySelector(".loading-spinner");
  if (loadingSpinner) {
    loadingSpinner.remove();
  }
}

function fetchImages() {
  value = searchInput.value;
  showLoadingSpinner();

  fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
    method: "GET",
    headers: {
      Authorization: "Client-ID EpZvern3LOlXOUiYv1BQ4hoXqZ2Zf3spolzF8O9Mgvg",
    },
  })
    .then((resp) => resp.json())
    .then(function (data) {
      if (data.results.length === 0) {
        picture.innerHTML = `
            <h1 id='none'>
                Axtardığınız " ${value} " bizim şəkil bazamızda tapılmadı :( , Ən qısa zamanda problemi aradan qaldıracayıq
            </h1>
            <button id="ozu" onclick="okay()" class="okey">
                 Başa düşdüm
            </button>`;
      } else {
        picture.innerHTML = data.results.reduce(
          (kod, item) =>
            (kod += `<div  class="imgDiv"><img  src="${item.urls.small}"/></div>`),
          ""
        );
      }
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(hideLoadingSpinner);
}

function clear() {
  searchInput.value = "";
  const imgDivs = document.querySelectorAll(".imgDiv");
  imgDivs.forEach((imgDiv) => imgDiv.remove());
}

function okay() {
  console.log("DELET");
  const ozu = document.getElementById("ozu");
  const none = document.getElementById("none");
  none.style.display = "none";
  ozu.style.display = "none";
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    getir();
  }
}

// Enter ile axtaris
searchInput.addEventListener("keyup", handleKeyPress);
clearBtn.addEventListener("click", clear);

function getir() {
  fetchImages();
}
