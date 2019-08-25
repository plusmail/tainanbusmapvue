<template>
    <BusRoute :busRouteData="switchLineDirection" @get-bound="rebounds"></BusRoute>
</template>

<script>
import BusRoute from './BusRoute.vue'

export default {
  name: 'BusRouteMaster',
  components: {
      BusRoute
  },
  props:{
      busRouteMasterData:{
          type: Object,
          default:() => {}
      },
      showForward:{
          type:Boolean,
          default: true
      }
  },
  computed:{
      switchLineDirection : function(){
        if(this.showForward === true)
            return this.busRouteMasterData.forwardRoute;
        else
            return this.busRouteMasterData.backwardRoute;
      }
  },
  methods:{
      rebounds:function (value) {
          this.$emit('return-bound' , value);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>