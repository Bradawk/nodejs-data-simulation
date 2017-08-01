<template>
<div>
    <div class="container">
        <div class="col s12 jumbo">
            <div class="row">
                <div>
                    <h5> Output </h5>
                    <div  v-if="output">  
                        <span>Pearson Correlation : {{output.pcorr}}</span><br>
                        <span>Delta : {{output.delta}}</span><br>
                        <span>Consistency : {{output.consistency}}</span>
                    </div>
                    <div v-else>
                        <span> No outputs yet. </span><br>
                        <form v-on:submit.prevent="addOutput" method="POST">
                            <input style="margin-top: 2%;" class="btn waves-effect" type="submit" value="ADD OUTPUT" />
                        </form>
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
