<template>
   <div class="box">
   <!-- <video ref="camera" autoPlay playsInline class="camera" >
    </video>  --> 
    <canvas ref="canvas" id="canvas">
    </canvas>
   </div>
</template>

<script>
import * as BABYLON from 'babylonjs';

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
      //this.setupCamera()
      this.loadEngine()
      this.loadScene()
  },
 methods: {
   fullscreen: function(){
    let w = window.innerWidth; let h = window.innerHeight
    //this.videoElement  = this.$refs.camera
    this.canvasElement = this.$refs.canvas
    //this.videoElement.width    = w
    //this.videoElement.height   = h
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
             //window.requestAnimationFrame(this.updateDraw); // 60 FPS Frame per Second
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
    let ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0,0,this.dimensions.width,this.dimensions.height);
    ctx.drawImage(this.videoElement,0,0,this.dimensions.width,this.dimensions.height);
    // draw something
    ctx.fillStyle = "yellow";
    ctx.fillRect(10, 10, 100, 300);
    // call the createScene function
   // this.scene.render();
    // run the render loop
    //this.engine.runRenderLoop(function(){
    //     this.scene.render();
    //});

    window.requestAnimationFrame(this.updateDraw);
  },
  loadEngine:  function(){
    this.engine = new BABYLON.Engine(this.canvasElement, true ,{preserveDrawingBuffer: true, stencil: true});
    this.engine.setSize(this.dimensions.width,this.dimensions.height);
  },
 loadScene: function(){
    const _this = this
    this.createScene = function() {
    var myVideo;            // Our Webcam stream (a DOM <video>)
    var isAssigned = false; // Is the Webcam stream assigned to material?

    var scene = new BABYLON.Scene(this.engine);

    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 1, -10), scene);
    camera.setTarget(new BABYLON.Vector3(0, 1, 0));
    camera.attachControl(this.canvasElement, true);

    var plane1 = BABYLON.Mesh.CreatePlane("plane1", 7, scene);
    plane1.rotation.z = Math.PI;
    plane1.position.y = 1;

    var videoMaterial = new BABYLON.StandardMaterial("texture1", scene);
    videoMaterial.emissiveColor = new BABYLON.Color3(1,1,1);

    // Create our video texture
    BABYLON.VideoTexture.CreateFromWebCamAsync(scene, function (videoTexture) {
        myVideo = videoTexture;
        videoMaterial.diffuseTexture = myVideo;
    },{ minWidth: this.canvasElement.width,
        maxWidth: this.canvasElement.width, 
        minHeight: this.dimensions.height,
        maxHeight: this.dimensions.height,
        });

    // When there is a video stream (!=undefined),
    // check if it's ready          (readyState == 4),
    // before applying videoMaterial to avoid the Chrome console warning.
    // [.Offscreen-For-WebGL-0xa957edd000]RENDER WARNING: there is no texture bound to the unit 0
    scene.onBeforeRenderObservable.add(function () {
        if (myVideo !== undefined && isAssigned == false) {
            if (myVideo.video.readyState == 4) {
                plane1.material = videoMaterial;
                isAssigned = true;
            }
        }
    });

    return scene;
};
    // call the createScene function
    this.scene = this.createScene();
    // run the render loop
    this.engine.runRenderLoop(function(){
         _this.scene.render();
    });
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