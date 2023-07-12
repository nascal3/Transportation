<template>
  <v-container>
    <v-card class="pa-4" max-width="700" outlined>
      <h2 class="section-title">Search results</h2>
      <div v-if="noResultsFound">
        No results found!
      </div>
      <v-data-table
        v-else
        :headers="headers"
        :items="searchResultsTransporters"
        :items-per-page="7"
        class="elevation-1"
      ></v-data-table>

    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      headers: [
        {
          text: 'Transporter Name\n',
          align: 'start',
          sortable: false,
          value: 'transporter_name'
        },
        { text: 'Location', value: 'location' },
        { text: 'Cargo Types Supported', value: 'cargo_types' },
        { text: 'Maximum Weight Capacity (KG)', value: 'maximum_weight' }
      ]
    }
  },

  computed: {
    ...mapGetters({
      searchResultsTransporters: ['transporters/showSearchResultsTransporters']
    }),

    noResultsFound () {
      return this.searchResultsTransporters.length < 0
    }

  }
}
</script>
