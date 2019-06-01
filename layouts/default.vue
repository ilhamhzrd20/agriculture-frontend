<template>
  <v-app class="gray_light">
    <drawer-components />
    <v-content>
      <nuxt />
    </v-content>
    <footer-components />
  </v-app>
</template>

<script>
import Drawer from '@/components/Drawer'
import Footer from '@/components/Footer'

export default {
  middleware: 'auth',
  components: {
    'drawer-components': Drawer,
    'footer-components': Footer
  },
  data() {
    return {
      temp: '',
      temper: ''
    }
  }
}
</script>
