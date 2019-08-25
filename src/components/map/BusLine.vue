<template>
    <div v-if="checkDataIsExist">
        <!-- Line -->
        <l-polyline v-for="(raod , index) in busLineData.Roads"
        :key="'Roads_' + index"
        :lat-lngs="raod.Points"
        :color="busLineData.Color"
        :interactive="false">
        </l-polyline>

        <!-- Stops -->
        <BusStop v-for="(stop , index) in busLineData.Stops" 
        :key="'Stops_' + index" 
        :busStopData="stop">
        </BusStop>
    </div>
</template>

<script>
import { LPolyline } from 'vue2-leaflet'
import BusStop from './BusStop.vue'

export default {
  name: 'BusLine',
  components: {
      LPolyline,
      BusStop
  },
  props:{
      busLineData:{
          type: Object,
          default:() => {}
      }
  },
  computed:{
      checkDataIsExist : function(){
          return this.busLineData !== undefined;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>