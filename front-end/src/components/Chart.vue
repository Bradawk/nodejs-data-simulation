<template>
    <div>
        <div class="col s6" id="plot"></div>
        <div class="col s6" id="plot2"></div>
    </div>
</template>
<script>
import {Line} from 'vue-chartjs'

export default Line.extend({

data () {
    return {
      curves: [],
    }
  },

  mounted () {
    this.$http.get(process.env.API_URL+'/input/curves/'+this.$route.params.id)
        .then(response => {
            this.curves = response.data;
            var labels = [];
            for(var i = 0; i <= 2880; i++){
                labels.push(i);
            }
            function draw() {
                try {
                functionPlot({
                    target: '#plot',
                    data: [{
                    fn: response.data[0].expression,
                    sampler: 'builtIn',
                    color: '#C9263B',
                    graphType: 'scatter'
                    }]
                });
                functionPlot({
                    target: '#plot2',
                    data: [{
                    fn: response.data[1].expression,
                    sampler: 'builtIn',
                    graphType: 'scatter'
                    }]
                });
                }
                catch (err) {
                console.log(err);
                }
            }
            draw();
        })
        .catch(function (error) {
            console.log(error);
        });
  }
})
</script>
<style scoped>

</style>