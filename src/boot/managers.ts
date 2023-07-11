import { BroadcastChannelManager } from 'types/BroadcastChannelWrapper';
import { BluetoothManager } from 'types/bluetooth/BluetoothManager';
import { SerialManager } from 'types/serial/SerialManager';

export const bluetoothManager = new BluetoothManager();
export const broadcastManager = new BroadcastChannelManager();
export const serialManager = new SerialManager();

broadcastManager.addChannel('leftDrawer');
broadcastManager.addChannel('rightDrawer');
