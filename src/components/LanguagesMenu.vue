<template>
  <q-menu fit>
    <q-list>
      <q-item
        v-for="langOption in langOptions"
        :key="langOption.value"
        clickable
        @click="setLanguage(langOption.value)"
        v-close-popup>
        <q-item-section class="text-center">
          {{ langOption.label }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script>
import {defineComponent} from "vue";

import languages from 'quasar/lang/index.json'

export default defineComponent({
  name: "LanguagesMenu",
  setup() {
    const appLanguages = languages.filter(lang =>
      ['en-US', 'zh-CN'].includes(lang.isoName)
    );
    const langOptions = appLanguages.map(lang => ({
      label: lang.nativeName, value: lang.isoName
    }))
    return {langOptions}
  },
  methods: {
    setLanguage(lang) {
      this.$i18n.locale = lang;
      this.$q.localStorage.set('settings.language', this.$i18n.locale);
    },
    i18n(relativePath) {
      return this.$t('components.languagesMenu.' + relativePath);
    },
  },
})
</script>

<style scoped>

</style>
