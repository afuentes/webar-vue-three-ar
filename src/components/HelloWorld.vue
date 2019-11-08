<template>
  <div class="vue-full" >
                <a-scene arjs='sourceType: webcam; debugUIEnabled: false'>
                    <a-anchor hit-testing-enabled="true">
                        <a-entity position='0 0 0' scale='0.05 0.05 0.05' rotation='200 0 0' obj-model='obj: url(models/dog.obj); mtl: url(models/dog.mtl)'></a-entity>
                        {/*<a-box position='0 0 0.5' material='opacity: 0.7; color: yellow;'></a-box>*/}
                    </a-anchor>
                    <a-camera-static preset="hiro" />
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
