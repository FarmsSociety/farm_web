export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  addBtn: false,
  editBtn: false,
  delBtn: false,
  column: [
    {
      label: '科技服务标题',
      prop:  'serviceId',
      align: 'left',
      search: true,
      width:"180",
    },
    {
      label: '姓名',
      prop:  'name',
      align: 'left',
      search: true,
      width:"180",
    },
    {
      label: '联系电话',
      prop: 'phoneNum',
      align: 'left',
      width:"180",
    },
    {
      label: '头像',
      prop: 'avatar',
      type: 'upload',
      width: 150,
      listType: 'picture-img'

    },
    {
      label: '身份证号',
      prop: 'identity',
      align: 'left',
      width:"150",
    },
    {
      label: '邮箱',
      prop: 'email',
      align: 'left',
    },
    {
      label: '性别',
      prop: 'sex',
      slot: true,
      type: 'select',
      dicData: [
        {
          label: '男',
          value: 0
        }, {
          label: '女',
          value: 1
        }
      ]
    },
    {
      label: '联系地址',
      prop: 'addr',
      align: 'left',
      width:"250",
      search: true
    },
    {
      label: '报名时间',
      prop: 'signTime',
      align: 'left',
      width:"180",
    },
    {
      label: '报名状态',
      prop: 'signStatus',
      slot: true,
      type: 'select',
      dicData: [
        {
          label: '未审核',
          value: 0
        }, {
          label: '未通过',
          value: 1
        }, {
          label: '已通过',
          value: 2
        }
      ]
    }
  ]
}
