<template>
  <q-tree
    accordion
    v-model:expanded="expanded"
    node-key="id"
    :nodes="deviceForest">
    <template v-slot:header-img="prop">
      <div class="row items-center q-gutter-x-sm">
        <q-avatar size="sm">
          <img alt="rootAvatar" :src="prop.node.avatar">
        </q-avatar>
        <div>{{ prop.node.label }}</div>
        <div v-if="prop.node.side" class="column">
          <div
            v-for="(item,index) in prop.node.side"
            :key="index"
            class="text-caption text-grey q-ml-sm">
            {{ item }}
          </div>
        </div>
      </div>
    </template>
    <template v-slot:header-icon="prop">
      <div class="row items-center q-gutter-x-sm">
        <q-avatar size="sm">
          <q-icon v-if="prop.node.icon" size="sm" :name="prop.node.icon"/>
        </q-avatar>
        <div>{{ prop.node.label }}</div>
        <div v-if="prop.node.side" class="column">
          <div
            v-for="(item,index) in prop.node.side"
            :key="index"
            class="text-caption text-grey q-ml-sm">
            {{ item }}
          </div>
        </div>
      </div>
    </template>
    <template v-slot:body-comments="prop" class="column">
      <div v-for="(comment,index) in prop.node.comments" :key="index">
        {{ comment }}
      </div>
    </template>
  </q-tree>
</template>

<script>
import {computed, defineComponent, ref} from 'vue'

export default defineComponent({
  name: 'HidDeviceForest',
  props: {
    devices: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    function parseReports(idPrefix, collection) {
      let reportTrees = [];
      let reports = {};
      let icons = {
        'feature': 'mdi-arrow-left-right',
        'input': 'mdi-import',
        'output': 'mdi-export',
      };
      for (const collectionKey in collection) {
        let isReports = false
        let type;
        if (collectionKey === 'featureReports') {
          isReports = true;
          type = 'feature';
        } else if (collectionKey === 'inputReports') {
          isReports = true;
          type = 'input';
        } else if (collectionKey === 'outputReports') {
          isReports = true;
          type = 'output';
        }
        if (isReports) {
          /** Start processing collection.xxxReports */
          let reportIndex = 0;
          collection[collectionKey].forEach((report) => {

            /** Start processing collection.xxxReports[n].items */
            let itemsTree = {
              id: `${idPrefix}.reportId_${report.reportId}.${type}_report_${reportIndex}`,
              header: 'icon',
              label: `${type} report ${reportIndex}`,
              icon: icons[type]
            };
            let items = [];
            let itemIndex = 0;
            report.items.forEach((item) => {
              let itemTree = {
                id: `${itemsTree.id}.item_${itemIndex}`,
                header: 'icon',
                label: `item ${itemIndex}`,
              };

              /** Start processing collection.xxxReports[n].items[n] */
              let itemPairs = [];
              for (const itemKey in item) {
                itemPairs.push({
                  id: `${itemTree.id}.${itemKey}`,
                  header: 'icon',
                  label: `${itemKey}: ${itemKey === 'usages' ? '[' + item[itemKey].join(', ') + ']' : item[itemKey]}`,
                });
              }
              /** End processing collection.xxxReports[n].items[n] */

              itemTree['children'] = itemPairs;
              items.push(itemTree);
              itemIndex++;
            });
            if (items.length) {
              itemsTree['children'] = items;
            }
            /** End processing collection.xxxReports[n].items */

            if (!reports[report.reportId]) {
              reports[report.reportId] = [];
            }
            reports[report.reportId].push(itemsTree);
            reportIndex++;
          });
          /** End processing collection.xxxReports */
        }
      }
      for (const reportId in reports) {
        let reportTree = {
          id: `${idPrefix}.reportId_${reportId}`,
          header: 'icon',
          label: `reportId: ${reportId}`,
          icon: 'mdi-identifier',
          children: reports[reportId]
        };
        reportTrees.push(reportTree);
      }
      return reportTrees;
    }

    const deviceForest = computed(() => {
      let rootForest = [];
      let deviceIndex = 0;
      props.devices.forEach(device => {
        let rootTree = {
          id: `root_${deviceIndex}`,
          header: 'img',
          label: device.productName ? device.productName : 'Anonymous',
          avatar: device.icon,
          side: [
            `VID:0x${
              device.vendorId['toString'](16).toUpperCase().padStart(4, '0')
            }`,
            `PID:0x${
              device.productId['toString'](16).toUpperCase().padStart(4, '0')
            }`
          ],
        };

        if (device["collections"].length) {
          let collections = [];
          let collectionIndex = 0;
          device["collections"].forEach(collection => {
            let collectionTree = {
              id: `root_${deviceIndex}.collection_${collectionIndex}`,
              header: 'icon',
              label: `collection ${collectionIndex}`,
              icon: 'mdi-video-input-component',
              children: parseReports(
                `root_${deviceIndex}.collection_${collectionIndex}`,
                collection
              )
            }
            collections.push(collectionTree);
            collectionIndex++;
          });
          rootTree.children = collections;
        }
        rootForest.push(rootTree);
        deviceIndex++;
      });
      return rootForest;
    });
    const expanded = ref([]);
    if (deviceForest.value.length) {
      deviceForest.value.forEach(device => {
        expanded.value.push(device.id);
        if (device.hasOwnProperty('children')) {
          device.children.forEach(collection => {
            if (collection.hasOwnProperty('children')) {
              expanded.value.push(collection.id);
            }
          });
        }
      });
    }
    return {
      deviceForest,
      expanded
    }
  },
  methods: {
    i18n(relativePath) {
      return this.$t('components.hidDeviceTree.' + relativePath);
    }
  }
})
</script>
