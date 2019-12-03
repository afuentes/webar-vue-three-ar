<template>
   <div class="box">
    <video ref="camera" autoPlay playsInline class="camera" >
    </video> 
    <canvas ref="canvas" id="canvas"
     v-on:mousedown="handleMouse" 
     v-on:mouseup="handleMouse" 
     v-on:mousemove="handleMouse" 
     v-on:touchstart="handleMouse"
     v-on:touchmove="handleMouse" 
     v-on:touchend="handleMouse" 
     >
    </canvas>
   </div>
</template>

<script>

export default {
  name: 'WebAR',
  components: {
  },
  props: {
  },
  data () {
    return {
      constraints: {'audio': false, 'video': {facingMode: 'environment'} },
      canvasElement: null,
      videoElement: null,
      engine: null,
      scene:  null,
      dimensions: {
          width: 0,
          height: 0
        },
      msgStatus    : null
    }
  },
  mounted: function () {
      this.fullscreen()
      this.setupCamera()
      this.loadEngine()
      this.loadScene()
  },
 methods: {
   fullscreen: function(){
    let w = window.innerWidth; let h = window.innerHeight
    this.videoElement  = this.$refs.camera
    this.canvasElement = this.$refs.canvas
    this.videoElement.width    = w
    this.videoElement.height   = h
    this.canvasElement.width   = w
    this.canvasElement.height  = h
    this.dimensions.width      = w
    this.dimensions.height     = h,
    this.createScene           = null,
    this.scene                 = null
   },
   setupCamera: async function() {  
     try {
           
          if (navigator.mediaDevices && 
              navigator.mediaDevices.getUserMedia) {
            this.stream = await navigator.mediaDevices.getUserMedia(this.constraints);
 
            if (this.videoElement.srcObject !== undefined) {
               this.videoElement.srcObject = this.stream;
            } else if (this.videoElement.mozSrcObject !== undefined) {
               this.videoElement.mozSrcObject = this.stream;
            } else if (window.URL.createObjectURL) {
               this.videoElement.src = window.URL.createObjectURL(this.stream);
            } else if (window.webkitURL) {
              this.videoElement.src = window.webkitURL.createObjectURL(this.stream);
            } else {
              this.videoElement.src = this.stream;
            }      
             window.requestAnimationFrame(this.updateDraw); // 60 FPS Frame per Second
             }
      } catch (e) {
              this.handleError(e);
      } // end try
    },

   handleError: function(error){
        if (error.name === 'NotAllowedError') {
          this.Log("ERROR: you need to grant camera access permisson")
        } else if (error.name === 'NotFoundError') {
          this.Log("ERROR: no camera on this device")
        } else if (error.name === 'NotSupportedError') {
          this.Log("ERROR: secure context required (HTTPS, localhost)")
        } else if (error.name === 'NotReadableError') {
          this.Log("ERROR: is the camera already in use?")
        } else if (error.name === 'OverconstrainedError') {
          this.Log("ERROR: installed cameras are not suitable")
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.Log("ERROR: Stream API is not supported in this browser")
        } else {
          this.Log(error);
        }
  },
  updateDraw: function(){

    if (window.WebGLRenderingContext) {
        this.ctxWebGL = this.canvasElement.getContext('webgl').getContext('2d');
     }
    ctxWebGL.clearRect(0,0,this.dimensions.width,this.dimensions.height);
    ctxWebGL.drawImage(this.videoElement,0,0,this.dimensions.width,this.dimensions.height);
    // draw something
    ctxWebGL.fillStyle = "yellow";
    ctxWebGL.fillRect(10, 10, 100, 300);
    window.requestAnimationFrame(this.updateDraw);
  },
  handleMouse: function(event){
     event.preventDefault(); 
  },
  Log: function(msg){
      this.msgStatus = this.msgStatus +' '+msg 
  }
  } // end methods
}

</script> 
<style>

.camera {
   margin: 0;padding: 0;
   position: fixed; right: 0; bottom: 0;
   min-width: 100%; min-height: 100%;
   width: auto; height: auto; z-index: -100;
}

</style>