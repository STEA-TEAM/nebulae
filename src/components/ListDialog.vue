<template>
  <q-dialog
    ref="dialogRef"
    :position="position"
    seamless
    @hide="onDialogHide">
    <q-card class="q-dialog-plugin hide-scrollbar">
      <q-card-section>
        <div class="text-h6">
          {{ title }}
        </div>
      </q-card-section>
      <q-separator/>
      <q-list separator>
        <q-item v-if="!list.length">
          <q-item-section>
            <q-item-label class="text-italic text-grey">
              {{ noItemText }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          v-for="(item,index) in list"
          :key="index"
          clickable
          @click="selectCallback(item)">
          <q-item-section avatar>
            <q-btn
              color="negative"
              dense
              flat
              icon="delete"
              @click.stop.prevent="removeCallback(index)">
            </q-btn>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              {{ item[labelKey] }}
            </q-item-label>
            <q-item-label caption>
              {{ item[captionKey] }}
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-chip>
              <q-avatar color="primary" text-color="white">
                {{ item[chipNumberKey] }}
              </q-avatar>
              {{ chipText }}
            </q-chip>
            <q-item-label>
            </q-item-label>
          </q-item-section>
          <q-tooltip
            :delay="250"
            anchor="center left"
            max-width="19ch"
            self="center right"
            transition-hide="jump-right"
            transition-show="jump-left">
            <div class="text-weight-bold">
              {{ tooltipTitle }}
            </div>
            <div>
              {{ item[tooltipKey] }}
            </div>
          </q-tooltip>
        </q-item>
      </q-list>
      <q-separator/>
      <q-card-actions align="stretch">
        <q-btn
          class="full-width"
          flat
          :icon-right="dismissIcon"
          @click="onDismissClick">
          {{ dismissText }}
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import {computed, defineComponent} from "vue";
import {useDialogPluginComponent} from 'quasar'

export default defineComponent({
  name: "ListDialog",
  emits: useDialogPluginComponent.emits,
  props: {
    list: {type: Array, default: () => []},
    position: {type: String, default: "standard",},

    title: {type: String, default: "Item List",},
    noItemText: {type: String, default: "No item",},
    dismissText: {type: String, default: "Dismiss",},
    chipText: {type: String, default: "chipText",},
    tooltipTitle: {type: String, default: "Item Info",},

    tooltipWidth: {type: String, default: "32ch",},

    labelKey: {type: String, default: "label",},
    captionKey: {type: String, default: "caption",},
    chipNumberKey: {type: String, default: "chipNumber",},
    tooltipKey: {type: String, default: "tooltip",},

    selectCallback: {type: Function, default: (value) => console.log(value)},
    removeCallback: {type: Function, default: (value) => console.log(value)},
  },
  setup(props) {
    const {dialogRef, onDialogHide,} = useDialogPluginComponent()
    const icons = {
      standard: 'close',
      top: 'expand_less',
      right: 'chevron_right',
      bottom: 'expand_more',
      left: 'chevron_left',
    };
    const dismissIcon = computed(() => icons[props.position]);
    return {
      dialogRef,
      onDialogHide,
      dismissIcon,
    }
  },
  methods: {
    onDismissClick() {
      this.hide();
    },
  },
});
</script>

<style scoped>

</style>
