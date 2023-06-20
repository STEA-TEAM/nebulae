<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const menuList = [
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
    available: true,
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
    available: true,
    route: '/hid',
    separator: false,
  },
  {
    label: 'bluetooth',
    icon: 'mdi-bluetooth',
    available: true,
    route: '/bluetooth',
    separator: false,
  }
];

const { t } = useI18n();
const i18n = (relativePath: string) => {
  return t('layouts.drawers.LeftMainDrawer.' + relativePath);
};
</script>

<template>
  <q-drawer
    bordered
    overlay
    side="left">
    <q-list>
      <template v-for="(menuItem, index) in menuList" :key="index">
        <q-item
          :clickable="menuItem.available"
          :v-ripple="menuItem.available"
          @click="$router.push(menuItem.route)">
          <q-item-section avatar>
            <q-icon
              :name="menuItem.icon"
              :color="menuItem.available?'primary':'grey'"/>
          </q-item-section>
          <q-item-section :class="menuItem.available?'':'text-grey'">
            {{ i18n('labels.' + menuItem.label) }}
          </q-item-section>
        </q-item>
        <q-separator v-if="menuItem.separator"/>
      </template>
    </q-list>
  </q-drawer>
</template>

<style scoped>

</style>
