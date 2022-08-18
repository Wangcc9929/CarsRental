<template>
  <div>
    <section class="carItem" @click="getCarsInfo">
      <header>
        <h4 class="carsLogo" id="brandimg">
          <img
            src="../../../assets/images/cars-logo.png"
            :alt="data.carsMode"
          />
          <span class="name">{{ data.carsMode }}</span>
        </h4>
        <p class="carsAttr">
          {{ data.energyType === "2" ? "汽油" : "新能源" }}
          {{ data.carsAttr | seat }}
        </p>
      </header>
      <div class="carsContent" id="carsimg">
        <div class="info">
          <div>
            <h4 class="carsNumber">{{ data.carsNumber }}</h4>
            <div>
              <ul class="carsElectric" :class="data.oil | eletricNumber">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <p class="distance">
                <sub>约</sub>
                <strong>{{ data.countKm }}</strong>
                <sub>KM</sub>
              </p>
            </div>
          </div>
        </div>
        <img src="../../../assets/images/pic001.jpg" alt="" />
      </div>
      <footer>
        <a href="#" class="parkingLink">{{ data.parkingName }}</a>
      </footer>
    </section>

    <section
      class="carItem carDetailed"
      :style="'height:' + cars_info_height"
      v-if="cars_info_show"
    >
      <div class="scroll">
        <h4 class="column">
          {{ data.parkingName }}
          <i class="close" @click="closeCarsInfo"></i>
        </h4>
        <header>
          <h4 class="carsLogo">
            <img
              src="../../../assets/images/cars-logo.png"
              alt="Mustang 2019款"
            />
            <span class="name">{{ data.carsMode }}</span>
          </h4>
          <p class="carsAttr">
            {{ data.energyType === "2" ? "汽油" : "新能源" }}
            {{ data.carsAttr | seat }}
          </p>
        </header>
        <img src="../../../assets/images/pic001.jpg" alt="" width="100%" />
        <div class="clearfix">
          <h4 class="pull-left fs24">{{ data.carsNumber }}</h4>
          <p class="pull-right distance">
            <sub>约</sub>
            <strong>{{ data.countKm }}</strong>
            <sub>KM</sub>
          </p>
        </div>
        <div class="carElectrivBox">
          <div class="p-r">
            <span
              class="electric-high p-a"
              :style="`width: ${data.oil}%`"
            ></span>
            <span class="electric-box"></span>
          </div>
        </div>
        <p class="color-main ta-c pinfo">
          取车支付12.0元停车费，实际补贴12.0元
        </p>
        <ul class="bookingType">
          <li
            v-for="item in LeasePrice"
            :key="item.carsLeaseTypeId"
            :class="{ current: selectedLease === item.carsLeaseTypeId }"
            @click="selectLeaseType(item)"
          >
            <h4 class="pull-left">{{ item.carsLeaseTypeName }}</h4>
            <span class="pull-right">￥{{ item.price }}</span>
          </li>
        </ul>
        <div class="clause clearfix">
          <span class="pull-left">参保《全面保障服务》用车更放心</span>
          <i class="pull-right current"></i>
        </div>
        <a href="#" class="selectCarBtn" @click="ReserveCars">预约车辆</a>
      </div>
    </section>
  </div>
</template>

<script>
import { GetCarsLease, ReserveCars } from "../../../api/cars";
import { getToken } from "../../../utils/cookiesCars";
export default {
  name: "CarList",
  filters: {
    eletricNumber(val) {
      const number = Math.round(val / 10);
      return `active-li-${number}`;
    },
    seat(val) {
      if (!val) return "";
      const valJson = JSON.parse(val);
      if (valJson.basis && valJson.basis.seat) {
        return valJson.basis.seat;
      }
    },
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      cars_info_show: false,
      cars_info_height: 0,
      timer: null,
      LeasePrice: [],
      selectedLease: "",
      //校验提示
      message_item: this.$store.state.config.message_item,
      // 用户状态审核
      audit_account_status: [
        "check_real_name",
        "check_cars",
        "gilding",
        "illegalAmount",
        "subscribe",
      ],
    };
  },
  methods: {
    getCarsInfo() {
      this.openCarsInfo();
    },
    openCarsInfo() {
      const viewHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      const height = viewHeight - 145 > 870 ? 870 : viewHeight - 145;
      this.cars_info_show = true;
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.cars_info_height = `${height}px`;
        clearTimeout(this.timer);
      }, 10);
      this.getCarsLease();
    },
    closeCarsInfo() {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.cars_info_height = "0px";
        clearTimeout(this.timer);
      }, 10);
      this.cars_info_show = false;
    },
    getCarsLease() {
      if (this.LeasePrice && this.LeasePrice.length > 0) return false;
      GetCarsLease({ carsId: this.data.id }).then((response) => {
        if (response.data) {
          const data = response.data.data;
          this.LeasePrice = data;
        }
      });
    },
    selectLeaseType(data) {
      this.selectedLease = data.carsLeaseTypeId;
    },
    //预约车辆
    ReserveCars() {
      if (!getToken()) {
        this.$router.push({
          name: "Login",
        });
        return false;
      }
      if (!this.selectedLease) {
        this.$message({
          type: "warning",
          message: "请选择租车类型",
        });
        return false;
      }
      const requestData = {
        cars_id: this.data.id,
        cars_lease_type_id: this.selectedLease,
      };
      ReserveCars(requestData).then((response) => {
        const data = response.data;
        let message = "";
        let key = Object.keys(data);
        if (key && key.length > 0) {
          if (this.audit_account_status.includes(key[0])) {
            if (this.message_item[key[0]]) {
              message = this.message_item[key[0]].msg;
            }
            this.$confirm(message, "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }).then(() => {
              if (key[0]) {
                let router = this.message_item[key[0]].router;
                if (router) {
                  this.$router.push({
                    name: router,
                    query: {
                      type: this.message_item[key[0]].type,
                    },
                  });
                }
              }
            });
          }
        }
      });
    },
  },

  beforeMount() {},
};
</script>

<style lang='scss'>
.carItem {
  width: 505px;
  height: 257px;
  background-color: #fff;
  border-radius: 24px;
  margin: auto;
  padding: 30px 30px 0;
  @include webkit(box-sizing, border-box);
  @include webkit(box-shadow, 0 0 18px 0 rgba(0, 0, 0, 0.2));
  header {
    display: flex;
    h4,
    p {
      flex: 1;
    }
  }
}
.carsLogo {
  img {
    display: inline-block;
    vertical-align: middle;
    height: 34px;
    margin-right: 10px;
  }
  .name {
    font-size: 16px;
  }
}
.carsAttr {
  text-align: right;
  opacity: 0.5;
  line-height: 34px;
}
.carsContent {
  position: relative;
  margin: 11px 0 7px;
  @extend %clearfix;
  img {
    float: right;
    height: 120px;
  }
  .info {
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    align-items: center;
  }
}
.carsNumber {
  font-size: 24px;
}
.distance {
  display: inline-block;
  strong {
    margin: 0 5px;
    font-size: 18px;
  }
  sub {
    bottom: 0.25px;
    margin-left: 5px;
  }
}
.carsElectric {
  padding-top: 10px;
  display: inline-block;
  li {
    display: inline-block;
    width: 7px;
    height: 24px;
    border-radius: 100px;
    margin-right: 3px;
    background-color: #e1e1e1;
  }
  @for $i from 1 through 10 {
    &.active-li-#{$i} {
      li:nth-child(-n + #{$i}) {
        background: linear-gradient(#17a8fa, #108dd9);
      }
    }
  }
}
.parkingLink {
  position: relative;
  display: block;
  padding-top: 10px;
  border-top: 1px solid #e1e1e1;
  color: $color-main;
  opacity: 0.8;
  line-height: 28px;
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    width: 8px;
    height: 8px;
    margin-top: -3px;
    border-top: 1px solid #d6d7d9;
    border-right: 1px solid #d6d7d9;
    @include webkit(transform, rotate(45deg));
  }
}
.carDetailed {
  // display: none;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 0px;
  @include webkit(transition, all 0.3s ease 0s);
  .selectCarBtn {
    position: absolute;
    left: 50%;
    bottom: -42px;
    margin-left: -120px;
  }
}
.column {
  position: relative;
  font-size: 20px;
  columns: #34393f;
  border-bottom: 1px solid #e1e1e1;
  margin-bottom: 19px;
  padding: 26px 0 20px;
  .close {
    position: absolute;
    top: 23px;
    right: 0px;
    width: 26px;
    height: 26px;
    cursor: pointer;
    &:after,
    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      height: 20px;
      margin-top: -10px;
      margin-left: -1px;
      border-left: 2px solid #999c9f;
    }
    &:before {
      @include webkit(transform, rotate(45deg));
    }
    &:after {
      @include webkit(transform, rotate(-45deg));
    }
  }
}
.carElectrivBox {
  padding: 15px;
  margin-top: 17px;
  border-radius: 100px;
  @include webkit(box-shadow, 0 0 10px 0 rgba(0, 0, 0, 0.1));
  .electric-box {
    display: block;
    height: 8px;
    background-color: #e1e1e1;
    border-radius: 100px;
  }
  .electric-high {
    top: 0;
    left: 0;
    background-color: $color-blue;
    height: 100%;
    border-radius: 100px;
  }
}
.pinfo {
  margin: 32px 0 18px;
}
.bookingType {
  li {
    height: 43px;
    margin-bottom: 15px;
    padding: 0 17px 0 20px;
    background-color: #f3f3f3;
    border: 2px solid #f3f3f3;
    border-radius: 10px;
    font-size: 16px;
    line-height: 43px;
    &.current {
      border-color: $color-blue;
    }
  }
}
.clause {
  margin-bottom: 40px;
  i {
    width: 20px;
    height: 20px;
    border-radius: 100px;
    background-color: #cccccc;
    &.current {
      background-color: #34393f;
    }
    &:before {
      content: "";
      display: block;
      width: 4px;
      height: 8px;
      border-right: 2px solid #fff;
      border-bottom: 2px solid #fff;
      margin: 4px 0px 0px 7px;
      @include webkit(transform, rotate(45deg));
    }
  }
}
.swiper-slide {
  margin-right: 250px !important;
}
</style>