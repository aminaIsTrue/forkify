import icons from 'url:../../img/icons.svg';
class View {
  _data;
  render(data, flag = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }
    this._data = data;
    const markup = this._generateMarkup();
    if (!flag) return markup;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0)) {
    //   return this.renderError();
    // }
    this._data = data;
    const newMarkup = this._generateMarkup();
    // Convert the markup to DOM node object and To Array
    const newDom = document.createRange().createContextualFragment(newMarkup);
    // Convert the DOM node objects  To Array
    const NewElements = Array.from(newDom.querySelectorAll('*'));

    const currElements = Array.from(this._parentEl.querySelectorAll('*'));

    // compare the two elements
    NewElements.forEach(function (newEl, i) {
      const curEl = currElements[i];
      // if an element has text content it must be the first child
      // 1- here we checked if text content has changed
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      // 2- here we need to check if attributes values have changed
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(att => {
          curEl.setAttribute(att.name, att.value);
        });
      }
    });
  }
  _clear() {
    this._parentEl.innerHTML = '';
  }
  renderSpinner = function () {
    const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  };

  renderError(errMsg = this._errorMessage) {
    const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${errMsg}</p>
        </div>
        `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._message) {
    const markup = `
          <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
        </div>
        `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}

export default View;
