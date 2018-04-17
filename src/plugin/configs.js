// 主机类型
export const types = [
  { label: '电气火灾监控主机', value: '1' },
  { label: '独立式电气火灾探测器', value: '2' },
  { label: '电力监测仪表', value: '3' },
  { label: '温湿度传感器', value: '4' },
  { label: '烟雾探测器主机', value: '5' },
  { label: '独立式烟雾探测器', value: '6' }
];

// 统计分析设备主机类型
export const countTypes = [
  { label: '电气火灾监控主机', value: '1' },
  { label: '独立式电气火灾探测器', value: '2' },
  { label: '烟雾探测器主机', value: '5' },
  { label: '独立式烟雾探测器', value: '6' }
];

// 主机翻译
export const typeDict = {
  '1': '电气火灾监控主机',
  '2': '独立式电气火灾探测器',
  '3': '电力监测仪表',
  '4': '温湿度传感器',
  '5': '烟雾探测器主机',
  '6': '独立式烟雾探测器'
};

// 责任人级别
export const levelDict = {
  '1': '第一级',
  '2': '第二级',
  '3': '第三级',
  '4': '第四级',
  '5': '第五级'
};

export const sex = [
  { label: '男', value: '1' },
  { label: '女', value: '2' }
];

export const sexDict = {
  '1': '男',
  '2': '女'
};

export const statusDict = {
  '1': '在线',
  '0': '离线'
}

export const alertDict = {
  '1': '报警',
  '0': '正常'
}

export const statusClas = {
  '1': 'primary',
  '0': 'offline'
}

// 统计分析转换映射
export const deteTypeDict = {
  'year': '3',
  'month': '2',
  'date': '1'
}
