<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4 lg4>
          <v-card class="elevation-1 pa-3">
            <v-card-text>
              <div class="layout column align-center">
                <img src="../static/icon.png" alt="Vue Material Admin" width="120" height="120">
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
export default {
  layout: 'login',
  data() {
    return {
      loading: false,
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
    }
  },
  watch: {
    user(value) {
      if (value !== null) {
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
        this.$store.dispatch('login', { email: this.email, password: this.password }).then((result) => {
          this.loading = true
          setTimeout(() => {
            this.$router.push('/')
          }, 1000)
          // eslint-disable-next-line handle-callback-err
        }).catch((err) => {
          // eslint-disable-next-line
          console.log(err)
        })
      }
    }
  }

}
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
