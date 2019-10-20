<template>
  <v-container>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      class="bg-color"
      fixed
      app
    >
      <!-- profile picture -->
      <div class="name-card pa-4">
        <v-layout>
          <div class="layout ma-0 align-center column">
            <v-avatar size="96" color="secondary">
              <img src="../static/icon.png" alt="Smart Agriculture" width="96" height="96">
            </v-avatar>
            <div class="flex text-sm-center my-3">
              <div class="subheading white--text">
                <span v-if="user" v-text="user || '—'" />
              </div>
            </div>
          </div>
        </v-layout>
      </div>
      <v-divider
        inset
        horizontal
      />
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon color="white">
              {{ item.icon }}
            </v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" class="white--text" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="clipped"
      color="primary"
      fixed
      app
    >
      <v-toolbar-side-icon @click="drawer = !drawer" class="white--text" />
      <v-toolbar-title class="text-uppercase secondary--text">
        <span v-text="titleThin" class="font-weight-light" />
        <span v-text="titleBold" />
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        @click="onLogout"
        flat
        color="accent"
      >
        <span v-text="titleSignOut" />
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>
  </v-container>
</template>

<script>

export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'dashboard',
          title: 'Dashboard',
          to: '/'
        },
        {
          icon: 'history',
          title: 'Log',
          to: '/logs'
        }
      ],
      miniVariant: false,
      titleThin: 'Smart',
      titleBold: 'Agriculture',
      titleSignOut: 'Sign Out'
    }
  },
  computed: {
    user() {
      if (!this.$store.state.user) {
        return '_'
      } else {
        return this.$store.getters.getUser.name
      }
    }
  },
  methods: {
    onLogout() {
      if (this.$store.getters.getUser) {
        this.$store.dispatch('logoutUser')
        this.$router.push('/login')
      }
    }
  }
}
</script>
<style scoped lang="css">
.bg-color {
  background: rgb(76,98,158);
  background: -moz-linear-gradient(107deg, rgba(76,98,158,1) 0%, rgba(76,98,158,1) 100%);
  background: -webkit-linear-gradient(107deg, rgba(76,98,158,1) 0%, rgba(76,98,158,1) 100%);
  background: linear-gradient(107deg, rgba(76,98,158,1) 0%, rgba(76,98,158,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#4c629e",endColorstr="#4c629e",GradientType=1);
}
</style>
