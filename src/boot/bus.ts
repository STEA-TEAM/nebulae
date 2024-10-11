import { EventBus } from 'quasar';
import { boot } from 'quasar/wrappers';

export const bus = new EventBus<{
  drawer: (
    action: 'close' | 'open' | 'toggle',
    position: 'left' | 'right',
  ) => void;
}>();

// noinspection JSUnusedGlobalSymbols
export default boot(({ app }) => {
  app.config.globalProperties.$bus = bus;
});
