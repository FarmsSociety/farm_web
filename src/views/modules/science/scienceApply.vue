<template>
  <div class="mod-shop-notice">
    <avue-crud ref="crud"
               :page="page"
               :data="dataList"
               :table-loading="dataListLoading"
               :option="tableOption"
               @search-change="searchChange"
               @on-load="getDataList"
               @refresh-change="refreshChange">

      <template slot-scope="scope"
                slot="sex">
        <el-tag v-if="scope.row.sex === 1"
                size="small">男</el-tag>
        <el-tag v-else
                size="small">女</el-tag>
      </template>
      <template slot-scope="scope"
                slot="signStatus">
        <el-tag v-if="scope.row.signStatus === 0"
                size="small">待审核</el-tag>
        <el-tag v-else-if="scope.row.signStatus === 1"
                size="small">未通过</el-tag>
        <el-tag v-else
                size="small">已通过</el-tag>
      </template> 
      <template slot="menuLeft">

        <el-button v-if="isAuth('shop:notice:save')"
                   type="primary"
                   size="small"
                   icon="el-icon-plus"
                   @click="addOrUpdateHandle()">新增</el-button>
      </template>
      <template slot-scope="scope"
                slot="menu">
        <el-button v-if="isAuth('shop:notice:update')"
                   type="primary"
                   size="small"
                   icon="el-icon-edit"
                   @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
        <el-button v-if="isAuth('shop:notice:delete')"
                   type="danger"
                   icon="el-icon-delete"
                   size="small"
                   @click.stop="deleteHandle(scope.row.id)">删除</el-button>
      </template>

    </avue-crud>
    <add-or-update v-if="addOrUpdateVisible"
                   ref="addOrUpdate"
                   @refreshDataList="refreshChange"></add-or-update>
  </div>
</template>

<script>
import { tableOption } from '@/crud/science/apply'
import AddOrUpdate from './apply-add-or-update'
export default {
  data () {
    return {
      dataList: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      dataListLoading: false,
      tableOption: tableOption,
      // permission: {
      //   delBtn: this.isAuth('shop:notice:delete')
      // },
      addOrUpdateVisible: false
    }
  },
  components: {
    AddOrUpdate
  },
  created () {
  },
  mounted () {
  },
  methods: {
    getDataList (page, params) {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/science/service/getSignUpScienceList'),
        method: 'get',
        params: this.$http.adornParams(Object.assign({
          current: page == null ? this.page.currentPage : page.currentPage,
          size: page == null ? this.page.pageSize : page.pageSize
        }, params))
      }).then(({ data }) => {
        this.dataList = data.data.records
        this.page.total = data.data.total
        this.dataListLoading = false
      })
    },
    // 新增 / 修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    deleteHandle (id) {
      this.$confirm('确定进行删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/science/service/delete?id=' + id),
          method: 'delete',
          data: this.$http.adornData({})
        }).then(({ data }) => {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.getDataList()
            }
          })
        })
      }).catch(() => { })
    },
    /**
     * 刷新回调
     */
    refreshChange () {
      this.getDataList(this.page)
    },
    searchChange (params) {
      this.getDataList(this.page, params)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
