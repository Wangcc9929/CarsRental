<template>
  <el-dialog @opened="opened" @close="close" title="新增汽车品牌" :visible.sync="mydialogFormVisible">
    <Form ref="form" :formData="form" :formItem="form_item" :formHandler="form_handler">
      <template v-slot:logo="slotData">
        <div class="upload-img-wrap">
          <div  class="upload-img">
            <img v-show="currentLogo" :src="currentLogo" alt="">
          </div>
          <ul class="img-list">
            <li v-for="item in logo">
               <img :src="item.img" :alt="item.name" @click="getcurrentLogo(item.img)">
            </li>
          </ul>
        </div>
      </template>
    </Form>
  </el-dialog>
</template>

<script>
import {BrandLogo,BrandAdd,BrandDetailed,BrandEdit} from '../../api/carbrand'
import Form from '../Form/Index.vue'
export default {
  name: "addCarBrand",
  components:{Form},
  data() {
    return {
      form: {
        nameCh: "",
        nameEn: "",
        imgUrl:"",
        status:true,
        content: "",
      },
      form_item:[
        {type:"Input",label:"品牌中文",prop:"nameCh"},
        {type:"Input",label:"品牌英文",prop:"nameEn",},
        {type:"Slot",slotName:"logo",label:"LOGO",prop:"imgUrl"},
        {type: "Radio",label: "禁启用",prop: "status",options: this.$store.state.config.radio_disabled},
        {type:"TextArea",label:"品牌详情",prop:"content"},
      ],
      form_handler:[
        { label: "确定", key: "submit",  type: "primary", handler: () => this.submit() },
        { label: "取消", key: "cancel", handler: () => this.dialogfalse() },
      ],
      logo:[],
      currentLogo:"",
      formLabelWidth: "120px",
    };
  },
  props: ["dialogFormVisible","id"],
  computed: {
    mydialogFormVisible: {
      get() {
        return this.dialogFormVisible;
      },
      set(value) {
        this.$emit("changeVisiable", value);
      },
    },
  },
  methods: {
    opened(){
      this.getLogo();
      this.getDetailed();
    },
    dialogfalse() {
      this.mydialogFormVisible = false;
      this.reset();
    },
    //提交
    submit(){
      this.id?this.editbrand():this.addbrand();
      this.$emit("reflashlist");
    },
    close(){
      this.dialogfalse();
    },
    reset(){
      this.$refs.form.$refs.form.resetFields();
      // for(let key in this.form){
      //   this.form[key]="";
      // }
      // this.logo_current="";
      this.$emit("update:id","");
    },
    // 获取LOGO
    getLogo(){
      if(this.logo.length!==0)
        return false;
      BrandLogo().then(response=>{
        if(response.data)
          this.logo=response.data;
        for(let i=0;i<this.logo.length;i++){
          this.logo[i].img=this.logo[i].img.replace("www","old");
        }
      })
    },
    // 添加品牌
    addbrand(){
      this.form.imgUrl=this.currentLogo;
      BrandAdd(this.form).then(response=>{
        this.$message({
              type: "success",
              message: response.message,
            });
        this.dialogfalse();
      })
    },
    // 获取详情
    getDetailed(){
      if(this.id){
        BrandDetailed({id:this.id}).then(response=>{
          const data=response.data;
          this.form=data;
          this.currentLogo=data.imgUrl;
        })
      }
    },
    // 编辑详情
    editbrand(){
      this.form.imgUrl=this.currentLogo;
      let requestData=JSON.parse(JSON.stringify(this.form));
      requestData.id=this.id;
      BrandEdit(requestData).then((response) => {
          this.$message({
            type: "success",
            message: response.message,
          });
          this.dialogfalse();
        })
        .catch((e) => {
          this.loading = false;
        });
    },
    //更新当前选择的LOGO
    getcurrentLogo(img=""){
      this.currentLogo=img;
    }
  },
};
</script>

<style>
</style>