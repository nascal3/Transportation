
/**
 * Show search Results of Transporters
 * @method showSearchResultsTransporters
 * @param  {Object} state vuex state object
 * @return {Array} Contains the search results
 */
const showSearchResultsTransporters = (state) => state.searchResultsTransporters

/**
 * Show all transporters data
 * @method showAllTransporters
 * @param  {Object} state vuex state object
 * @return {boolean} Contains all transporters data
 */
const showAllTransporters = (state) => state.allTransporters

export {
  showSearchResultsTransporters,
  showAllTransporters
}
