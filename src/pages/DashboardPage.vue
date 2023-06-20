<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';

const { dark } = useQuasar();
const { t } = useI18n();
const i18n = (relativePath: string) => {
  return t('pages.DashboardPage.' + relativePath);
};
const getImageUrl = (path: string) => {
  return new URL(`/src/assets/${path}`, import.meta.url).href;
};
</script>

<template>
  <q-page class="column items-center justify-center q-gutter-y-xl">
    <q-img
      :src="
        getImageUrl(`svg/logo-color-${dark.isActive ? 'light' : 'dark'}.svg`)
      "
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
