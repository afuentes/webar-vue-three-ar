<template>
   <div>

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
      message : null,
      modalOpen: false
    }
  },
 methods: {
  search: function() {
     this.$router.push({ path: '/search', query: { data: this.message } })
  }
  } // end methods
}
</script> 