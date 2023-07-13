import { EventBus } from 'quasar';
import { boot } from 'quasar/wrappers';

export const bus = new EventBus<{
  drawer: (
    position: 'left' | 'right',
    action: 'close' | 'open' | 'toggle',
  ) => void;
}>();

// noinspection JSUnusedGlobalSymbols
export default boot(({ app }) => {
  app.config.globalProperties.$bus = bus;
});
