<template>
    <l-feature-group ref="features">
        <!-- Main Line -->
        <BusLine :busLineData="busRouteData.mainLine"></BusLine>

        <!-- Extend Line -->
        <BusLine v-if="checkExtend" :busLineData="busRouteData.extendLine"></BusLine>
    </l-feature-group>
</template>

<script>
import { LFeatureGroup } from 'vue2-leaflet'
import BusLine from './BusLine.vue'

export default {
  name: 'BusRoute',
  components: {
      LFeatureGroup,
      BusLine
  },
  props:{
      busRouteData:{
          type: Object,
          default:() => {}
      }
  },
  computed:{
      checkExtend :function(){
          return this.busRouteData.extendLine !== undefined;
      }
  },
  updated: function(){
    let bounds = this.$refs.features.mapObject.getBounds();
    this.$emit('get-bound' , bounds);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>