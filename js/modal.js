const modal = document.querySelector(".modal");

const getModalImg = (src) => {
  modal.innerHTML = `
  <div class="modal_window">
        <div class="down_wrapper">
          <button class="downBtn" onclick = "modalDownloadImg('${src}')"><i class="fa-solid fa-arrow-down"></i></button>
          <button class="modal_close_btn close"><i class="fa-solid fa-xmark close"></i></button>
        </div>
      <img src="${src}" alt="" />
  </div>
  `;
};

// modal oynani yopish buyrugi
modal.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("close")) {
    modal.classList.add("hide");
    document.body.style.overflow = "auto";
  }
});

// modal oynani ochish buyrugi
document.addEventListener("click", (e) => {
  e.preventDefault();
  const target = e.target;
  if (target.classList.contains("photoBox")) {
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    getModalImg(target.alt);
  }
});

//  tanlangan suratni Api dan yuklab olish soravi
const modalDownloadImg = (imgUrl) => {
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
