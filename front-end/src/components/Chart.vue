<template>
    <div>
        <div class="col s12">
            <div class="col s6">
                <canvas id="chart"></canvas>
            </div>
            <div class="col s6">
                <canvas id="chart2"></canvas>
            </div>
        </div>
    </div>
</template>
<script>
import {Line} from 'vue-chartjs'

export default Line.extend({
name: 'function-plot',
data () {
    return {
      curves: [],
    }
  },

  mounted () {
    this.$http.get(process.env.API_URL+'/input/curves/'+this.$route.params.id)
        .then(response => {
            this.curves.push(response.data);
            var labels = [];
            for(var i = 0; i <= 2880; i++){
                labels.push(i);
            }
        var ctx = document.getElementById("chart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    data: response.data[0].data_objects,
                    backgroundColor: ['#6ed3c9'],
                    pointRadius: 0,
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                        }
                    }],
                }
            }
        });
        var ctx2 = document.getElementById("chart2").getContext('2d');
        var myChart = new Chart(ctx2, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    data: response.data[1].data_objects,
                    backgroundColor: ['#6ed3c9'],   
                    pointRadius: 0,
                }],
                
            },
            
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                },
            }
        });
        })
        .catch(function (error) {
            console.log(error);
        });
  }
})
</script>
<style scoped>

</style>
