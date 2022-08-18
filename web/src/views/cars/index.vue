<template>
  <div class="cars-wrap" v-if="carsList && carsList.length > 0">
        <div class="cars-swiper-wrap">
            <swiper class="swiper" :options="swiperOption">
                <swiper-slide v-for="item in carsList" :key="item.id"><CarList :data="item" /></swiper-slide>
                <!-- <swiper-slide><CarsItem height="600px" /></swiper-slide>
                <swiper-slide><CarsItem /></swiper-slide>
                <swiper-slide><CarsItem /></swiper-slide>
                <swiper-slide><CarsItem /></swiper-slide> -->
            </swiper>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import CarList from "./carList/index.vue";
import "swiper/css/swiper.css";
import {GetCarsList} from "../../api/cars"
export default {
  name: "Cars",
  components: { Swiper, SwiperSlide, CarList },
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      carsList:[],
    };
  },
  methods: {
    getCarsList(data){
      GetCarsList({parkingId:data.id}).then(response=>{
        const val=response.data.data;
        val&&(this.carsList=val);
      })
    }
  },
  watch:{
    "$store.state.app.isClickCarsList":{
      handler(newValue){
        if(newValue===false){
          this.carsList=[];
        }
      }
    }
  }
};
</script>

<style lang="scss">
.cars-wrap {
    position: fixed;
    left: 0;
    bottom: 94px;
    right: 0;
    z-index: 11;
}
.cars-swiper-wrap {
    position: relative;
    padding: 0 155px;
    .swiper-container { overflow: initial; }
    .swiper-button-prev,
    .swiper-button-next {
        top: 50%;
        width: 60px;
        height: 100px;
        margin-top: -50px;
        border-radius: 100px;
        background-color: #fff;
        outline: none;
        @include webkit(box-shadow, 0 0 18px 0 rgba(0, 0, 0, .2));
        @include webkit(transition, all .3s ease 0s);
        &.swiper-button-disabled { opacity: 1; }
        &:hover { 
            background-color: $color-main;
            &:after { border-top: 3px solid $color-blue; }
        }
        &:after {
            content: "";
            width: 14px;
            height: 14px;
            border-top: 3px solid #000;
        }
    }
    .swiper-button-prev { 
        left: 53px;
        &:after {
            border-left: 3px solid #000;
            margin-left: 5px;
            @include webkit(transform, rotate(-45deg));
        }
        &:hover {
            &:after { border-left: 3px solid $color-blue; }
        }
    }
    .swiper-button-next { 
        right: 53px;
        &:after {
            border-right: 3px solid #000;
            margin-right: 5px;
            @include webkit(transform, rotate(45deg));
        }
        &:hover {
            &:after { border-right: 3px solid $color-blue; }
        }
    }
}
</style>