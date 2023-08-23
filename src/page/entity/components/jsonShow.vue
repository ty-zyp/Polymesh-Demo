<template>
  <div>
    <json-viewer :value="htmlContent" ></json-viewer>
  </div>
</template>
<script>
export default {
  data () {
    return {
      htmlContent: ''
    }
  },
  methods: {

  },
  mounted () {
    const json = [
      { a: 1, b: 2 },
      { a: 11, b: 22, c: { aaa: 11 } }
    ]
    this.htmlContent = json
  }
}

</script>
<style scoped>
/* pre {
  outline: 1px solid #ccc;
  padding: 5px;
  margin: 5px;
}
.string {
  color: green;
}
.number {
  color: darkorange;
}
.boolean {
  color: blue;
}
.null {
  color: magenta;
}
.key {
  color: red;
} */
</style>