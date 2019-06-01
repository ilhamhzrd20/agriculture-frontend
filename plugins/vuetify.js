import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/dist/vuetify'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

Vue.use(Vuetify, {
  iconfont: 'mdi',
  theme: {
    primary: '#0cc5b5',
    secondary: '#415899',
    accent: '#ff512f',
    error: '#ff4444',
    info: '#33b5e5',
    success: '#00C851',
    warning: '#ffbb33',
    orange_dark2: '#F57C00',
    green_dark2: '#388E3C',
    cyan_dark1: '#00ACC1',
    indigo_dark5: '#24243e',
    gray_light: '#eeeeee'
  }
})
