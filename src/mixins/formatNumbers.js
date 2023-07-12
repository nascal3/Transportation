export default {
  methods: {
    /**
     * Convert number string to float value
     * @method formatAmountToNumber
     * @param  {String} value string value of a number
     * @return {Number} string converted to number (float)
     */
    formatAmountToNumber (value) {
      if (value) {
        // eslint-disable-next-line
        value = value.replace(/\,/g, '')
        return parseFloat(value)
      }
      return 0
    }
  }
}
