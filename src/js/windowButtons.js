const getElements = () => {
  return {
    minimizeButton: document.querySelector('.window-button--minimize'),
    closeButton: document.querySelector('.window-button--close'),
  }
}

const applyActions = () => {
  const api = window.TOMATINHO_API;
  const elements = getElements();

  elements.minimizeButton.addEventListener('click', api.minimize);
  elements.closeButton.addEventListener('click', api.close);
};

export { applyActions };