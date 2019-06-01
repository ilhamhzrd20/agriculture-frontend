<template>
  <v-content id="login" class="bg-color">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4 lg4>
          <v-layout v-if="error" row>
            <v-flex xs12 sm12>
              <app-alert @dismissed="onDismissed" :text="error" />
            </v-flex>
          </v-layout>
          <v-card class="elevation-1 pa-3">
            <v-card-text>
              <div class="layout column align-center">
                <img src="../static/logo-sa.png" alt="Smart Agriculture" width="120" height="120">
                <h1 class="flex my-4 primary--text">
                  Smart Agriculture
                </h1>
              </div>
              <v-form ref="form" @submit.prevent="login">
                <v-text-field
                  v-model="email"
                  :rules="[rules.required, rules.email]"
                  append-icon="person"
                  name="email"
                  label="Email"
                  type="text"
                />
                <v-text-field
                  v-model="password"
                  :rules="[rules.required]"
                  append-icon="lock"
                  name="password"
                  label="Password"
                  type="password"
                />
                <v-btn :loading="loading" block color="primary" type="submit">
                  Login
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import Alert from '../components/Alert'

export default {
  components: {
    'app-alert': Alert
  },
  layout: 'login',
  middleware: 'noAuth',
  data() {
    return {
      email: '',
      password: '',
      rules: {
        required: value => !!value || 'Required.',
        counter: value => value.length <= 200 || 'Max 200 characters',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    error() {
      return this.$store.getters.error
    },
    loading() {
      return this.$store.getters.loading
    }
  },
  watch: {
    user(value) {
      // eslint-disable-next-line no-console
      console.log(value)
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      } else {
        this.$router.push('/login')
      }
    }
  },
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        // eslint-disable-next-line
        console.log('login accessed')
        this.$store.dispatch('login', { email: this.email, password: this.password })
          .then((result) => {
            if (this.$store.getters.getUser !== null &&
            this.$store.getters.getUser !== undefined) {
              this.$router.push('/')
            } else {
              this.$router.push('/login')
            }
          }).catch((err) => {
            // eslint-disable-next-line no-console
            console.log(err)
          })
      }
    },
    onDismissed() {
      // eslint-disable-next-line
      console.log('dismissed alert')
      this.$store.dispatch('clearError')
    }
  }

}
</script>
<style scoped lang="css">
  #login {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
  .bg-color {
    background: rgb(65,88,153);
    background: -moz-linear-gradient(107deg, rgba(65,88,153,1) 0%, rgba(0,205,181,1) 100%);
    background: -webkit-linear-gradient(107deg, rgba(65,88,153,1) 0%, rgba(0,205,181,1) 100%);
    background: linear-gradient(107deg, rgba(65,88,153,1) 0%, rgba(0,205,181,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#415899",endColorstr="#00cdb5",GradientType=1);
  }
</style>
