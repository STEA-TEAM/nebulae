<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';

import { createI18n } from 'utils/common.ts';

const { dark } = useQuasar();

const i18n = createI18n(useI18n(), 'pages.DashboardPage.');

const getImageUrl = (path: string) => {
  return new URL(`/src/assets/images/${path}`, import.meta.url).href;
};
</script>

<template>
  <q-page class="column items-center justify-center q-gutter-y-xl">
    <q-img
      :src="getImageUrl(`logo-color-${dark.isActive ? 'light' : 'dark'}.svg`)"
      height="50vmin"
      width="50vmin"
    />
    <div class="text-h1 text-weight-regular">
      {{ i18n('labels.title') }}
    </div>
    <div class="text-h5 text-grey">
      {{ i18n('labels.intro') }}
    </div>
  </q-page>
</template>
