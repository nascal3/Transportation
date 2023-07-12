/**
 * Reset/clear transporter results fetched
 * @method RESET_TRANSPORTER_RESULTS
 * @param  {Object} state vuex state object
 */
const RESET_TRANSPORTER_RESULTS = (state) => {
  state.searchResultsTransporters = []
}

/**
 * Set searched transporters details
 * @method SET_TRANSPORTER_RESULTS
 * @param  {Object} state vuex state object
 * @param  {Array} payload values of transporters details
 */
const SET_TRANSPORTER_RESULTS = (state, payload) => {
  state.searchResultsTransporters = payload
}

/**
 * Show all transporters
 * @method SHOW_ALL_TRANSPORTERS
 * @param  {Object} state vuex state object
 * @param  {Boolean} payload values of all transporters details
 */
const SHOW_ALL_TRANSPORTERS = (state, payload) => {
  state.showLoader = payload
}

export {
  RESET_TRANSPORTER_RESULTS,
  SET_TRANSPORTER_RESULTS,
  SHOW_ALL_TRANSPORTERS
}
