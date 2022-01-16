<template>
  <q-input
    bottom-slots
    dense
    fill-mask="0"
    :mask="dataMask"
    ref="input"
    outlined
    unmasked-value
    :model-value="rawData"
    @update:modelValue="rawData=$event"
    :rules="[dataRule]"
    @focus="onFocus"
    @blur="focused=false"/>
</template>

<script>
import {computed, defineComponent} from 'vue'

export default defineComponent({
  name: 'HexInput',
  props: {
    modelValue: {
      type: String,
      default: () => "",
    },
    index: {
      type: Number,
      default: -1,
    },
    bytes: {
      type: Number,
      default: () => 0,
    },
    label: {
      type: String,
      default: () => "",
    },
    previousFocus: {
      type: Number,
      default: () => -1,
    }
  },
  setup(props, {emit}) {
    let dataMask = new Array(props.bytes).fill('XX').join(' ');
    const rawData = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });
    return {
      dataMask,
      rawData,
    }
  },
  data() {
    return {
      focused: false,
    }
  },
  mounted() {
    let input = this.$refs.input.getNativeElement();
    input.addEventListener("input", (event) => {
      if (
        event.isTrusted &&
        event.inputType === 'deleteContentBackward' &&
        input.selectionStart === 0
      ) {
        setTimeout(() => {
          this.$emit('event:previous');
        }, 10);
      } else if (
        event.isTrusted &&
        event.inputType === 'insertText' &&
        input.selectionStart === input.value.length
      ) {
        setTimeout(() => {
          this.$emit('event:next');
        }, 10);
      }
    });
    input.addEventListener('beforeinput', (event) => {
      if (
        event.isTrusted &&
        event.inputType === 'deleteContentBackward' &&
        input.selectionStart === 0
      ) {
        setTimeout(() => {
          this.$emit('event:previous');
        }, 10);
      } else if (
        event.isTrusted &&
        event.inputType === 'insertText' &&
        input.selectionStart === input.value.length
      ) {
        setTimeout(() => {
          this.$emit('event:next');
        }, 10);
      }
    });
  },
  watch: {
    bytes(value) {
      this.dataMask = new Array(value).fill('XX').join(' ');
    }
  },
  methods: {
    dataRule(value) {
      if (!value) {
        return;
      }
      if (value.hasOwnProperty("length") &&
        value.search(/[G-Z]+/) === -1) {
        return true;
      }
      return 'Invalid report data';
    },
    onFocus() {
      if (this.index > this.previousFocus) {
        this.$refs.input.getNativeElement().selectionStart = 0;
        this.$refs.input.getNativeElement().selectionEnd = 0;
      } else if (this.index < this.previousFocus) {
        this.$refs.input.getNativeElement().selectionStart = this.$refs.input.getNativeElement().value.length;
        this.$refs.input.getNativeElement().selectionEnd = this.$refs.input.getNativeElement().value.length;
      }
      this.focused = true;
      this.$emit('event:focus');
    },
    focus() {
      this.$refs.input.focus();
    },
  }
})
</script>
