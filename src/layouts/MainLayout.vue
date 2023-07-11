<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { ref } from 'vue';

const { screen } = useQuasar();
const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};
</script>

<template>
  <q-layout view="hHh LpR fFf">
    <router-view
      :mobile="screen.lt.md"
      name="header"
      @toggle:left-drawer="toggleLeftDrawer"
      @toggle:right-drawer="toggleRightDrawer"
    />
    <router-view
      :mobile="screen.lt.md"
      :model-value="leftDrawerOpen"
      name="leftDrawer"
      @toggle:drawer="toggleLeftDrawer"
    />
    <q-page-container>
      <router-view />
    </q-page-container>
    <router-view
      :mobile="screen.lt.md"
      :model-value="rightDrawerOpen"
      name="rightDrawer"
    />
    <router-view
      :mobile="screen.lt.md"
      name="footer"
      @toggle:left-drawer="toggleLeftDrawer"
    />
  </q-layout>
</template>
