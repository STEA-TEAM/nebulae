export default {
  components: {
    dataVisualizer: {
      tooltips: {
        autoScroll: 'Scroll table automatically',
        clearData: 'Clear all history',
      },
      notifications: {
        rowNotFound: 'Row(s) not found. Is the buffer size too small?',
        columnNotFound: 'Column(s) not found. Is the separator correct?',
        validHistory: 'Successfully copied history',
      },
    },
    hidControl: {
      buttons: {
        send: 'Send Report',
        sendShort: 'Send',
        clear: 'Clear Data',
        clearShort: 'Clear',
      },
      notifications: {
        clearData: 'Successfully cleared data packs',
        invalidHistory: 'Invalid history report: No matching report ID',
        validHistory: 'Successfully copied history',
      },
      selects: {
        noItem: 'No output report available',
        report: 'Select Report',
        reportShort: 'Report',
        unit: 'Bytes',
      },
    },
    hidDevice: {
      infoDialog: {
        title: 'Device info',
        cancelText: 'OK',
      },
      buttons: {
        connect: 'Connect',
        disconnect: 'Disconnect',
        request: 'Authorize',
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
    saveManager: {
      inputs: {
        label: 'Save name',
      },
      dialog: {
        title: 'Saved Reports',
        noItemText: 'No saved reports',
        dismissText: 'Dismiss',
        chipText: 'Report ID',
        tooltipTitle: 'Data Packs',
      },
      notifications: {
        saveSuccess: 'Successfully saved report',
        deleteSuccess: 'Successfully deleted save',
        loadFailed: 'Invalid report save: No matching report ID',
        loadSuccess: 'Successfully loaded save',
      },
      tooltips: {
        openSaves: 'Open saved list',
        saveReport: 'Save this report',
      },
    },
    serialControl: {
      buttons: {
        send: 'Send Report',
        sendShort: 'Send',
        connect: 'Connect',
        disconnect: 'Disconnect',
      },
      notifications: {
        clearData: 'Successfully cleared data packs',
        invalidHistory: 'Invalid history report: No matching report ID',
        validHistory: 'Successfully copied history',
      },
      selects: {
        noItem: 'No output report available',
        label: 'Select Baud Rate',
        labelShort: 'Baud/s',
      },
      tabs: {
        list: 'List',
        table: 'Table',
        graph: 'Graph',
      },
    },
    settingsMenu: {
      labels: {
        darkMode: 'Dark mode',
      },
    },
    textView: {
      tooltips: {
        autoScroll: 'Scroll table automatically',
        clearData: 'Clear all history',
      },
    },
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
