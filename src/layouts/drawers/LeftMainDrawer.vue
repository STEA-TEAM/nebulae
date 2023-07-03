<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const navigations = [
  {
    label: 'dashboard',
    icon: 'view_quilt',
    available: true,
    route: '/dashboard',
    separator: true,
  },
  {
    label: 'serial',
    icon: 'mdi-serial-port',
    available: false,
    route: '/serial',
    separator: false,
  },
  {
    label: 'usb',
    icon: 'mdi-usb',
    available: false,
    route: '/usb',
    separator: false,
  },
  {
    label: 'hid',
    icon: 'mdi-keyboard-settings',
    available: false,
    route: '/hid',
    separator: false,
  },
  {
    label: 'bluetooth',
    icon: 'mdi-bluetooth',
    available: true,
    route: '/bluetooth',
    separator: false,
  },
];

const { t } = useI18n();
const i18n = (relativePath: string) => {
  return t('layouts.drawers.LeftMainDrawer.' + relativePath);
};
</script>

<template>
  <q-drawer bordered overlay side="left">
    <q-list>
      <template v-for="(navigation, index) in navigations" :key="index">
        <q-item
          :clickable="navigation.available"
          :v-ripple="navigation.available"
          @click="$router.push(navigation.route)"
        >
          <q-item-section avatar>
            <q-icon
              :name="navigation.icon"
              :color="navigation.available ? 'primary' : 'grey'"
            />
          </q-item-section>
          <q-item-section :class="navigation.available ? '' : 'text-grey'">
            {{ i18n('navigations.' + navigation.label) }}
          </q-item-section>
        </q-item>
        <q-separator v-if="navigation.separator" />
      </template>
    </q-list>
  </q-drawer>
</template>

<style scoped></style>
