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
                slot="preacherIdentity">
        <el-tag v-if="scope.row.preacherIdentity === 0"
                size="small">普通人员</el-tag>
        <el-tag v-else-if="scope.row.preacherIdentity === 1"
                size="small">专家</el-tag>
        <el-tag v-else
                size="small">教授</el-tag>
      </template>

      <template slot-scope="scope"
                slot="conditions">
        <el-tag v-if="scope.row.conditions === 0"
                size="small">所有人</el-tag>
        <el-tag v-else-if="scope.row.conditions === 1"
                size="small">vip会员</el-tag>
        <el-tag v-else
                size="small">其他</el-tag>
      </template>

      <template slot-scope="scope"
                slot="activityType">
        <el-tag v-if="scope.row.activityType === 0"
                size="small">科技服务</el-tag>
        <el-tag v-else
                size="small">招募活动</el-tag>
      </template>

      <template slot-scope="scope"
                slot="activityStatus">
        <el-tag v-if="scope.row.activityStatus === 0"
                size="small">未开始</el-tag>
        <el-tag v-else-if="scope.row.activityStatus === 1"
                size="small">进行中</el-tag>
        <el-tag v-else
                size="small">结束</el-tag>
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
import { tableOption } from '@/crud/active/active'
import AddOrUpdate from './active-add-or-update'
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
      permission: {
        delBtn: this.isAuth('shop:notice:delete')
      },
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
        url: this.$http.adornUrl('/active/list'),
        method: 'get',
        params: this.$http.adornParams(Object.assign({
          current: page == null ? this.page.currentPage : page.currentPage,
          size: page == null ? this.page.pageSize : page.pageSize
        }, params))
      }).then(({ data }) => {
        console.log( JSON.stringify( data ) );
        this.dataList = data.data.records
        console.log( JSON.stringify( this.dataList ) );
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
          url: this.$http.adornUrl('/shop/notice/' + id),
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
