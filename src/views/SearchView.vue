<template>
  <section class="d-flex flex-column align-center justify-center pl-4">
    <search-form />
    <search-results/>
  </section>
</template>

<script>
import SearchForm from '../components/SearchForm'
import SearchResults from '../components/SearchResults'

export default {
  name: 'Home-page',

  components: {
    SearchForm,
    SearchResults
  }

}
</script>
