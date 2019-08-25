<template>
    <l-marker :lat-lng="busStopData.Position">
        <l-icon :icon-url="iconLocation" :icon-size="iconSize"></l-icon>
        <l-popup>
            <h5>{{ busStopData.Name }}</h5>
            <br>站牌代碼：<b>{{ busStopData.ID }}</b><br>
            <b-button size="sm" @click="queryRealtime">經過路線/動態</b-button>
        </l-popup>
    </l-marker>
</template>

<script>
import { LMarker, LPopup, LIcon } from 'vue2-leaflet'

export default {
  name: 'BusStop',
  components: {
      LMarker,
      LPopup,
      LIcon
  },
  props:{
      busStopData:{
          type:Object,
          default:() => {}
      }
  },
  data() {
    return {
      iconSize : [20, 20]
    }
  },
  methods:{
      queryRealtime : function (e) {
          window.open("http://www.2384.com.tw/qrcode/vstop?code=" + this.busStopData.ID , this.busStopData.ID)
      }
  },
  computed:{
      iconLocation : function () {
          return "./Icons/busIcon" + this.busStopData.CategoryIndex + ".png";
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>