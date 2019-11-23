<template>
   <div class="box">
    <video ref="camera" autoPlay playsInline class="camera" 
           v-on:loadedmetadata="updateDimensions" >
    </video> 
    <canvas  
            ref="canvas" id="canvas">
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
      constraints: {
                    'audio': false,
                    'video': {facingMode: 'environment'}
      },
      dimensions: {
          width: 0,
          height: 0
        },
      msgStatus    : '',
      canvasElement: null

    }
  },
  mounted: function () {
      this.setupCamera()
      this.canvasElement = this.$refs.canvas;
  },
 methods: {
   setupCamera: async function() {  
     try {
           
          if (navigator.mediaDevices && 
              navigator.mediaDevices.getUserMedia) {
            this.stream = await navigator.mediaDevices.getUserMedia(this.constraints);
            this.videoElement = this.$refs.camera; 
 
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
            // update draw
            this.canvasElement = this.$refs.canvas;
           let fullscreen = canvasElement.webkitRequestFullscreen || 
                            canvasElement.mozRequestFullScreen || 
                            canvasElement.msRequestFullscreen;
            fullscreen.call(this.canvasElement); 
            window.requestAnimationFrame(this.updateDraw);
             }
      } catch (e) {
              this.handleError(e);
      } // end try
    },
   updateCanvas: function(){
       this.updateCanvas.clearRect(0,0,this.dimensions.width,this.dimensions.height); 
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
  updateDimensions: function(event){
    let videoElement = event.target
    this.dimensions.width  = videoElement.videoWidth
    this.dimensions.height = videoElement.videoHeight
  },
  Log: function(msg){
      this.msgStatus = this.msgStatus +' '+msg 
  },
  updateDraw: function(){
    let ctx = document.getElementById('canvas').getContext('2d');
    ctx.clearRect(0,0,this.dimensions.width,this.dimensions.height);
    ctx.drawImage(this.videoElement,0,0,this.dimensions.width,this.dimensions.height);
    // draw something
    ctx.fillStyle = "red";
    ctx.fillRect(10, 10, 20, 20);
    window.requestAnimationFrame(this.updateDraw);
  }
  } // end methods
}
</script> 
<style>
.box{
  position: relative;
  max-width: 100%;
  max-height: 100%;
  z-index: 0; 
}
.camera {
   position: fixed; right: 0; bottom: 0;
   min-width: 100%; min-height: 100%;
   width: auto; height: auto; z-index: -100;
   background-size: cover; 
}
.canvas {
   position: fixed; right: 0; bottom: 0;
   min-width: 100%; min-height: 100%;
   width: auto; height: auto; z-index: -100;
   background-size: cover; 
}
</style>