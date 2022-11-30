// import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import { MODAL_COLSE_SEC } from './config';
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// if (module.hot) {
//   module.hot.accept;
// }
const controlRecipes = async function () {
  const id = window.location.hash.slice(1);
  if (!id) return;
  try {
    // 0-load spinner
    recipeView.renderSpinner();
    // update the search results with the selected recipy
    resultsView.update(model.loadSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
    // 1-load the recipy
    await model.loadRecipe(id);
    const { recipe } = model.state;
    // 2-Render the recipy
    recipeView.render(recipe);
  } catch (error) {
    recipeView.renderError();
  }
};
const controlSearchRecipes = async function () {
  try {
    const query = searchView.getQuery();
    // nothing witten but clicked on search
    if (!query) return;
    // 0-load spinner
    resultsView.renderSpinner();
    //  1-load the recipes search
    await model.loadSearchResults(query);
    // 2-Render the results (left panel)
    resultsView.render(model.loadSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (error) {
    resultsView.renderError(error);
  }
};
const controlPagination = function (page) {
  try {
    // 0-load spinner
    resultsView.renderSpinner();
    // 2-Render the results (next page)
    resultsView.render(model.loadSearchResultsPage(page));
    paginationView.render(model.state.search);
  } catch (error) {
    resultsView.renderError(error);
  }
};
const controlServingsRecipy = function (newServing) {
  // Update the ingredients' quantities from the state
  model.loadNewServings(newServing);
  // render the updates ingredients
  recipeView.update(model.state.recipe);
};
const controlBookmarks = function () {
  // 1-add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // 2-update the recipeView
  recipeView.update(model.state.recipe);
  // 3-update the bookmarksView
  bookmarksView.render(model.state.bookmarks);
};
const controlLoadBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};
const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    // render recipe
    addRecipeView.render(model.state.recipe);
    // render success message
    addRecipeView.renderMessage();
    // render bookmark
    bookmarksView.render(model.state.bookmarks);
    // update the URL with the uploded recipe id
    history.pushState(null, '', `#${model.state.recipe.id}`);

    // close modal window
    setTimeout(function () {
      addRecipeView.toggleWindow();
      location.reload();
    }, MODAL_COLSE_SEC * 1000);
  } catch (error) {
    addRecipeView.renderError(error);
  }
};
const init = function () {
  bookmarksView.addHandlerBookmarksRender(controlLoadBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdatedServings(controlServingsRecipy);
  recipeView.addHandlerBookmarks(controlBookmarks);
  searchView.addHandlerSearch(controlSearchRecipes);
  paginationView.addHandlerSearch(controlPagination);
  addRecipeView.addHandlerSendFormData(controlAddRecipe);
};

init();
