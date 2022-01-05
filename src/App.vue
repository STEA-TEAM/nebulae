<template>
  <router-view/>
</template>
<script>
import {defineComponent} from 'vue';
import {Notify, useQuasar} from "quasar";

export default defineComponent({
  name: 'App',
  setup() {
    const $q = useQuasar();
    if ($q.localStorage.has('settings.darkMode')) {
      $q.dark.set($q.localStorage.getItem('settings.darkMode'));
    } else {
      $q.dark.set('auto');
    }
  },
  created() {
    if (this.$q.localStorage.has('settings.language')) {
      this.$i18n.locale = this.$q.localStorage.getItem(
        'settings.language'
      );
    } else {
      this.$i18n.locale = this.$q.lang.getLocale();
    }
    navigator["hid"].addEventListener("connect", () => {
      Notify.create({
        type: 'positive',
        message: this.i18n('notifications.onConnect'),
        icon: 'link'
      });
    });
    navigator["hid"].addEventListener("disconnect", () => {
      Notify.create({
        type: 'warning',
        message: this.i18n('notifications.onDisconnect'),
        icon: 'link_off'
      });
    });
  },
  methods: {
    i18n(relativePath) {
      return this.$t('global.hid.' + relativePath);
    },
  }
})
</script>
