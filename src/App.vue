<template>
  <v-app dark>

    <v-toolbar class="mb-5">
      <v-toolbar-side-icon>
        <img src="/static/img/raspberry-pi-logo.svg" height="40" class="ml-3"/>
      </v-toolbar-side-icon>
      <v-toolbar-title>
        <span class="headline">Raspberry Pi Dashboard</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-progress-circular
        v-if="isLoading"
        indeterminate
        color="green"
        :size="30"
      >
      </v-progress-circular>

      <div v-if="config.debugEnabled" v-resize="onResize" class="ml-3">
        <span><strong>Size:</strong> {{ debug.size }} </span>
      </div>

    </v-toolbar>

    <v-container
      :if="isLoaded"
      class="raspberry__list pa-0"
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

  </v-app>
</template>

<script>
  // import axios from 'axios'
  const raspberryFixture = require('./../config/fixture.json')

  export default {
    data () {
      return {
        config: require('./../config/config.json'),
        raspberries: [],
        isLoaded: false,
        isLoading: true,
        debug: {
          size: 0
        }
      }
    },

    computed: {
      isBreakPointNotXS () {
        return !this.$vuetify.breakpoint.xs
      }
    },

    methods: {
      loadAll () {
        this.isLoading = true

        this.config.hosts.forEach((hostname, index) => {
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
      }
    },

    mounted () {
      this.onResize()
      this.loadAll()

      // Make sure the data is updated every x seconds
      setInterval(this.loadAll, this.config.update_interval)
    }
  }
</script>

<style scoped>
  .raspberry-fixed-size {
    min-width: 470px;
    max-width: 600px;
  }
</style>
