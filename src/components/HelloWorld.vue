<template>
  <div class="vue-full" >
    <a-scene embedded arjs>
      <a-marker preset="hiro">
          <a-box position='0 0.5 0' material='color: yellow;'></a-box>
      </a-marker>
      <a-entity camera></a-entity>
    </a-scene>
  </div>
</template>

<script>

export default {
name: 'HelloWorld',
props: {
    msg: String
},
data () {
    return {
    isShow:false
    }
  },
  mounted: function() {

  },methods: {

  } // end methods
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.vue-full {
        width: 100%;
        height: 100%;
    }

</style>
