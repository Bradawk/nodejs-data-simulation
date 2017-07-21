<!-- ## INPUT BLOCK VUE ## -->
<template>
<div>
    <div class="col s12 jumbo">
        <div class="row">
            <div>
                <div class="col s6" v-for="c in curves">
                    <span> ID : {{c._id}} </span><br>
                    <span v-if="c.delta"> Delta : {{c.delta}} </span><br>
                    <span> Types : {{c.types}} </span><br>
                    <div class="scroll curve_table_container">
                        <table class="data_table bordered striped">
                            <thead>
                                <tr>
                                    <th>X</th>
                                    <th> Y </th>
                                </tr>
                            </thead>
                                <tbody>
                                <tr v-for="i in 5">
                                    <td > {{i}} </td>
                                    <td>{{c.data_objects[i]}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-if="c.delta">
                        <router-link class="btn right" :to="{ name: 'UpdateInput', params: { id: c.input_id }}">Update curve<i class="material-icons left">edit</i></router-link><br>
                    </div>
                </div>
                
                <div class="chart">
                    <div>
                        <function-plot></function-plot>
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