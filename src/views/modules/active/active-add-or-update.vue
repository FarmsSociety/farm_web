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
          <el-form-item label="主办方"
                        prop="sponsor">
            <el-input placeholder="请输入主办方" v-model="dataForm.sponsor"></el-input>
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
          <el-form-item label="宣讲身份"
                        prop="preacherIdentity">
            <el-select v-model="dataForm.preacherIdentity" placeholder="请选择宣讲者身份">
              <el-option label="普通人员" value="0"></el-option>
              <el-option label="专家" value="1"></el-option>
              <el-option label="教授" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="联系人"
                        prop="personName">
            <el-input placeholder="请输入联系人" v-model="dataForm.personName"></el-input>
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
          <el-form-item label="开始时间" prop="startTime">
            <el-date-picker type="date" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" v-model="dataForm.startTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束时间" prop="endTime">
            <el-date-picker type="date" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" v-model="dataForm.endTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="活动地址" prop="addr">
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
      <el-form-item class="active-image" label="封面图"
                    prop="iconUrl">
        <pic-upload v-model="dataForm.iconUrl"></pic-upload>
      </el-form-item>
      <el-form-item class="active-image" label="宣传图"
                    prop="publicizeImgUrl">
        <pic-upload v-model="dataForm.publicizeImgUrl"></pic-upload>
      </el-form-item>
      <el-form-item label="活动介绍"
                    prop="description">
        <el-input placeholder="请输入活动介绍" type="textarea" v-model="dataForm.description"></el-input>
      </el-form-item>
      <el-form-item label="详情"
                    prop="activityDetails">
        <tiny-mce v-model="dataForm.activityDetails"></tiny-mce>
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
        "activityDetails": "",
        "activityStatus": 0,
        "addr": "",
        "conditions": 0,
        "description": "",
        "endTime": "",
        "iconUrl": "",
        "id": "",
        "personName": "",
        "phone": "",
        "preacher": "",
        "preacherIdentity": '0',
        "publicizeImgUrl": "",
        "publisher": "",
        "sponsor": "",
        "startTime": "",
        "title": ""
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
            url: this.$http.adornUrl('/science/activity/info?id=' + this.dataForm.id),
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
      //时间格式转换
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl('/science/activity/publish'),
            method: this.dataForm.id ? 'POST' : 'POST',
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
