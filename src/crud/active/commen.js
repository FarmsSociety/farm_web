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
      label: '活动名称',
      prop: 'activityId',
      align: 'left',
      search: true,
      width:"180",
    },
    {
      label: '姓名',
      prop: 'name',
      align: 'left',
      search: true,
      width:"180",
    },
    {
      label: '头像',
      prop: 'avatar',
      type: 'upload',
      imgWidth: 45,
      listType: 'picture-img'
    },
    {
      label: '评论时间',
      prop: 'date',
      align: 'left',
    },
    {
      label: '评论内容',
      prop: 'content',
      align: 'left',
    },
  ]
}
