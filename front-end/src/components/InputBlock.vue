<!-- ## INPUT BLOCK VUE ## -->
<template>
<div class="input-details">
    <span><i class="material-icons">show_chart</i> Number of curves : {{curve.length}}</span><br>
    <span><i class="material-icons">functions</i> Function type : </span>
</div>
</template>

<!-- ## INPUT BLOCK VUE ## -->

<script>
export default {
  name: 'inputblock',
  props:['id'],
  data () {
    return {
      curve: [],
    }
  },
  mounted(){
    this.getCurves(this.id);
  },
  methods: {
      getCurves(id){
        this.$http.get(process.env.API_URL+'/input/curves/'+id)
        .then(response => {
            this.curve = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
      }
  }
}
</script>