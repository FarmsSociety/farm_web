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
      label: '标题',
      prop: 'title',
      align: 'left',
      search: true,
      width:"180",
    },
    {
      label: '发布者',
      prop: 'publisher',
      align: 'left',
      width:"180",
    },
    {
      label: '联系电话',
      prop: 'phone',
      align: 'left',
      width:"150",
    },
    {
      label: '宣讲者',
      prop: 'preacher',
      align: 'left',
    },
    {
      label: '宣讲者身份',
      prop: 'preacherIdentity',
      slot: true,
      type: 'select',
      dicData: [
        {
          label: '普通人员',
          value: 0
        }, {
          label: '专家',
          value: 1
        }, {
          label: '教授',
          value: 2
        }
      ]
    },
    {
      label: '开始时间',
      prop: 'startTime',
      align: 'left',
      width:"180",
    },
    {
      label: '结束时间',
      prop: 'endTime',
      align: 'left',
      width:"180",
    },
    {
      label: '活动地址',
      prop: 'addr',
      align: 'left',
      width:"250",
      search: true
    },
    {
      label: '报名条件',
      prop: 'conditions',
      slot: true,
      search: true,
      type: 'select',
      dicData: [
        {
          label: '所有人',
          value: 0
        }, {
          label: 'vip会员',
          value: 1
        }, {
          label: '其他',
          value: 2
        }
      ]
    },
    {
      label: '活动类型',
      prop: 'activityType',
      slot: true,
      type: 'select',
      search: true,
      dicData: [
        {
          label: '科技服务',
          value: 0
        }, {
          label: '招募活动',
          value: 1
        }
      ]
    },
    {
      label: '活动状态',
      prop: 'activityStatus',
      slot: true,
      type: 'select',
      dicData: [
        {
          label: '未开始',
          value: 0
        }, {
          label: '进行中',
          value: 1
        }, {
          label: '结束',
          value: 2
        }
      ]
    }
  ]
}
