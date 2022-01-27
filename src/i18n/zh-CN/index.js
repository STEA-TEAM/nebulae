export default {
  components: {
    dataVisualizer: {
      tooltips: {
        autoScroll: '自动滚动到表格底部',
        collapsed: '展开/收起区域',
        clearData: '清空历史数据',
      },
    },
    hidControl: {
      buttons: {
        send: '发送报文',
        sendShort: '发送',
        clear: '清空数据',
        clearShort: '清空',
      },
      notifications: {
        clearData: '清零数据成功',
        invalidHistory: '历史报文无效：当前设备没有匹配的报文ID',
        validHistory: '复制历史报文成功',
      },
      selects: {
        noItem: '没有可用的输出类报文',
        report: '选择报文',
        reportShort: '报文',
        unit: '字节',
      },
    },
    hidDevice: {
      infoDialog: {
        title: '设备信息',
        cancelText: '确定',
      },
      buttons: {
        connect: '连接',
        disconnect: '断开',
        request: '新授权',
      },
      checkDialog: {
        title: '确认连接设备列表',
        cancelText: '不是这组设备',
        confirmText: '连接',
      },
      inputs: {
        vendorId: '厂商ID',
        productId: '设备ID',
        hint: '4位16进制',
        ruleFailed: '无效的16进制数',
      },
      notifications: {
        invalidDevice: '所选设备无效',
      },
      selects: {
        device: '选择设备',
        defaultName: '匿名设备',
        defaultVID: '未知',
        defaultPID: '未知',
        noItem: '没有可用设备',
        unit: '个集合',
      },
      tooltips: {
        deviceInfo: '查看设备信息',
      },
    },
    hexView: {
      tooltips: {
        autoScroll: '自动滚动到表格底部',
        clearData: '清空历史数据',
        copyHistory: '点击复制历史数据到数据区',
      }
    },
    languagesMenu: {
      labels: {},
    },
    saveManager: {
      inputs: {
        label: '存档名称',
      },
      dialog: {
        title: '已保存的报文',
        noItemText: '没有保存的报文',
        dismissText: '隐藏',
        chipText: '报文ID',
        tooltipTitle: '数据包',
      },
      notifications: {
        saveSuccess: '保存报文成功',
        loadFailed: '报文存档无效: 当前设备没有匹配的报文ID',
        loadSuccess: '加载报文存档成功',
        deleteSuccess: '删除报文存档成功',
      },
      tooltips: {
        openSaves: '打开报文存档列表',
        saveReport: '保存当前报文',
      },
    },
    serialControl: {
      buttons: {
        send: '发送报文',
        sendShort: '发送',
        connect: '连接',
        disconnect: '断开',
      },
      notifications: {
        clearData: '清零数据成功',
        invalidHistory: '历史报文无效：当前设备没有匹配的报文ID',
        validHistory: '复制历史报文成功',
      },
      selects: {
        noItem: '没有可用的输出类报文',
        label: '选择波特率',
        labelShort: '波特率',
      },
      tabs: {
        list: '列表',
        table: '表格',
        graph: '图表',
      },
    },
    settingsMenu: {
      labels: {
        darkMode: '暗色模式',
      },
    },
    textView: {
      tooltips: {
        autoScroll: '自动滚动到表格底部',
        clearData: '清空历史数据',
      }
    },
  },
  layouts: {
    drawers: {
      main: {
        labels: {
          dashboard: '仪表盘',
          serial: '串口调试器',
          usb: 'USB调试器',
          hid: 'HID调试器',
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
        intro: '一个基于Quasar框架的硬件调试工具集',
      },
    },
    hidMonitor: {
      labels: {
        sentArea: '已发送数据',
        receivedArea: '已接受数据',
      },
    },
    notFound: {
      labels: {
        title: '404',
        intro: '嗯……这里没有任何东西……',
        return: '返回主页',
      },
    },
  },
  global: {
    hid: {
      notifications: {
        onConnect: '设备已连接',
        onDisconnect: '设备断开连接',
      },
    },
  },
}
