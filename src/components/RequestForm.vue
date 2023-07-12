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
              label="Cargo Weight*"
              :rules="[rules.cargoWeightRequired]"
            ></v-text-field>
          </v-col>
        </v-row>

        <h2 class="section-title">Cargo Dimensions</h2>

        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="cargoLength"
              label="Length*"
              :rules="[rules.cargoLengthRequired]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="cargoWidth"
              label="Width*"
              :rules="[rules.cargoWidthRequired]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="cargoHeight"
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
              Cancel
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
      cargoHeight: null,
      cargoTypes: [
        { text: 'Food', value: 'FD' },
        { text: 'Furniture', value: 'FA' },
        { text: 'Construction material', value: 'CM' }
      ],
      cargoWeight: '',
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
    async cargoWeight (newValue) {
      const result = newValue.replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      // eslint-disable-next-line vue/valid-next-tick
      await this.$nextTick(() => {
        this.amount = result
        const numValue = this.formatAmountToNumber(this.amount)
        this.disabled = !numValue
        this.$emit('amount', this.amount)
      })
    }
  },

  methods: {
    sendRequest () {
      this.valid = this.$refs.form.validate()

      if (this.valid) {
        this.resetValidation()
      }
    },

    reset () {
      this.$refs.form.reset()
    },

    resetValidation () {
      this.$refs.form.resetValidation()
    }
  }

}
</script>
