import { galleryItems } from "./gallery-items.js";
// Change code below this line
const galleryBlock = document.querySelector(".gallery");
galleryBlock.innerHTML = galleryItemsMarkup(galleryBlock);

function galleryItemsMarkup(items) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </div>`;
    })
    .join("");
}
const onPreviewClick = (e) => {
  e.preventDefault();

  if (!e.target.classList.contains(`gallery__image`)) return;

  const source = e.target.dataset.source;
  const instance = basicLightbox.create(
    `<img width="1400" height="900" src="${source}">`,
    {
      onShow: () => {
        window.addEventListener("keydown", closeInstance);
      },
      onClose: () => {
        window.removeEventListener("keydown", closeInstance);
      },
    }
  );
  instance.show();

  function closeInstance(e) {
    if (e.key === "Escape") {
      instance.close();
    }
  }
};
galleryBlock.addEventListener("click", onPreviewClick);
