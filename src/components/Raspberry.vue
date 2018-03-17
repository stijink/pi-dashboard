<template>

<v-card class="mt-3 mb-4 pl-3 elevation-3">

  <!-- Icon and Base informations -->
  <v-container fluid grid-list-lg class="mb-3">
    <v-layout row>
      <v-flex xs5 class="hidden-xs-only pt-0 pr-3">
        <v-card-media
          src="/static/img/raspberry-pi-board.svg"
          height="125px"
          contain
        ></v-card-media>
      </v-flex>

      <v-flex md7 xs12>
        <div>
          <div class="headline mb-1">{{ raspberry.hostname }}</div>

          <div class="mb-2">
            <strong>{{ raspberry.cpu.cores }} CPU Cores at {{ raspberry.cpu.speed }} MHz</strong>
          </div>
          <div>{{ raspberry.model }}</div>
          <div>{{ raspberry.operatingsystem }}</div>
          </div>
      </v-flex>

    </v-layout>
  </v-container>

  <!-- Metrics and Memory -->
  <v-container class="pt-0">
    <v-layout row wrap>

      <v-flex sm6 xs12>
       <div class="title mb-3">System Metrics</div>

        <div class="ma-1">
          <v-icon small class="mr-1">equalizer</v-icon>
          {{ raspberry.load }} System load
        </div>

        <div class="ma-1">
          <v-icon small class="mr-1">list</v-icon>
          {{ raspberry.processes }} Processes
        </div>

        <div class="ma-1">
          <v-icon small class="mr-1">watch_later</v-icon>
          {{ raspberry.uptime }} days uptime
        </div>

        <div class="ma-1">
          <v-icon small class="mr-1">toys</v-icon>
          {{ raspberry.temperature }} °C
        </div>
      </v-flex>

      <v-flex sm6 xs12>
        <div class="title mb-3">Memory</div>

        <div class="ma-1">
          <v-icon small class="mr-1">memory</v-icon>
          {{ raspberry.memory.total }} MB total
        </div>

        <div class="ma-1">
          <v-icon small class="mr-1">memory</v-icon>
          {{ raspberry.memory.used }} MB used
        </div>

        <div class="ma-1">
          <v-icon small class="mr-1">memory</v-icon>
          {{ raspberry.memory.free }} MB free
        </div>
      </v-flex>

    </v-layout>
  </v-container>

  <!-- Disks -->
  <v-container class="pt-0 mt-3">
    <v-layout row>

       <v-flex xs12>
        <div class="title mb-3">Disks</div>

        <div>
          <table class="ma-1">
            <tr>
              <td><strong>Mount</strong></td>
              <td><strong>Size</strong></td>
              <td class="hidden-xs-only"><strong>Used</strong></td>
              <td><strong>Free</strong></td>
            </tr>
            <tr v-for="(disk) in disks" :key="disk.name">
              <td class="pr-5">
                <v-icon small class="mr-2">sd_card</v-icon>{{ disk.name }}
              </td>
              <td class="pr-3">
                {{ formatDiskSize(disk.size) }}
              </td>
              <td class="pr-3 hidden-xs-only">
                {{ formatDiskSize(disk.used) }}
              </td>
              <td class="pr-3">
                {{ formatDiskSize(disk.free) }}
              </td>
            </tr>
          </table>
        </div>
      </v-flex>

    </v-layout>
  </v-container>

  </v-card>
</template>

<script>
  export default {
    props: ['raspberry'],

    data () {
      return {
        config: require('./../../config/config.json')
      }
    },

    computed: {
      disks () {
        const disks = []

        Object.keys(this.raspberry.disks).forEach((diskName) => {
          const disk = this.raspberry.disks[diskName]
          disk.name = diskName

          if (this.isRelevantDisk(diskName)) {
            disks.push(disk)
          }
        })

        return disks
      }
    },

    methods: {
      isRelevantDisk (name) {
        return !this.config.excluded_disks.includes(name)
      },

      formatDiskSize (size) {
        if (size > 100000) {
          return Math.round((size / 1024 / 1024), 2) + ' GB'
        }

        return Math.round((size / 1024), 2) + ' MB'
      }
    }
  }
</script>
