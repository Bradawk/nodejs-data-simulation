<template>
<div>
    <div class="row header-resume">
          <div class="col">
            <small> Curve </small><br>
            <span>{{$route.params.id}} </span><br>
          </div>
    </div>
<div class="container">
        <div class="col s12 jumbo">
            <div class="row">
                <div>
                   <curve-update-form></curve-update-form>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</template>

<script>
import CurveUpdateForm from './forms/CurveUpdateForm'
export default {
  name: 'updateinput',
  components: {
      'curve-update-form': CurveUpdateForm
  },
  mounted(){
    this.$http.get(process.env.API_URL+'/curve/'+this.$route.params.id)
      .then(response =>{
        console.log(response)
      })
      .catch((error) =>{
        this.$router.push('/')
        console.log(error);
      })
  }
}
</script>

<style scoped>

</style>
