<script lang="ts" setup>
import { useSettingsStore } from 'stores/settings';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

const { toggleDarkMode } = useSettingsStore();
const { darkModeColorAndIcon } = storeToRefs(useSettingsStore());

const { t } = useI18n();
const i18n = (relativePath: string) => {
  return t('components.DarkModeButton.' + relativePath);
};
</script>

<template>
  <q-btn
    :icon="darkModeColorAndIcon.icon"
    :text-color="darkModeColorAndIcon.color"
    flat
    round
    @click="toggleDarkMode"
  >
    <q-tooltip
      anchor="center right"
      self="center left"
      transition-hide="jump-left"
      transition-show="jump-right"
    >
      {{ i18n('labels.toggleDarkMode') }}
    </q-tooltip>
  </q-btn>
</template>

<style scoped></style>
