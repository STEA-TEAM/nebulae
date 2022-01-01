<template>
  <q-layout class="hide-scrollbar" :view="layout.now">
    <router-view
      name="header"
      @click:leftMenu="drawer.active = !drawer.active"/>

    <router-view
      name="drawer"
      v-model="drawer.active"/>

    <q-page-container>
      <router-view/>
    </q-page-container>

    <router-view
      name="footer"/>
  </q-layout>
</template>

<script>
import {defineComponent, ref} from 'vue'

export default defineComponent({
  name: 'MainLayout',
  data() {
    return {
      layout: {
        now: 'hHh lpR fFf',
        views: [
          'lhh lpR fFf',
          'lhh lpR fFf',
          'lHh lpR fFf',
          'lHh lpR fFf',
        ]
      },
      drawer: {
        active: ref(false),
      },
    }
  },
  methods: {
    i18n(relativePath) {
      return this.$t('layouts.main.' + relativePath);
    },
  }
})
</script>
