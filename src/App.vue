<template>
  <div id="app">
                <a-scene arjs='sourceType: webcam; debugUIEnabled: true'>
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
  name: 'app',
  components: {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  overflow: hidden;
}
</style>
