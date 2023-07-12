export default {
  methods: {
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
