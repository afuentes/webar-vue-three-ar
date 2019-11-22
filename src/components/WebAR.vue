<template>
   <div>
       <button>Camera</button>
       <video autoplay></video>
       <div>{{msg_status}}</div>
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
      msg_status: '',
      videoIn: null,
      constraints: null,
      camBack:null
    }
  },
  mounted: function () {
    navigator.mediaDevices.enumerateDevices()
             .then(this.gotDevices)
             .catch(this.handleError)

    navigator.mediaDevices.getUserMedia(this.constraints) 
          .then(this.gotStream) 
          .catch(this.handleError)
  },
 methods: {
  gotDevices: function(devices) {
    this.videoIn= devices.filter( v => (v.kind=="videoinput"))
        .filter(v => (v.label.indexOf("back")>0))

        if( this.videoIn == 0 ){
            this.msg_status = 'No devices found !!'
            return;
        }
        
		if( videoIn.length > 0 ){
			this.camBack= this.videoIn[videoIn.length-1];
		} else {
            this.camBack= this.videoIn[0]; 
        }	
			
		this.constraints =
			{
				audio: false, 
				video: {
					deviceId: { ideal: device.deviceId },
					width: { ideal: window.innerWidth },
					height: { ideal: window.innerHeight }
				}
			};

  },
  gotStream: function(stream){
        window.stream = stream; // make stream available to console
        videoElement.srcObject = stream;
  },
  handleError: function(err){
      this.msg_status = 'Error problems:'+error.message
  },

  } // end methods
}
</script> 