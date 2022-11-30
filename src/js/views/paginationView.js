import View from './View';
import icons from 'url:../../img/icons.svg';
import { RES_PER_PAGE } from '../config';
class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  _generateMarkup() {
    let curPage = this._data.page;
    const nPages = Math.ceil(this._data.results.length / RES_PER_PAGE);
    // 1-if first page and there is other pages
    if (curPage === 1 && curPage < nPages) {
      return `
      <button data-goto = "${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      
      `;
    }
    // 2-if one page and no other
    if (curPage === 1 && nPages === 1) {
      return ``;
    }
    // 3-if pages before & after
    if (curPage < nPages) {
      return `
        <button data-goto = "${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
      <button data-goto = "${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
      
      `;
    }
    // 4-if last page
    if (curPage === nPages) {
      return `
      <button data-goto = "${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
    `;
    }
  }

  addHandlerSearch(handler) {
    // select the page clicked
    this._parentEl.addEventListener('click', e => {
      // select the page clicked event delegation
      const clickedButton = e.target.closest('.btn--inline');
      if (!clickedButton) return;
      const page = +clickedButton.dataset.goto;
      handler(page);
    });
  }
}

export default new PaginationView();
