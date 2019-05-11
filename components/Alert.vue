<template>
  <v-alert
    @input="onClose"
    :value="true"
    dismissible
    type="error"
  >
    {{ text }}
  </v-alert>
</template>

<script>
export default {
  // eslint-disable-next-line
  props: ['text'],
  methods: {
    onClose() {
      this.$emit('dismissed')
    }
  }
}
</script>
