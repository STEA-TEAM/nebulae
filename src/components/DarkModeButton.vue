<script lang="ts" setup>
import { useSettingsStore } from 'stores/settings';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { createI18n } from 'utils/common.ts';

const { toggleDarkMode } = useSettingsStore();
const { darkModeColorAndIcon } = storeToRefs(useSettingsStore());

const i18n = createI18n(useI18n(), 'components.DarkModeButton.');
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
      class="text-no-wrap"
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
