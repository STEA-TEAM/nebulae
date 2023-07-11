export interface BroadcastMessage {
  action: string;
  data?: unknown;
}

export class BroadcastChannelManager {
  private channels = new Map<string, BroadcastChannel>();

  addChannel(name: string) {
    const channel = new BroadcastChannel(name);
    this.channels.set(name, channel);
    return channel;
  }

  getChannel(name: string) {
    return this.channels.get(name);
  }

  removeChannel(name: string) {
    const channel = this.channels.get(name);
    if (channel) {
      channel.close();
      this.channels.delete(name);
    }
  }

  postMessage(name: string, message: BroadcastMessage) {
    const channel = this.channels.get(name);
    if (channel) {
      channel.postMessage(message);
      return true;
    }
    return false;
  }

  addMessageCallback(
    name: string,
    callback: (message: BroadcastMessage) => void,
  ) {
    const channel = this.channels.get(name);
    if (channel) {
      channel.addEventListener('message', (event) => callback(event.data));
      return true;
    }
    return false;
  }

  removeMessageCallback(name: string) {
    const channel = this.channels.get(name);
    if (channel) {
      channel.removeEventListener('message', null);
      return true;
    }
    return false;
  }
}
