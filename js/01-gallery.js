import { galleryItems } from "./gallery-items.js";

const galleryImages = document.querySelector(".gallery");

const elemMarkup = galleryItems
  .map(({ preview, original, description }) => {
    return `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
    `;
  })
  .join("");
galleryImages.insertAdjacentHTML("beforeend", elemMarkup);

const galleryLink = document.querySelectorAll(".gallery__link");
galleryLink.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
  });
});

const galleryImg = document.querySelectorAll(".gallery__image");
galleryImg.forEach((image) => {
  image.addEventListener("click", (event) => {
    const imageXL = event.target.dataset.source;
    const instance = basicLightbox.create(
      `
        <img src="${imageXL}" alt="" />
`,
      {
        onShow: (instance) => {
          document.onkeydown = function (evt) {
            evt = evt || window.event;
            var isEscape = false;
            if ("key" in evt) {
              isEscape = evt.key === "Escape" || evt.key === "Esc";
            } else {
              isEscape = evt.keyCode === 27;
            }
            if (isEscape) {
              instance.close();
            }
          };
        },
      }
    );
    instance.show();
  });
});

console.log(galleryItems);