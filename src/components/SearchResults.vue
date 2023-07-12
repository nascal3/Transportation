<template>
  <v-container>
    <v-card class="pa-4" max-width="550" outlined>
      <h2 class="section-title">Search transporter</h2>

    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

  props: {
    searchDetails: {
      type: Object,
      default: () => {
      }
    },

    data () {
      return {
        transporterName: ''
      }
    },

    watch: {
      searchDetails (newValue) {
        if (Object.keys(newValue).length) {
          this.showResults()
        }
      }
    },

    computed: {
      ...mapGetters({
        searchResultsTransporters: ['transporters/showSearchResultsTransporters']
      })
    },

    methods: {
      showResults () {
        // this.matchresults()
      }

      // matchresults () {
      //   this.searchDetails
      // }
    }

  }
}
</script>
