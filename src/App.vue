<template>
  <div id="app">
    <a-scene embedded arjs='sourceType: webcam; debugUIEnabled: false;'>
          <a-marker-camera preset="hiro">
        <a-box position='0 0.5 0' material="opacity: 0.5;"></a-box>
      </a-marker-camera>
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
