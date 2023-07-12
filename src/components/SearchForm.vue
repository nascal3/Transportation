<template>
  <v-container>
    <v-card class="d-flex align-center pa-4" max-width="550" outlined>
      <v-form ref="form" enctype="multipart/form-data" v-model="valid" @submit.prevent="sendRequest">
        <h2 class="section-title">Cargo information</h2>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="locationName"
              label="Location name*"
              :rules="[rules.locationNameRequired]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="cargoType"
              :items="cargoTypes"
              item-text="text"
              item-value="value"
              label="Cargo Type*"
              :rules="[rules.cargoTypeRequired]"
            ></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="cargoWeight"
              label="Cargo Weight (KG)*"
              :rules="[rules.cargoWeightRequired]"
            ></v-text-field>
          </v-col>
        </v-row>

        <h2 class="section-title">Cargo Dimensions</h2>

        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="cargoLength"
              type="number"
              label="Length*"
              :rules="[rules.cargoLengthRequired]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="cargoWidth"
              type="number"
              label="Width*"
              :rules="[rules.cargoWidthRequired]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="cargoHeight"
              type="number"
              label="Height*"
              :rules="[rules.cargoHeightRequired]"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-btn
              class="btn-text"
              block
              outlined
              color="error"
              @click="reset"
            >
              Clear
            </v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <v-btn
              type="submit"
              :loading="showLoader"
              :disabled="showLoader"
              class="btn-text"
              block
              color="primary"
            >
              Search
            </v-btn>
          </v-col>
        </v-row>
      </v-form>

    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import formatNumbers from '@/mixins/formatNumbers'

export default {
  name: 'HelloWorld',

  mixins: [formatNumbers],

  data () {
    return {
      valid: false,
      locationName: null,
      cargoType: null,
      cargoLength: null,
      cargoWidth: null,
      cargoWeight: 0,
      cargoHeight: null,
      showLoader: false,
      cargoTypes: [
        { text: 'Food', value: 'Food' },
        { text: 'Furniture', value: 'Furniture' },
        { text: 'Medical Supplies', value: 'Medical Supplies' },
        { text: 'Automobiles', value: 'Automobiles' },
        { text: 'Clothing', value: 'Clothing' },
        { text: 'Books', value: 'Books' },
        { text: 'Appliances', value: 'Books' },
        { text: 'Chemicals', value: 'Chemicals' },
        { text: 'Electronics', value: 'Electronics' }
      ],
      rules: {
        locationNameRequired: value => !!value || 'Location name required',
        cargoTypeRequired: value => !!value || 'Cargo type required',
        cargoWeightRequired: value => !!value || 'Cargo weight required',
        cargoLengthRequired: value => !!value || 'Length of cargo required',
        cargoWidthRequired: value => !!value || 'Width of cargo required',
        cargoHeightRequired: value => !!value || 'Height of cargo required'
      }
    }
  },

  watch: {
    cargoWeight (newValue) {
      const result = newValue.replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      this.$nextTick(() => {
        this.cargoWeight = result
        const numValue = this.formatAmountToNumber(this.cargoWeight)
        this.disabled = !numValue
        this.$emit('amount', this.cargoWeight)
      })
    }
  },

  methods: {
    ...mapActions('transporters', [
      'searchTransporters',
      'resetSearchResults'
    ]),

    async sendRequest () {
      this.valid = this.$refs.form.validate()

      if (this.valid) {
        this.showLoader = true

        // eslint-disable-next-line no-unused-vars
        const payload = {
          locationName: this.locationName,
          cargoType: this.cargoType,
          cargoLength: this.cargoLength,
          cargoWidth: this.cargoWidth,
          cargoHeight: this.cargoHeight,
          cargoWeight: this.cargoWeight
        }

        await this.searchTransporters(payload)
        this.showLoader = false
      }
    },

    reset () {
      this.resetSearchResults()
      this.resetValidation()
      this.$refs.form.reset()
    },

    resetValidation () {
      this.$refs.form.resetValidation()
    }
  }

}
</script>
