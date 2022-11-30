class searchView {
  _parentEl = document.querySelector('.search');
  _clearSearch() {
    this._parentEl.querySelector('.search__field').value = '';
  }
  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearSearch();
    return query;
  }
  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new searchView();
