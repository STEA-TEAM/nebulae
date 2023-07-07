export class SerialPortWrapper {
  private port: SerialPort;
  private messageCallbacks = new Map<string, (value: Uint8Array) => void>();

  constructor(port: SerialPort) {
    this.port = port;
    this.readLoop().then();
  }

  addMessageCallback(callbackId: string, callback: (value: Uint8Array) => void) {
    this.messageCallbacks.set(callbackId, callback);
  }

  removeMessageCallback(callbackId: string) {
    this.messageCallbacks.delete(callbackId);
  }

  private async readLoop() {
    const reader = this.port.readable?.getReader();
    if (!reader) {
      console.warn('readLoop: reader is null');
      return;
    }
    const result = new Uint8Array();
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          console.log('readLoop: done', done);
          break;
        }
        if (value) {
          console.log('readLoop: value', value);
          result.push(...new Uint8Array(value));
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      reader.releaseLock();
    }
    if (result.length > 0) {
      this.messageCallbacks.forEach((callback) => {
        callback(result);
      });
    }
  }
}
