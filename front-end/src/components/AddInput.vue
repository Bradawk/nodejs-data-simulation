<template>
<div>
    <div class="row header-resume">
          <div class="col">
            <small> Input </small><br>
            <span>{{$route.params.id}} </span><br>
          </div>
    </div>
    <div class="container">     
        <curveform></curveform>
    </div>
</div>
</template>

<script>
import CurveForm from './forms/CurveForm'
export default {
  name: 'input',
  components: {
    'curveform': CurveForm,
  },
  mounted(){
    this.$http.get(process.env.API_URL+'/input/'+this.$route.params.id)
      .then(response =>{
        console.log(response);
      })
      .catch((error) =>{
        Materialize.toast('The input you\'re looking for doesn\'t exist...','2000');
        this.$router.push('/')
      })
  }
}

</script>

<style scoped>

</style>
