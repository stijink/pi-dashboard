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

      <add-raspberry v-if="numberOfHosts > 0"></add-raspberry>

      <div v-if="config.debugEnabled" v-resize="onResize" class="ml-3">
        <span><strong>Size:</strong> {{ debug.size }} </span>
      </div>

    </v-toolbar>

    <!-- List Raspberry Pis -->
    <v-container
      v-if="isLoaded && numberOfHosts > 0"
      class="raspberry__list pa-0 mt-3"
      fluid grid-list-xl>
        <v-layout row wrap justify-space-around>
          <v-flex
            lg4 md4 sm11 xs11
            :class="{ 'raspberry-fixed-size' : isBreakPointNotXS }"
            v-for="(raspberry, index) in raspberries" :key="index">

            <raspberry :raspberry="raspberry"></raspberry>

          </v-flex>
        </v-layout>
    </v-container>

    <!-- Fallback if no Raspberries are configured -->
    <v-container v-if="numberOfHosts == 0" fluid fill-height>
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
  // import axios from 'axios'
  const raspberryFixture = require('./../config/fixture.json')

  export default {
    data () {
      return {
        config: require('./../config/config.json'),
        hostnames: [],
        raspberries: [],
        isLoaded: false,
        isLoading: false,
        debug: {
          size: 0
        }
      }
    },

    computed: {
      isBreakPointNotXS () {
        return !this.$vuetify.breakpoint.xs
      },

      numberOfHosts () {
        return this.hostnames.length
      }
    },

    methods: {
      getHostnames () {
        const hostnames = localStorage.getItem('hostnames') || []
        this.hostnames = JSON.parse(hostnames)
      },

      loadAll () {
        this.isLoading = true

        this.hostnames.forEach((hostname, index) => {
          this.raspberries[index] = this.loadOne(hostname)
        })

        if (this.raspberries.length > 0) {
          this.isLoaded = true

          setTimeout(() => {
            this.isLoading = false
          }, 700)
        }
      },

      loadOne (hostname) {
        const fixture = raspberryFixture
        fixture.hostname = hostname
        return fixture

        /*
          axios.get(hostname).then((response) => {
            return response.data
          })
        */
      },

      onResize () {
        this.debug.size = this.$vuetify.breakpoint.name
      },

      setupUpdateInterval () {
        // Make sure the data is updated every x seconds
        setInterval(this.loadAll, this.config.update_interval)
      }
    },

    mounted () {
      this.getHostnames()
      this.onResize()

      if (this.numberOfHosts > 0) {
        this.loadAll()
        this.setupUpdateInterval()
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
