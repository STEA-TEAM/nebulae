<template>
  <q-header elevated>
    <q-toolbar class="q-electron-drag">
      <q-btn
        flat
        dense
        round
        icon="menu"
        @click="$emit('click:leftMenu')"/>
      <q-avatar>
        <q-img src="svg/logo-white.svg" alt="logo"/>
      </q-avatar>
      <q-toolbar-title>
        {{ i18n('labels.title') }}
      </q-toolbar-title>
      <q-space/>
      <q-btn class="q-mx-sm" dense flat icon="language">
        <LanguagesMenu/>
      </q-btn>
      <q-btn class="q-mx-sm" dense flat icon="settings">
        <SettingsMenu/>
      </q-btn>
      <div v-if="$q.platform.is.electron" class="row q-ml-sm q-gutter-x-sm">
        <q-btn dense flat icon="minimize" @click="minimize"/>
        <q-btn dense flat icon="crop_square" @click="toggleMaximize"/>
        <q-btn dense flat icon="close" @click="closeApp"/>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import {defineComponent} from 'vue'
import SettingsMenu from "components/SettingsMenu";
import LanguagesMenu from "components/LanguagesMenu";

export default defineComponent({
  name: "MainHeader",
  components: {LanguagesMenu, SettingsMenu},
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
    }
  },
})
</script>

<style scoped>

</style>
