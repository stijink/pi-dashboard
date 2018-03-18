<template>
    <v-dialog v-model="dialog" persistent max-width="500">
      <v-btn color="success" dark slot="activator">
        <v-icon dark class="pr-2">developer_board</v-icon>
        Add Raspberry
      </v-btn>
      <v-card>
        <v-card-title class="headline">Add a new Raspberry Pi</v-card-title>
        <v-card-text>
          <p><strong>Note:</strong></p>
          <p>The server component
            <a class="github" href="https://github.com/stijink/raspberry-status-server" target="_blank">
            https://github.com/stijink/raspberry-status-server
            </a>
            should be up and running on the device you want to add.
          </p>

        <v-text-field
          v-model="hostname"
          :rules="[isHostnameValid]"
          label="Enter hostname"
          prepend-icon="developer_board"
          single-line
        ></v-text-field>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" flat @click.native="dialog = false">Cancel</v-btn>
          <v-btn color="white" flat @click.native="addDevice">Add Device</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        hostname: null
      }
    },

    methods: {
      isHostnameValid (hostname) {
        if (hostname === null) {
          return true
        }

        if (hostname.length === 0) {
          return 'The hostname should not be empty'
        }

        return true
      },

      addDevice () {
        let hostnames = localStorage.getItem('hostnames') || []

        if (hostnames.length > 0) {
          hostnames = JSON.parse(hostnames)
        }

        hostnames.push(this.hostname)
        localStorage.setItem('hostnames', JSON.stringify(hostnames))
        this.dialog = false
      }
    }
  }
</script>

<style scoped>
  .github:link, .github:visited, .github:hover, .github:active {
    color: white;
  }
</style>