<template>
   <div>
       <button>cam</button>
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
             .then(this.getCamBack)
             .catch(this.handlerError);
    navigator.mediaDevices.getUserMedia(
          this.constraints, 
          this.successCallback, 
          this.errorCallback);
  },
 methods: {
  getCamBack: function(devices) {
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
  handlerError: function(err){
      this.msg_status = 'Error problems:'+err
  },

  } // end methods
}
</script> 