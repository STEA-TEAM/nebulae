<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import ResizeLine from 'components/ResizeLine.vue';
import { useSettingsStore } from 'stores/settings';
import { RIGHT_DRAWER_WIDTHS } from 'utils/constants';

const { isMobile } = storeToRefs(useSettingsStore());

const emits = defineEmits(['toggle:drawer']);

const tabs = [
  {
    name: 'devices',
    icon: 'devices',
  },
  {
    name: 'messages',
    icon: 'mdi-message-bookmark-outline',
  },
];

const tab = ref({
  name: 'devices',
  icon: 'devices',
});

const width = ref(RIGHT_DRAWER_WIDTHS.default);

const { t } = useI18n();
const i18n = (relativePath: string) => {
  return t('layouts.drawers.RightMainDrawer.' + relativePath);
};
</script>

<template>
  <q-drawer
    :width="isMobile ? RIGHT_DRAWER_WIDTHS.full : width"
    :bordered="!isMobile"
    no-swipe-backdrop
    no-swipe-close
    no-swipe-open
    overlay
    side="right"
  >
    <q-tabs
      v-show="isMobile || width > RIGHT_DRAWER_WIDTHS.min"
      v-model="tab.name"
      inline-label
      no-caps
    >
      <q-tab
        v-for="(tabItem, index) in tabs"
        :key="index"
        :icon="tabItem.icon"
        :label="i18n(`tabs.${tabItem.name}`)"
        :name="tabItem.name"
        @toggle:drawer="emits('toggle:drawer')"
      />
      <q-btn
        v-show="isMobile"
        class="q-ml-sm"
        icon="mdi-close"
        flat
        square
        stretch
        @click="emits('toggle:drawer')"
      />
    </q-tabs>
    <q-btn-dropdown
      v-show="!isMobile && width === RIGHT_DRAWER_WIDTHS.min"
      :icon="tab.icon"
      :label="i18n(`tabs.${tab.name}`)"
      class="full-width"
      no-caps
      outline
      padding="12px 0"
      square
    >
      <q-list>
        <q-item
          v-for="(tabItem, index) in tabs"
          :key="index"
          v-close-popup
          clickable
          @click="tab = tabItem"
        >
          <q-item-section avatar>
            <q-icon :name="tabItem.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ i18n(`tabs.${tabItem.name}`) }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <q-tab-panels v-model="tab.name">
      <q-tab-panel class="q-pa-none" name="devices">
        <router-view
          :mini="width === RIGHT_DRAWER_WIDTHS.min"
          name="devicePanel"
        />
      </q-tab-panel>
      <q-tab-panel class="q-pa-none" name="messages">
        <router-view
          :mini="width === RIGHT_DRAWER_WIDTHS.min"
          name="messagePanel"
        />
      </q-tab-panel>
    </q-tab-panels>
    <resize-line
      v-show="!isMobile"
      v-model="width"
      :max-size="RIGHT_DRAWER_WIDTHS.max"
      :min-size="RIGHT_DRAWER_WIDTHS.min"
      :snap-size="RIGHT_DRAWER_WIDTHS.snap"
      class="absolute-left full-height"
      reverse
    />
  </q-drawer>
</template>

<style scoped></style>
