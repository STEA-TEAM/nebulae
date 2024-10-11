<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

import { bus } from 'boot/bus.ts';
import DarkModeButton from 'components/DarkModeButton.vue';
import { createI18n } from 'utils/common.ts';

const i18n = createI18n(useI18n(), 'layouts.headers.MainHeader.');
</script>

<template>
  <q-header bordered class="bg-primary text-white">
    <q-toolbar>
      <q-btn
        dense
        flat
        icon="menu"
        round
        @click="bus.emit('drawer', 'toggle', 'left')"
      />
      <q-toolbar-title>
        <q-avatar>
          <q-img src="~assets/images/logo-simple-light.svg" />
        </q-avatar>
        {{ i18n('labels.title') }}
      </q-toolbar-title>
      <dark-mode-button />
      <q-btn
        dense
        flat
        icon="menu"
        round
        @click="bus.emit('drawer', 'toggle', 'right')"
      />
    </q-toolbar>
  </q-header>
</template>

<style scoped></style>
