<template>
  <v-container>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      class="grey lighten-5"
      fixed
      app
    >
      <!-- profile picture -->
      <div class="name-card pa-4">
        <v-layout>
          <div class="layout ma-0 align-center column">
            <v-avatar size="96" color="primary">
              <span class="white--text headline">Fatkhun</span>
            </v-avatar>
            <div class="flex text-sm-center my-3">
              <div class="subheading">
                M Fatkhun
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
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="clipped"
      class="primary"
      fixed
      app
    >
      <v-toolbar-side-icon @click="drawer = !drawer" class="white--text" />
      <v-toolbar-title class="text-uppercase white--text">
        <span v-text="titleThin" class="font-weight-light" />
        <span v-text="titleBold" />
      </v-toolbar-title>
      <v-spacer />
      <v-btn flat color="white" to="/login">
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
  }
}
</script>
