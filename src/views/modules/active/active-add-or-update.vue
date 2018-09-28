<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'"
             :close-on-click-modal="false"
             :visible.sync="visible">
    <el-form :model="dataForm"
             :rules="dataRule"
             ref="dataForm"
             @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-form-item label="活动名称"
                    prop="title">
        <el-input placeholder="请输入活动名称" v-model="dataForm.title"></el-input>
      </el-form-item>


      <el-row>
        <el-col :span="12">
          <el-form-item label="发布者"
                        prop="publisher">
            <el-input placeholder="请输入发布者" v-model="dataForm.publisher"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话"
                        prop="phone">
            <el-input placeholder="请输入联系电话" v-model="dataForm.phone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="宣讲者"
                        prop="preacher">
            <el-input placeholder="请输入宣讲者" v-model="dataForm.preacher"></el-input>
          </el-form-item>

        </el-col>
        <el-col :span="12">
          <el-form-item label="身份"
                        prop="preacherIdentity">
            <el-select v-model="dataForm.preacherIdentity" placeholder="请选择宣讲者身份">
              <el-option label="普通人员" value="0"></el-option>
              <el-option label="专家" value="1"></el-option>
              <el-option label="教授" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="起止时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="dataForm.startTime" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" style="text-align: center;" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="dataForm.endTime" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="活动地址"
                    prop="addr">
        <el-input placeholder="请输入活动地址" v-model="dataForm.addr"></el-input>
      </el-form-item>
      <el-form-item label="报名条件"
                    prop="conditions">
        <el-radio-group v-model="dataForm.conditions">
          <el-radio :label="0">所有人</el-radio>
          <el-radio :label="1">vip会员</el-radio>
          <el-radio :label="2">其他</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动状态"
                    prop="activityStatus">
        <el-radio-group v-model="dataForm.activityStatus">
          <el-radio :label="0">未开始</el-radio>
          <el-radio :label="1">进行中</el-radio>
          <el-radio :label="2">结束</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="详情"
                    prop="description">
        <tiny-mce v-model="dataForm.description"></tiny-mce>
      </el-form-item>
    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button size="small"
                 @click="visible = false">取消</el-button>
      <el-button size="small"
                 type="primary"
                 @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import TinyMce from '@/components/tiny-mce'
export default {
  data () {
    return {
      visible: false,
      roleList: [],
      dataForm: {
        "activityStatus": 0,
        "addr": "",
        "conditions": 0,
        "description": "",
        "endTime": "",
        "iconUrl": "",
        "id": "",
        "phone": "",
        "preacher": "",
        "preacherIdentity": "0",
        "publisher": "",
        "startTime": "",
        "title": "",
        "publicize_img_url":"",
      },
      dataRule: {
      }
    }
  },
  components: {
    TinyMce
  },
  methods: {
    init (id) {
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl('/active/info?id=' + this.dataForm.id),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({ data }) => {
            this.dataForm = data.data
            this.dataForm.preacherIdentity = ""+this.dataForm.preacherIdentity;
            console.log( this.dataForm );
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl('/active/publish'),
            method: this.dataForm.id ? 'put' : 'post',
            data: this.$http.adornData(this.dataForm)
          }).then(({ data }) => {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.visible = false
                this.$emit('refreshDataList')
                this.dataForm.content = ''
              }
            })
          })
        }
      })
    }
  }
}
</script>
