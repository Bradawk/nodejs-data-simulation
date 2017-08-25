<!-- ## INPUT BLOCK VUE ## -->
<template>
<div>
    <div class="col s12 jumbo">
        <div class="row">
            <div>
                <div class="chart">
                    <div>
                        <function-plot></function-plot>
                    </div>
                </div>  
                <div class="col s6" v-for="c in curves">
                    <div style="margin-bottom: 5%;">
                        <span> ID : {{c._id}} </span><br>
                    </div>
                    <div class="Nfloat"></div>
                    <div>
                        <router-link v-if="c.lag" class="btn btn-floatin" :to="{ name: 'UpdateInput', params: { id: c._id }}">Update curve<i class="material-icons left">edit</i></router-link><br>
                    </div>
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

</style>
