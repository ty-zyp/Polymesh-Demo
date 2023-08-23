<template>
  <div>
111
  </div>
</template>
<script>
export default {
  data () {
    return {
      paramsObj:''
    }
  },
  props: {
    currentFunObj: {
      type: Object,
      default: () => { }
    }
  },
  watch: {
    currentFunObj: {
      deep: true,
      handler (obj) {
        console.log(obj)
      }
    }
  },
 
  methods: {

  }
}
</script>