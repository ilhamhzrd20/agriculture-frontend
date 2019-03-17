<template>
  <v-app class="grey lighten-4">
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      email: null,
      password: null
    }
  }
}
</script>
