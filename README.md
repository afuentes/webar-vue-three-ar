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
$ npm install --save three three.ar.js
+ three@0.110.0
+ three.ar.js@0.1.8
added 2 packages from 2 contributors, updated 1 package and audited 24356 packages in 63.49s
found 0 vulnerabilities
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
See [WebXR ](https://github.com/immersive-web/webxr)

