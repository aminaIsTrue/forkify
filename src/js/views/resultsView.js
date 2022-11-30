import View from './View.js';
import previewView from './previewView.js';
class ResultsView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No recipies. Please try again!';
  _generateMarkup() {
    return this._data.map(rslt => previewView.render(rslt, false)).join('');
  }
}

export default new ResultsView();
