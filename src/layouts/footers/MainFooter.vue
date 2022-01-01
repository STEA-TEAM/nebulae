<template>
  <q-footer class="bg-white text-grey">
    <q-toolbar>
      <q-toolbar-title>
        <div>Title</div>
      </q-toolbar-title>
    </q-toolbar>
  </q-footer>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "MainFooter",
  methods: {
    i18n(relativePath) {
      return this.$t('layouts.footers.main.' + relativePath);
    }
  },
})
</script>

<style scoped>

</style>
