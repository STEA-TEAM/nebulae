import { defineStore } from 'pinia';
import { AddressbarColor, colors, Dark } from 'quasar';
import { computed, ref, Ref } from 'vue';

const { getPaletteColor } = colors;
const darkModes: Dark['mode'][] = [false, 'auto', true] as const;

export const useSettingsStore = defineStore('settings', () => {
  const darkMode: Ref<Dark['mode']> = ref(Dark.mode);

  const darkModeColorAndIcon = computed(() => {
    switch (darkMode.value) {
      case false:
        return { color: 'orange', icon: 'light_mode' };
      case 'auto':
        return { color: 'teal', icon: 'hdr_auto' };
      default:
        return { color: 'yellow', icon: 'dark_mode' };
    }
  });

  const applyDarkMode = () => {
    Dark.set(darkMode.value);
    AddressbarColor.set(
      Dark.isActive ? getPaletteColor('grey-10') : getPaletteColor('grey-2'),
    );
  };

  const toggleDarkMode = () => {
    const index = darkModes.indexOf(darkMode.value);
    darkMode.value = darkModes[(index + 1) % darkModes.length];
    applyDarkMode();
  };

  return { darkMode, darkModeColorAndIcon, applyDarkMode, toggleDarkMode };
});
