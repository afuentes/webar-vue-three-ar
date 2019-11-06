<template>
  <div>
    <h1>{{ msg }}</h1>
    <div v-html="renderer" >
  </div>
</template>

<script>
import * as THREE from 'three'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
data () {
    return {
     isShow:false,
     camera:null,
     scene:null,
     geometry:null,
     material:null,
     renderer:null,
    }
  },
  mounted: function() {

  },methods: {
     onInit: function(){
      this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
      this.camera.position.z = 1;
 
      this.scene = new THREE.Scene();
 
      var geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
      var material = new THREE.MeshNormalMaterial();
 
      var mesh = new THREE.Mesh( geometry, material );
      this.scene.add( mesh );
 
      this.renderer = new THREE.WebGLRenderer( { antialias: true } );
      this.renderer.setSize( window.innerWidth, window.innerHeight );
      
     },
     onRender: function(){

     }
  } // end methods
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
