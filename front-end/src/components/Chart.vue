<template>
    <div>
        <div class="col s12">
                <canvas :id='id'></canvas>
        </div>
    </div>
</template>
<script>
import {Line} from 'vue-chartjs'

export default Line.extend({
name: 'function-plot',
props: ['id'],
data () {
    return {
      curves: [],
    }
  },

  mounted () {
    this.$http.get(process.env.API_URL+'/curve/'+this.id)
        .then(response => {
            this.curves.push(response.data);
            var labels = [];
            for(var i = 0; i <= 2880; i++){
                labels.push(i);
            }
            var ctx = document.getElementById(this.id).getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        data: response.data.data_objects,
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
        })
        .catch(function (error) {
            console.log(error);
        });
    }
})
</script>
<style scoped>

</style>
