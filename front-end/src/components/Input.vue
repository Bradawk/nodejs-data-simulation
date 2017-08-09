<template>
    <div>
        <div class="row header-resume">
            <div class="col">
                <small> Input </small><br>
                <span>{{$route.params.id}} </span><br>
            </div>
        </div>
        <loader v-if="isloaded == true"></loader>
        <div v-else class="container">
            <curve></curve>
            <output-block></output-block>
        </div>
    </div>
</template>

<script>

import CurveForm from './forms/CurveForm'
import Curve from './Curve'
import OutputBlock from './OutputBlock'
import Loader from './loaders/Loader'

export default {
  name: 'input',
  components: {
    'curveform': CurveForm,
    'curve': Curve,
    'output-block': OutputBlock,
    'loader': Loader
  },
  data () {
    return {
        curves: [],
        isloaded: ''
    }
  },
  mounted() {
        this.isloaded = true;
        this.$http.get(process.env.API_URL+'/input/curves/'+this.$route.params.id)
        .then(response => {
            this.isloaded = false;
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

    [v-cloak] {
        display: none;
    }
    
</style>
