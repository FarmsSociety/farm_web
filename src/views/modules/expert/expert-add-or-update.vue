<template>
  <el-dialog :title="!dataForm.id ? '新增' : '修改'"
             :close-on-click-modal="false"
             :visible.sync="visible">
    <el-form :model="dataForm"
             :rules="dataRule"
             ref="dataForm"
             @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
             
      <el-form-item label="专家姓名"
                    prop="name">
        <el-input placeholder="专家姓名" v-model="dataForm.name"></el-input>
      </el-form-item>
      <el-form-item label="专家电话"
                    prop="phone">
        <el-input placeholder="专家电话" v-model="dataForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="专家类型"
                    prop="type">
        <el-radio-group v-model="dataForm.type">
          <el-radio :label="0">普通</el-radio>
          <el-radio :label="1">专家</el-radio>
          <el-radio :label="2">教授</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="active-image" label="专家头像"
                    prop="avatar">
        <pic-upload v-model="dataForm.avatar"></pic-upload>
      </el-form-item>
      <el-form-item class="active-image" label="专家图册"
                    prop="iconUrl">
        <pic-upload v-model="dataForm.iconUrl"></pic-upload>
      </el-form-item>

      <el-row>
        <el-col :span="12">
          <el-form-item label="工作时间" prop="startTime">
            <el-date-picker type="date" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" v-model="dataForm.startTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="截止时间" prop="endTime">
            <el-date-picker type="date" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" v-model="dataForm.endTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="专家地址" prop="address">
        <el-input placeholder="请输入专家地址" v-model="dataForm.address"></el-input>
      </el-form-item>
      <el-form-item label="擅长领域" prop="address">
        <el-input type="textarea" placeholder="擅长领域" v-model="dataForm.area"></el-input>
      </el-form-item>
      <el-form-item label="专家简介" prop="description">
        <el-input type="textarea" placeholder="专家简介" v-model="dataForm.description"></el-input>
      </el-form-item>
      <el-form-item label="详情"
                    prop="expertDetails">
        <tiny-mce v-model="dataForm.expertDetails"></tiny-mce>
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
        "address": "",
        "area": "",
        "avatar": "",
        "description": "",
        "endTime": "",
        "expertDetails": "",
        "iconUrl": "",
        "id": "",
        "name": "",
        "phone": "",
        "startTime": "",
        "type": 0
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
            url: this.$http.adornUrl('/science/expert/infoById?id=' + this.dataForm.id),
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
      var url = this.dataForm.id ? "/science/expert/update" : "/science/expert/add";
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
