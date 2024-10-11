<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { bus } from 'boot/bus';
import ResizeLine from 'components/ResizeLine.vue';
import { RIGHT_DRAWER_WIDTHS } from 'constants/common';
import { createI18n } from 'utils/common.ts';

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

const i18n = createI18n(useI18n(), 'layouts.drawers.RightMainDrawer.');
</script>

<template>
  <q-drawer
    :width="$q.screen.lt.md ? RIGHT_DRAWER_WIDTHS.full : width"
    :bordered="!$q.screen.lt.md"
    no-swipe-backdrop
    no-swipe-close
    no-swipe-open
    overlay
    persistent
    side="right"
  >
    <q-tabs
      v-show="$q.screen.lt.md || width > RIGHT_DRAWER_WIDTHS.min"
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
      />
      <q-btn
        v-show="$q.screen.lt.md"
        class="q-ml-sm"
        icon="mdi-close"
        flat
        square
        stretch
        @click="bus.emit('drawer', 'close', 'right')"
      />
    </q-tabs>
    <q-btn-dropdown
      v-show="!$q.screen.lt.md && width === RIGHT_DRAWER_WIDTHS.min"
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
      v-show="!$q.screen.lt.md"
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
