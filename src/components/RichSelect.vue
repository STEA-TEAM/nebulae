<template>
  <q-select
    clearable
    color="primary"
    :disable="disabled"
    :display-value="selected?`${selected[labelKey]}`:null"
    dropdown-icon="more_horiz"
    :label="selectorLabel"
    menu-anchor="top left"
    menu-self="bottom left"
    options-dense
    options-selected-class="text-primary"
    outlined
    :options="options"
    :model-value="selected"
    @update:modelValue="selected = $event">
    <template v-if="prependIcon" v-slot:prepend>
      <q-icon
        :name="prependIcon"
        :color="selected ?`primary`:``"
        @click.stop.prevent="$emit('click:prepend',selected)"/>
    </template>
    <template v-slot:option="item">
      <q-item v-bind="item['itemProps']" dense>
        <q-item-section v-if="imgKey" avatar>
          <q-avatar>
            <q-img
              loading="lazy"
              spinner-color="primary"
              :src="item['opt'][imgKey]"/>
          </q-avatar>
        </q-item-section>
        <q-item-section v-if="labelKey" no-wrap>
          <q-item-label lines="1">
            {{ item['opt'][labelKey] }}
          </q-item-label>
          <q-item-label v-if="captionKey" caption lines="1">
            {{ item['opt'][captionKey] }}
          </q-item-label>
        </q-item-section>
        <q-item-section v-if="cornerKey" side top>
          <q-item-label caption>
            {{ item['opt'][cornerKey] }}
          </q-item-label>
          <q-btn
            color="primary"
            dense
            flat
            :icon="sideIcon"
            @click.stop.prevent="$emit('click:side',item['opt'])">
          </q-btn>
        </q-item-section>
        <q-item-section v-if="sideIcon" side>

        </q-item-section>
      </q-item>
    </template>
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-italic text-grey">
          {{ noOption }}
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import {computed, defineComponent} from "vue";

export default defineComponent({
  name: "RichSelect",
  props: {
    disabled: {
      type: Boolean,
      default: () => false,
    },
    selectorLabel: {
      type: String,
      default: () => "selector"
    },
    options: {
      type: Array,
      default: () => [],
      required: true,
    },
    modelValue: {
      default: () => null,
      required: true,
    },
    prependIcon: {
      type: String,
      default: null,
    },
    imgKey: {
      type: String,
      default: null
    },
    labelKey: {
      type: String,
      default: "label"
    },
    captionKey: {
      type: String,
      default: null
    },
    cornerKey: {
      type: String,
      default: null
    },
    sideIcon: {
      type: String,
      default: null,
    },
    noOption: {
      type: String,
      default: () => "No option"
    },
  },
  setup(props, {emit}) {
    const selected = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    return {
      selected,
    }
  }
});
</script>

<style scoped>

</style>
