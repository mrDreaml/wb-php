const ShadowArea = document.querySelector("shadow-area");

const NO_NEED_NEED_COMPONENTS = [
  "ANIMATED-BUTTON-BURGER-MENU",
  "MAIN_MENU",
  "PRODUCT-SEARCH-INPUT",
];

document.addEventListener("mousedown", (e) => {
  const composedPath = e.composedPath();

  if (
    !composedPath.some((el) => NO_NEED_NEED_COMPONENTS.includes(el.tagName))
  ) {
    ShadowArea.hide();
  }
});
