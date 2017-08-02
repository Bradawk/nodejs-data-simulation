<template>
<div>
    <div class="container">
        <div class="col s12 jumbo">
            <div class="row">
                <div>
                    <h5> Output </h5>
                    <div>  
                        <span>Pearson Correlation : {{output.pcorr}}</span><br>
                        <span>Delta : {{output.delta}}</span><br>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>

export default {
  name: 'output',
  data () {
    return {
        output: [],
        input_id: ''
    }
  },
  mounted() {
    this.$http.get(process.env.API_URL+'/output/input/'+this.$route.params.id)
        .then(response => {
            this.output = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
 },
 methods:{
     addOutput(){
         this.$http.post(process.env.API_URL+'/output',{'input_id':this.$route.params.id})
            .then(response => {
                this.$router.go('/input/'+this.$route.params.id);
            })
            .catch(function(error){
                console.log(error)
            });
     }
 }
}

</script>

<style scoped>
.row div span{
    text-align: left;
}
</style>
