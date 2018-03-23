<template>

    <v-card class="mt-3 mb-4 pl-3 elevation-3">

        <remove-raspberry :raspberry="raspberry"></remove-raspberry>

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
                <div class="headline mb-3">{{ raspberry.hostname }}</div>
                <div class="subheading">
                    This Raspberry seems to be offline.
                </div>
            </v-flex>

        </v-layout>
        </v-container>

    </v-card>

</template>

<script>
export default {
  props: ['raspberry']
}
</script>
