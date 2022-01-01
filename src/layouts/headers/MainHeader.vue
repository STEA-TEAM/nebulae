<template>
  <q-header elevated>
    <q-toolbar class="q-electron-drag">
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="$emit('click:leftMenu')"/>
      <q-avatar>
        <q-img src="svg/logo-white.svg" alt="logo"/>
      </q-avatar>
      <q-toolbar-title>
        NebulaE
      </q-toolbar-title>
      <q-space/>
      <div v-if="$q.platform.is.electron" class="row q-gutter-x-sm">
        <q-btn dense flat icon="minimize" @click="minimize"/>
        <q-btn dense flat icon="crop_square" @click="toggleMaximize"/>
        <q-btn dense flat icon="close" @click="closeApp"/>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "MainHeader",
  setup() {
    function minimize() {
      if (process.env.MODE === 'electron') {
        window['electronWindowApi'].minimize()
      }
    }

    function toggleMaximize() {
      if (process.env.MODE === 'electron') {
        window['electronWindowApi'].toggleMaximize()
      }
    }

    function closeApp() {
      if (process.env.MODE === 'electron') {
        window['electronWindowApi'].close()
      }
    }

    return {minimize, toggleMaximize, closeApp}
  },
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
