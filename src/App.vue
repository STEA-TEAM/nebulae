<template>
  <router-view/>
</template>
<script>
import {defineComponent} from 'vue';
import {useQuasar} from "quasar";

export default defineComponent({
  name: 'App',
  setup() {
    const $q = useQuasar();
    if ($q.localStorage.has('settings.darkMode')) {
      $q.dark.set($q.localStorage.getItem('settings.darkMode'));
    } else {
      $q.dark.set('auto');
    }
  }
})
</script>
