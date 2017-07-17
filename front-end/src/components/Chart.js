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
            this.renderChart({
                labels: labels,
                datasets: [
                    {
                    label: 'Data One',
                    backgroundColor: '#FC2525',
                    data: this.curves[0].data_objects
                    },{
                    label: 'Data Two',
                    backgroundColor: '#05CBE1',
                    data: this.curves[1].data_objects
                    }
                ]
                }, {responsive: true, maintainAspectRatio: false})
        })
        .catch(function (error) {
            console.log(error);
        });
  }
})