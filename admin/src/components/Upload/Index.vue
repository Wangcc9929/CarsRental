<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="https://up.qiniup.com"
      :show-file-list="false"
      :data="uploadData"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { GetQiniuToken } from "../../api/common";
export default {
  props: ["imgUrl"],
  data() {
    return {
      imageUrl: "",
      uploadData: {},
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = `http://rgek70jrq.hd-bkt.clouddn.com/${res.key}`;
      this.$emit("update:value", this.imageUrl);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt10M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      let fileName = file.name;
      let key = encodeURI(fileName);
      this.uploadData.key = key;
      return isJPG && isLt10M;
    },
    getQiniuToken() {
      const requestData = {
        ak: "hq8ptb00jxpXvLCfV8v0sngn7b_RcVxXSdbgLxQq",
        sk: "y_P24xM90DbhVqer5aow8WZxjMjRhCS2HHXG2VQv",
        buckety: "carees",
      };
      GetQiniuToken(requestData).then((response) => {
        const data = response.data;
        if (data.token) this.uploadData.token = data.token;
      });
    },
  },
  beforeMount() {
    this.getQiniuToken();
  },
  watch: {
    imgUrl: {
      handler(newValue) {
        this.imageUrl = newValue;
      },
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 200px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>