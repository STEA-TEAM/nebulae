<template>
  <q-menu>
    <q-list style="min-width: 100px">
      <q-item tag="label" v-ripple>
        <q-item-section>
          {{ i18n('menu.darkMode') }}
        </q-item-section>
        <q-item-section avatar>
          <q-toggle
            color="black"
            checked-icon="dark_mode"
            unchecked-icon="light_mode"
            :model-value="$q.dark.isActive"
            @update:model-value="toggleDarkMode"/>
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "SettingsMenu",
  methods: {
    i18n(relativePath) {
      return this.$t('layouts.headers.main.' + relativePath);
    },
    toggleDarkMode() {
      this.$q.dark.toggle();
      this.$q.localStorage.set('settings.darkMode', this.$q.dark.mode);
    }
  },
})
</script>

<style scoped>

</style>
