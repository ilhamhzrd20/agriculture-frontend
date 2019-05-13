import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/dist/vuetify'
// import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  // theme: {
  //   primary: colors.blue.darken2,
  //   accent: colors.grey.darken3,
  //   secondary: colors.amber.darken3,
  //   info: colors.teal.lighten1,
  //   warning: colors.amber.base,
  //   error: colors.deepOrange.accent4,
  //   success: colors.green.accent3
  // }
  theme: {
    primary: '#415899',
    secondary: '#00cdb5',
    accent: '#ff512f',
    error: '#ff4444',
    info: '#33b5e5',
    success: '#00C851',
    warning: '#ffbb33'
  }
})
