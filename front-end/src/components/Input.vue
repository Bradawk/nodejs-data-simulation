<template>
<div>
    <div class="row header-resume">
          <div class="col">
            <small> Input </small><br>
            <span>{{$route.params.id}} </span><br>
          </div>
    </div>
<div class="container">
        <div class="col s12 jumbo">
            <div class="row">
                <!-- ## If no curves, then display form ## -->
                <div v-if="curves.length == 0">
                    <curveform></curveform>
                </div>
                <!-- ## If curves, then display details ## -->
                <div v-else>
                   <curve></curve>
                </div>
                <!-- ## End of condition ## -->
            </div>
        </div>
    </div>
</div>
</div>
</template>

<script>

import CurveForm from './forms/CurveForm'
import Curve from './Curve'

export default {
  name: 'input',
  components: {
    'curveform': CurveForm,
    'curve': Curve
  },
  data () {
    return {
        curves: []
    }
  },
  mounted() {
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
    .container{
        width: 90%;
        max-width: 100%;
    }

    .col h2{
        text-align: center;
    }

    .chart{
        margin-top: 5%;
        margin-bottom: 5%;
    }

</style>