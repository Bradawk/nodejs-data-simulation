<!-- ## INPUT BLOCK VUE ## -->
<template>
<div>
      <div v-if="curve.length > 0" class="input-link">
        <router-link :to="{ name: 'Input', params: { id: id }}">Open Input<i class="material-icons left">remove_red_eye</i></router-link><br>      
      </div>
      <div v-else class="input-link">
        <router-link :to="{ name: 'AddInput', params: { id: id }}">Add Curves<i class="material-icons left">add</i></router-link><br>
      </div>
    </div>
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
      isloaded: ''
    }
  },
  beforeMount(){
    this.getCurves(this.id);
  },
  methods: {
      getCurves(id){
        this.isloaded = false;
        this.$http.get(process.env.API_URL+'/input/curves/'+id)
        .then(response => {
            this.curve = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
        this.$emit('curveCount');
      }
  }
}
</script>

<style scoped>
  .input-details{
    display: inline-block;
  }

</style>
