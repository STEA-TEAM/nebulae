<template>
  <q-drawer
    v-model="isOpen"
    elevated
    overlay>
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

<script>

import {defineComponent, computed} from 'vue'

export default defineComponent({
  name: 'MainDrawer',
  props: {
    modelValue: {
      type: Boolean,
      default: () => false,
    }
  },
  setup(props, {emit}) {
    const isOpen = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });
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
        available: true,
        route: '/hid',
        separator: false,
      },
    ];
    return {isOpen, menuList};
  },
  methods: {
    i18n(relativePath) {
      return this.$t('layouts.drawers.main.' + relativePath);
    }
  },
})
</script>
