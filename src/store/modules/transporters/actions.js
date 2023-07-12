
/**
 * Search transporters
 * @method searchTransporters
 * @param  {Object} commit vuex mutations
 * @param  {Object} state of the vuex store
 * @param  {Object} payload search payload of transporters
 */
const searchTransporters = async ({ commit, state }, payload) => {
  try {
    const response = await mapSearchResults(payload, state.allTransporters)
    commit('SET_TRANSPORTER_RESULTS', response)
  } catch (err) {
    throw err.message
  }
}

const mapSearchResults = async (payload, transporters) => {
  const { locationName, cargoType, cargoWeight } = payload
  const weight = parseInt(cargoWeight) || 0

  return transporters.filter(transporter => {
    return transporter.location.toLowerCase() === locationName.toLowerCase() &&
      transporter.cargo_types.toLowerCase() === cargoType.toLowerCase() &&
      transporter.maximum_weight > parseInt(weight)
  })
}

/**
 * Removes details of the transporters searched for
 * @method resetSearchResults
 * @param  {Object} commit vuex mutations
 */
const resetSearchResults = ({ commit }) => {
  commit('RESET_TRANSPORTER_RESULTS')
}

export {
  resetSearchResults,
  searchTransporters
}
