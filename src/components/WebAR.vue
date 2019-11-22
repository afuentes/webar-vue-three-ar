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
      constraints    : null,
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
    let devices= devices.filter( v => (v.kind=="videoinput"))
    let lastDevice= devices[devices.length-1];
        devices= devices.filter( v => (v.label.indexOf("back")>0))
    let device= null;
			if( devices.length > 0 ){
				device= devices[devices.length-1];
			} else{
				device= lastDevice;
			} // find back cam
				
			if( !device ){
                this.msg_status = 'No devices found !!'
				return;
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