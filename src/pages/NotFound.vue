<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        {{ i18n('labels.title') }}
      </div>

      <div class="text-h2" style="opacity:.4">
        {{ i18n('labels.intro') }}
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        :label="i18n('labels.return')"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NotFound',
  methods: {
    i18n(relativePath) {
      return this.$t('pages.notFound.' + relativePath);
    },
  }
})
</script>
