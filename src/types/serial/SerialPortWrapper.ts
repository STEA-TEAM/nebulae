import { Notify } from 'quasar';

import { i18nInstance } from 'boot/i18n.ts';
import { createI18n } from 'utils/common';
import { mergeUint8Arrays } from 'utils/data.ts';

const i18n = createI18n(i18nInstance.global, 'types.SerialPortWrapper.');

export class SerialPortWrapper {
  readonly id: string;
  private _port: SerialPort;
  private _messageCallbacks = new Map<string, (value: string) => void>();

  constructor(id: string, port: SerialPort) {
    this.id = id;
    this._port = port;
    this.readLoop().then();
  }

  addMessageCallback(callbackId: string, callback: (value: string) => void) {
    this._messageCallbacks.set(callbackId, callback);
  }

  async disconnect() {
    await this._port.close();
  }

  removeMessageCallback(callbackId: string) {
    this._messageCallbacks.delete(callbackId);
  }

  private async readLoop() {
    let buffer = new Uint8Array();
    while (this._port.readable) {
      const reader = this._port.readable.getReader();
      try {
        const { value, done } = await reader.read();
        if (done) {
          Notify.create({
            type: 'positive',
            message: i18n('notifications.readDone'),
          });
          reader.releaseLock();
          break;
        }

        if (value) {
          buffer = mergeUint8Arrays(buffer, value);
        }
      } catch (error) {
        Notify.create({
          type: 'warning',
          message: i18n('notifications.readError'),
          caption: (<Error>error).message,
        });
        reader.releaseLock();
        break;
      }
      const decodedBuffer = new TextDecoder().decode(buffer);
      if (decodedBuffer.includes('\n')) {
        const dataList = decodedBuffer.split('\n');
        const newBuffer = new TextEncoder().encode(dataList.splice(-1, 1)[0]);
        if (newBuffer.length > 0) {
          buffer = newBuffer;
        }
        for (const data of dataList) {
          this._messageCallbacks.forEach((callback) => {
            callback(data);
          });
        }
      }
    }
  }
}
