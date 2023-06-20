<script lang="ts" setup>
import { useSettingsStore } from 'stores/settings';

const { applyDarkMode } = useSettingsStore();

applyDarkMode();
</script>

<template>
  <router-view />
</template>
