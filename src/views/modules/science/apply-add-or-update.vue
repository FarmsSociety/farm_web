<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'"
             :close-on-click-modal="false"
             :visible.sync="visible">
    <el-form :model="dataForm"
             :rules="dataRule"
             ref="dataForm"
             @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-form-item label="服务id"
                    prop="serviceId">
        <el-input placeholder="服务id" v-model="dataForm.serviceId"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名"
                        prop="name">
            <el-input placeholder="姓名" v-model="dataForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话"
                        prop="phoneNum">
            <el-input placeholder="联系电话" v-model="dataForm.phoneNum"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="性别"
                        prop="sex">
            <el-radio-group v-model="dataForm.sex">
              <el-radio :label="0">男</el-radio>
              <el-radio :label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱"
                        prop="email">
            <el-input placeholder="邮箱" v-model="dataForm.email"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="身份证号"
                    prop="identity">
        <el-input placeholder="身份证号" v-model="dataForm.identity"></el-input>
      </el-form-item>
      <el-form-item class="active-image" label="头像"
                    prop="avatar">
        <pic-upload v-model="dataForm.avatar"></pic-upload>
      </el-form-item>
      <el-form-item label="报名时间" prop="signTime">
        <el-date-picker type="date" value-format="yyyy-MM-dd HH:mm:ss" placeholder="报名时间" v-model="dataForm.signTime" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="联系地址" prop="addr">
        <el-input placeholder="联系地址" v-model="dataForm.addr"></el-input>
      </el-form-item>
      <el-form-item label="报名状态"
                    prop="signStatus">
        <el-radio-group v-model="dataForm.signStatus">
          <el-radio :label="0">未审核</el-radio>
          <el-radio :label="1">未通过</el-radio>
          <el-radio :label="2">已通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注信息"
                    prop="remark">
        <tiny-mce v-model="dataForm.remark"></tiny-mce>
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
import { treeDataTranslate, idList } from '@/utils'
import PicUpload from '@/components/pic-upload'
export default {
  data () {
    return {
      visible: false,
      roleList: [],
      dataForm: {
        "addr": "",
        "avatar": "",
        "email": "",
        "id": "",
        "identity": "",
        "name": "",
        "phoneNum": "",
        "remark": "",
        "serviceId": "",
        "sex": 0,
        "signStatus": 0,
        "signTime": ""
      },
      dataRule: {
      }
    }
  },
  components: {
    TinyMce,
    PicUpload
  },
  methods: {
    init (id) {
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl('/science/service/infoById?id=' + this.dataForm.id),
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
      var url = this.dataForm.id ? "/science/service/update" : "/science/service/add";
      //时间格式转换
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(url),
            method: this.dataForm.id ? 'PUT' : 'POST',
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
<style>
  .active-image .pic-uploader-component .el-upload .pic-uploader-icon, .active-image .pic-uploader-component .el-upload .pic{
    width: 80px;height: 80px;line-height: 80px;
  }

</style>
