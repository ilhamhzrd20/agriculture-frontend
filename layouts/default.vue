<template>
  <v-app class="grey lighten-4">
    <drawer-components />
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <footer-components />
  </v-app>
</template>

<script>
import Drawer from '@/components/Drawer'
import Footer from '@/components/Footer'

export default {
  components: {
    'drawer-components': Drawer,
    'footer-components': Footer
  },
  data() {
    return {

    }
  }
}
</script>
