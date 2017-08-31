<!-- ## INPUT BLOCK VUE ## -->
<template>
<div>
    <div class="row">
        <div v-for="c in curves" class="col s6 jumbo">
            <div>
                <div>
                    <function-plot :id="c._id"></function-plot>
                </div>
                <div>
                    <span> ID : {{c._id}} </span><br>
                </div>
                <div class="Nfloat"></div>
                <div v-if="c.lag">
                    <span> Lag : {{c.lag}} </span><br>
                    <span> Coefficient : {{c.coefficient}} </span><br>
                    <router-link v-if="c.lag" class="btn btn-floatin" :to="{ name: 'UpdateInput', params: { id: c._id }}">Update curve<i class="material-icons left">edit</i></router-link><br>
                </div>
            </div>   
        </div>
    </div>
</div>
</template>

<!-- ## INPUT BLOCK VUE ## -->

<script>
import Chart from './Chart'
export default {
    
  name: 'curve',
  components:{
      'function-plot': Chart,
  },
  data () {
    return {
        curves: []
    }
  },
  mounted(){
      this.$http.get(process.env.API_URL+'/input/curves/'+this.$route.params.id)
        .then(response => {
            this.curves = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
  },
}
</script>
<style scoped>
    div{
        text-align: center;
    }

    .col.s6:first-child{
        margin-right: 2%;
    }

    .col.s6{
        width: 49%;
    }

    .jumbo{
        min-height: 600px; 
    }

    .btn{
        margin-top: 3%;
    }

</style>
