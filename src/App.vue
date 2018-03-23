<template>
  <v-app dark>

    <v-toolbar>
      <v-toolbar-side-icon>
        <img src="/static/img/raspberry-pi-logo.svg" height="40" class="ml-3"/>
      </v-toolbar-side-icon>
      <v-toolbar-title>
        <span class="headline">Raspberry Pi Dashboard</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-progress-circular
        class="mr-2"
        v-if="isLoading"
        indeterminate
        color="green"
        :size="30"
      >
      </v-progress-circular>

      <add-raspberry v-if="numberOfHostnames > 0"></add-raspberry>
    </v-toolbar>

    <!-- List Raspberry Pis -->
    <v-container
      v-if="raspberries.length > 0"
      class="raspberry__list pa-0 mt-3"
      fluid grid-list-xl>
        <v-layout row wrap justify-space-around>
          <v-flex
            lg4 md4 sm11 xs11
            :class="{ 'raspberry-fixed-size' : isBreakPointNotXS }"
            v-for="(raspberry, index) in raspberries" :key="index">

                <!-- Device is offline -->
                <raspberry-offline v-if="raspberry.is_online === false" :raspberry="raspberry">
                </raspberry-offline>

                <!-- Device is online -->
                <raspberry-online v-else :raspberry="raspberry">
                </raspberry-online>

          </v-flex>
        </v-layout>
    </v-container>

    <!-- Fallback if no Raspberries are configured -->
    <v-container v-if="numberOfHostnames == 0" fluid fill-height>
      <v-layout flex align-center justify-center>
        <v-flex xs4 class="text-xs-center">
          <p class="headline mb-5">
            You don't have any Raspberries configured.
            Get started by adding one. :-)
          </p>
          <add-raspberry></add-raspberry>
        </v-flex>
      </v-layout>
    </v-container>

  </v-app>
</template>

<script>
  export default {

    computed: {
      isLoading () {
        return this.$store.getters.isLoading
      },

      numberOfHostnames () {
        return this.$store.getters.hostnames.length
      },

      updateInterval () {
        return this.$store.getters.config.update_interval
      },

      raspberries () {
        return this.$store.getters.raspberries
      },

      isBreakPointNotXS () {
        return !this.$vuetify.breakpoint.xs
      }
    },

    methods: {
      loadRaspberries () {
        this.$store.dispatch('loadRapsberries')
      },

      setupUpdateInterval () {
        // Make sure the data is updated every x seconds
        setInterval(this.loadRaspberries, this.updateInterval)
      }
    },

    mounted () {
      if (this.numberOfHostnames > 0) {
        this.loadRaspberries()
        // this.setupUpdateInterval()
      }
    }
  }
</script>

<style scoped>
  .raspberry-fixed-size {
    min-width: 470px;
    max-width: 600px;
  }
</style>
