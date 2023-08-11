const accesKey = "QaxOLYJFNjV5katlAPBXlpedw2R2Ovti2SKbFZEI4RU";
const inputEl = document.querySelector(".searchInput");
const searchResults = document.querySelector(".searchResults");
const searchBtn = document.querySelector(".searchBtn");
const showMoreButton = document.querySelector(".showMoreButton");
const showMore = document.querySelector(".showMore");
const random_url = `https://api.unsplash.com/photos/random?count=28&client_id=${accesKey}`;

let inputValue = "";
let page = 1;

// sayt ishga tushganda random suratlarni Api dan olish sorovi
function getRandomImg() {
  fetch(random_url)
    .then((res) => res.json())
    .then((data) => {
      generateImg(data);
    })
    .catch(() => alert("Xatolik yuz berdi!"));
}
getRandomImg();

// inputga yozilgan malumotni Api dan olish sorovi
function getSearchImg() {
  inputValue = inputEl.value;
  const search_url = `https://api.unsplash.com/search/photos?per_page=28&page=${page}&query=${inputValue}&client_id=${accesKey}`;

  fetch(search_url)
    .then((res) => res.json())
    .then((data) => {
      generateImg(data.results);
    })
    .catch(() => alert("Xatolik yuz berdi!"));
}

//  tanlangan suratni Api dan yuklab olish soravi
const downloadImg = (imgUrl) => {
  fetch(imgUrl)
    .then((res) => res.blob())
    .then((blob) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = new Date().getTime();
      a.click();
    })
    .catch(() => alert("Failed to download image!"));
};

// Api dan kelgan suratlarni htmlga taxlab beraadi
const generateImg = (res) => {
  if (page === 1) {
    searchResults.innerHTML = "";
  }

  res.map((result) => {
    const searchResult = document.createElement("div");
    searchResult.classList.add("searchResult");
    searchResult.innerHTML = `
        <img
          src="${result.urls.regular}"
          alt = "${result.urls.regular}"
          class="photoBox"
        />
        <a onclick = "downloadImg('${result.urls.regular}')" class = "downLink">
          <i class="fa-solid fa-arrow-down"></i>
        </a>
        `;
    searchResults.appendChild(searchResult);
  });

  if (page >= 1 && inputValue !== "") {
    showMore.classList.remove("hide");
  }
};

searchBtn.addEventListener("click", (e) => {
  e.preventDefault;
  page = 1;
  inputValue = inputEl.value;
  if (inputValue == "") {
    alert("fill in the field");
  }
  getSearchImg();
});

showMoreButton.addEventListener("click", () => {
  page++;
  getSearchImg();
});

document.addEventListener("keydown", (e) => {
  if (e.code == "Enter") {
    inputValue = inputEl.value;
    searchResults.innerHTML = ""
    getSearchImg();
  }
});
