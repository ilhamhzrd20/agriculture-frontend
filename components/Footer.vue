<template>
  <v-container>
    <v-footer
      :fixed="fixed"
      class="bg-color"
      app
    >
      <span class="white--text">&copy; 2019 Tani Nyiram</span>
    </v-footer>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      fixed: false
    }
  }
}
</script>
<style scoped lang="css">
.bg-color {
  background: rgb(65,88,153);
  background: -moz-linear-gradient(107deg, rgba(65,88,153,1) 0%, rgba(0,205,181,1) 100%);
  background: -webkit-linear-gradient(107deg, rgba(65,88,153,1) 0%, rgba(0,205,181,1) 100%);
  background: linear-gradient(107deg, rgba(65,88,153,1) 0%, rgba(0,205,181,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#415899",endColorstr="#00cdb5",GradientType=1);
}
</style>
