/* ====所有的请求URL==== */
const apiUrl = {
  /* ==== 登陆页 ==== */
  'loginDoLogin': 'login/do_login', // 登录
  /* ==== 职位管理 ==== */
  'adminGetList': 'admin/get_list', // 列表
  'adminGetAddInfo': 'admin/get_add_info', // 获取信息
  'adminGetEditInfo': 'admin/get_edit_info', // 详情
  'adminAddInfo': 'admin/add_info', // 新增
  'adminEditInfo': 'admin/edit_info', // 编辑
  'adminDelInfo': 'admin/del_info', // 删除
  /* ==== 门店管理 ==== */
  'storeGetList': 'store/get_list', // 列表
  'storeGetStoreType': 'store/get_store_type', // 获取类型信息
  'storeGetAreaInfo': 'store/get_area_info', // 获取地址信息
  'storeGetEditInfo': 'store/get_edit_info', // 详情
  'storeAddInfo': 'store/add_info', // 新增
  'storeEditInfo': 'store/edit_info', // 编辑
  'storeDelInfo': 'store/del_info', // 删除
  /* ==== 档案管理 ==== */
  'clientGetList': 'client/get_list', // 列表
  'clientGetInfo': 'client/get_info', // 详情
  /* ==== 员工管理 ==== */
  'staffGetList': 'staff/get_list', // 列表
  'staffStaffInfo': 'staff/get_staff_info', // 详情
  'staffDelInfo': 'staff/del_info', // 删除
  'staffEditInfo': 'staff/edit_info', // 通过或者拒绝
  /* ==== 设备管理 ==== */
  'deviceGetList': 'device/get_list', // 列表
  /* ==== 设备维修 ==== */
  'repaireGetList': 'repaire/get_list', // 列表
  /* ==== 库存管理 ==== */
  'stockGetList': 'stock/get_list', // 列表
  'stockImportInfo': 'stock/import_info', //导入
}

export default apiUrl;
