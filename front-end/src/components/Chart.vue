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
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
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
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
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
