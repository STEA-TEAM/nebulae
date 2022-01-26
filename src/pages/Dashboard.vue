<template>
  <q-page class="flex flex-center column q-gutter-lg">
    <q-img
      :src="$q.dark.isActive?'svg/logo-color-light.svg':'svg/logo-color-dark.svg'"
      height="50vmin"
      width="50vmin"/>
    <div class="text-h1 text-weight-regular">
      {{ i18n('labels.title') }}
    </div>
    <div class="text-h5 text-grey">
      {{ i18n('labels.intro') }}
    </div>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'Dashboard',
  methods: {
    i18n(relativePath) {
      return this.$t('pages.dashboard.' + relativePath);
    },
  }
})
</script>
