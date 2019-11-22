# webar-vue-three-ar

## Project create 

1- Create Project 

```shell
$ cd $HOME
$ git clone webar-vue-three-ar # empty project from github
$ vue create webar-vue-three-ar
```

### Add three package 
```shell
$ npm install --save three 
+ three@0.110.0
added 1 package from 1 contributor and audited 24354 packages in 14.603s
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

