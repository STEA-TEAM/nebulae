import { Composer } from 'vue-i18n';
import { Locale } from '@intlify/core-base';

export const createI18n =
  <
    Messages extends Record<string, unknown>,
    DateTimeFormats extends Record<string, unknown>,
    NumberFormats extends Record<string, unknown>,
    OptionLocale = Locale,
  >(
    composer: Composer<Messages, DateTimeFormats, NumberFormats, OptionLocale>,
    baseName: string,
  ) =>
  (relativePath: string, data?: Record<string, unknown>) => {
    if (data) {
      return composer.t(baseName + relativePath, data);
    } else {
      return composer.t(baseName + relativePath);
    }
  };

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
