<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="$emit('click:leftMenu')"/>

      <q-toolbar-title>
        Quasar App
      </q-toolbar-title>

      <div>Quasar v{{ $q.version }}</div>
    </q-toolbar>
  </q-header>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "MainHeader",
  methods: {
    i18n(relativePath) {
      return this.$t('layouts.headers.main.' + relativePath);
    },
    log(e) {
      console.log(e);
    }
  },
})
</script>

<style scoped>

</style>
