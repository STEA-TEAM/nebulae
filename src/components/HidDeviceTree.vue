<template>
  <q-tree
    accordion
    v-model:expanded="expanded"
    node-key="id"
    :nodes="[deviceTree]">
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
  name: 'HidDeviceTree',
  props: {
    modelValue: {
      type: Object,
      default: () => {
      },
    },
  },
  setup(props) {
    function parseReports(id, label, icon, reports) {
      let reportsTree = {
        id: id,
        header: 'icon',
        label: label,
        icon: icon,
      };
      if (reports.length) {
        let featureReports = [];
        reports.forEach(featureReport => {
          let reportTree = {
            id: `${id}.reportId:${featureReport['reportId']}`,
            header: 'icon',
            label: `reportId: ${featureReport['reportId']}`,
            icon: 'mdi-identifier',
          };
          if (featureReport.items.length) {
            let items = [];
            let itemIndex = 1;
            featureReport.items.forEach(item => {
              let itemTree = {
                id: `${id}.reportId:${featureReport['reportId']}.item_${itemIndex}`,
                header: 'icon',
                label: `item ${itemIndex}`,
                children: [],
              };
              for (const itemKey in item) {
                if (itemKey === 'usages') {
                  itemTree.children.push({
                    id: `${id}.reportId:${featureReport['reportId']}.item_${itemIndex}.itemKey:[${item[itemKey].join(', ')}]`,
                    header: 'icon',
                    label: `${itemKey}: [${item[itemKey].join(', ')}]`,
                  });
                } else {
                  itemTree.children.push({
                    id: `${id}.reportId:${featureReport['reportId']}.item_${itemIndex}.itemKey:${item[itemKey]}`,
                    header: 'icon',
                    label: `${itemKey}: item[itemKey]`,
                  });
                }
              }
              items.push(itemTree);
              itemIndex++;
            });
            reportTree['children'] = items;
          }
          featureReports.push(reportTree);
        });
        reportsTree['children'] = featureReports;
      }
      return reportsTree;
    }

    const deviceTree = computed(() => {
      if (!props.modelValue) {
        return {};
      }
      let rootTree = {
        id: 'root',
        header: 'img',
        label: props.modelValue.productName ? props.modelValue.productName : 'Anonymous',
        avatar: props.modelValue.icon,
        side: [
          `VID:0x${
            props.modelValue.vendorId['toString'](16).toUpperCase().padStart(4, '0')
          }`,
          `PID:0x${
            props.modelValue.productId['toString'](16).toUpperCase().padStart(4, '0')
          }`
        ],
      };

      if (props.modelValue["collections"].length) {
        let collections = [];
        let collectionIndex = 1;
        props.modelValue["collections"].forEach(collection => {
          let outputReportsTree = parseReports(
            `collection_${collectionIndex}.outputReports`,
            'outputReports',
            'mdi-export',
            collection['outputReports']
          );
          let inputReportsTree = parseReports(
            `collection_${collectionIndex}.inputReports`,
            'inputReports',
            'mdi-import',
            collection['inputReports']
          );
          let featureReportsTree = parseReports(
            `collection_${collectionIndex}.featureReports`,
            'featureReports',
            'mdi-feature-search-outline',
            collection['featureReports']
          );
          let collectionTree = {
            id: `collection_${collectionIndex}`,
            header: 'icon',
            label: `collection ${collectionIndex}`,
            icon: 'mdi-video-input-component',
            children: [
              outputReportsTree,
              inputReportsTree,
              featureReportsTree,
            ],
          }
          collections.push(collectionTree);
          collectionIndex++;
        });
        rootTree.children = collections;
      }

      return rootTree;
    });
    const expanded = ref(['root']);
    if (props.modelValue && deviceTree.value.hasOwnProperty('children')) {
      deviceTree.value.children.forEach(collection => {
        if (collection.children[0].hasOwnProperty('children')) {
          expanded.value.push(collection.id);
          expanded.value.push(`${collection.id}.outputReports`);
        }
      });
    }
    return {
      deviceTree,
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
