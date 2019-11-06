<template>
  <div>
     <canvas class="layer3D"></canvas>
  </div>
</template>

<script>
import * as Three from 'three'

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
    mesh:null,
    width: 0,
		height: 0,
		shaded: true,
		zoom: 3
    }
  },
  mounted: function() {
  
  this.width = this.$el.offsetWidth;
	this.height = this.$el.offsetHeight;
	this.aspect = this.width / this.height;
	this.camera = new Three.PerspectiveCamera( 45, this.aspect, 1, 1024 );
	this.camera.position.set( this.zoom, this.zoom, this.zoom );
	this.camera.up.set( 0, 0, 1 );
  this.camera.lookAt( new Three.Vector3( 0, 0, 0 ) );
  this.scene = new Three.Scene();
  this.geometry = new Three.BoxGeometry(200, 200, 200);
  this.material = new Three.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true
        });
  this.mesh = new Three.Mesh(this.geometry, this.material);
  this.scene.add(this.mesh);
	this.renderer = new Three.WebGLRenderer({
			alpha: true,
			antialias: false,
			canvas: this.$el.getElementsByTagName("canvas")[ 0 ]
	});
	this.renderer.setPixelRatio( window.devicePixelRatio );
	this.renderer.setSize( this.width, this.height );
    
  },methods: {

  } // end methods
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
