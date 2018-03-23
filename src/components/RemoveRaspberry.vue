<template>

    <v-btn color="gey-blue darken-3" dark small absolute top right fab
      @click.native="removeHost(raspberry.hostname)">
      <v-icon>remove</v-icon>
    </v-btn>

</template>

<script>
  export default {
    props: ['raspberry'],

    methods: {
      removeHost (hostname) {
        this.$store.dispatch('removeHostname', hostname)
      }
    }
  }
</script>
