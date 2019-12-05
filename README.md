# webar-vue-three-ar

## Project create 

1- Create Project 

```shell
$ cd $HOME
$ git clone webar-vue-three-ar # empty project from github
$ vue create webar-vue-three-ar
```

### Add package 
```shell
$ npm install babylonjs --save
+ babylonjs@4.0.3
added 1 package from 2 contributors and audited 24358 packages in 18.094s
$ npm install --save webrtc-adapter
+ webrtc-adapter@7.3.0
added 3 packages from 1 contributor and audited 24358 packages in 15.188s
```

### Add vue.config.js file to support https

file vue.config.js
```shell
module.exports = {
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8081, 
    https: true,
    hotOnly: false,
  },
}
```
Note: Open browser https://localhost:8081/


### Reference

See [Zap](https://zap.works/competitions/)
See [Vue](https://vuejs.org/).
See [Configuration Reference](https://cli.vuejs.org/config/).
See [Three JS ](https://threejs.org/).
See [Three JS Package](https://www.npmjs.com/package/three).
See [AR.js](https://github.com/google-ar/three.ar.js).
See [WebXR ](https://github.com/immersive-web/webxr).
See [Blog ](https://medium.com/@pulkit.16296/building-markerless-ar-for-web-using-three-ar-js-part-1-5eca95d545ec)
See [QR Generator](https://www.the-qrcode-generator.com/)
See [WebGL Tutorial](http://www.webglacademy.com/)

