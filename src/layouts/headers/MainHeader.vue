<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

import DarkModeButton from 'components/DarkModeButton.vue';

const { t } = useI18n();
const i18n = (relativePath: string) => {
  return t('layouts.headers.MainHeader.' + relativePath);
};

const emit = defineEmits(['toggle:left-drawer', 'toggle:right-drawer']);
const toggleLeftDrawer = () => {
  emit('toggle:left-drawer', true);
};

const toggleRightDrawer = () => {
  emit('toggle:right-drawer', true);
};
</script>

<template>
  <q-header bordered class="bg-primary text-white">
    <q-toolbar>
      <q-btn dense flat icon="menu" round @click="toggleLeftDrawer" />
      <q-toolbar-title>
        <q-avatar>
          <q-img src="~assets/svg/logo-simple-light.svg" />
        </q-avatar>
        {{ i18n('labels.title') }}
      </q-toolbar-title>
      <dark-mode-button/>
      <q-btn dense flat icon="menu" round @click="toggleRightDrawer" />
    </q-toolbar>
  </q-header>
</template>

<style scoped></style>
