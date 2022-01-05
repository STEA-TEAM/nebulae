export default {
  components: {
    controlPanel: {
      buttons: {
        send: 'Send Report',
        sendShort: 'Send',
        clear: 'Clear Data',
        clearShort: 'Clear',
      },
      dialog: {
        title: 'Saved Reports',
        noItemText: 'No saved reports',
        dismissText: 'Dismiss',
        chipText: 'Report ID',
        tooltipTitle: 'Data Packs',
      },
      inputs: {
        label: 'Save name',
      },
      notifications: {
        clearData: 'Successfully cleared data packs',
        invalidHistory: 'Invalid history report: No matching report ID',
        validHistory: 'Successfully copied history',
        saveSuccess: 'Successfully saved report',
        loadFailed: 'Invalid report save: No matching report ID',
        loadSuccess: 'Successfully loaded save',
        deleteSuccess: 'Successfully deleted save',
      },
      selects: {
        noItem: 'No output report available',
        report: 'Select Report',
        reportShort: 'Report',
        unit: 'Bytes',
      },
      tooltips: {
        openSaves: 'Open saved list',
        saveReport: 'Save this report',
      },
    },
    devicePanel: {
      infoDialog: {
        title: 'Device info',
        cancelText: 'OK',
      },
      buttons: {
        connect: 'Connect',
        disconnect: 'Disconnect',
        request: 'Device not on the list?',
      },
      checkDialog: {
        title: 'Check devices',
        cancelText: 'Not this one',
        confirmText: 'Connect',
      },
      inputs: {
        vendorId: 'Vendor ID',
        productId: 'Product ID',
        hint: '4-digit Hex',
        ruleFailed: 'Invalid hex number',
      },
      notifications: {
        invalidDevice: 'Invalid Device',
      },
      selects: {
        device: 'Select Device',
        defaultName: 'Anonymous',
        defaultVID: 'Unknown',
        defaultPID: 'Unknown',
        noItem: 'No device available',
        unit: 'collections',
      },
      tooltips: {
        deviceInfo: 'Show device info',
      },
    },
    hexView: {
      tooltips: {
        autoScroll: 'Scroll table automatically',
        clearData: 'Clear all history',
        copyHistory: 'Click to copy report as input'
      }
    },
    languagesMenu: {
      labels: {},
    },
    settingsMenu: {
      labels: {
        darkMode: 'Dark mode',
      },
    }
  },
  layouts: {
    drawers: {
      main: {
        labels: {
          dashboard: 'Dashboard',
          serial: 'Serial Debugger',
          usb: 'USB Debugger',
          hid: 'HID Debugger',
        }
      }
    },
    headers: {
      main: {
        labels: {
          title: 'NebulaE',
        },
      }
    },
    footers: {
      main: {
        labels: {
          title: 'NebulaE',
        },
      }
    },
    main: {},
  },
  pages: {
    dashboard: {
      labels: {
        title: 'NebulaE',
        intro: 'A Quasar framework hardware debugging toolset',
      },
    },
    hidMonitor: {
      labels: {
        sentArea: 'Sent Data',
        receivedArea: 'Received Data',
      },
    },
    notFound: {
      labels: {
        title: '404',
        intro: 'Oops, nothing here...',
        return: 'Go home',
      },
    },
  },
  global: {
    hid: {
      notifications: {
        onConnect: 'Device connected',
        onDisconnect: 'Device disconnected',
      },
    },
  },
}
