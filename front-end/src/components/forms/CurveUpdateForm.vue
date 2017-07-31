<template>
  <div>
      <div class="col s6">
            <h2> Update your curve </h2>
            <form v-on:submit.prevent="updateCurve">
              <label> Lag : </label>
              <input type="number" placeholder="Lag" disabled />
              <label> Coefficient : </label>
              <input type="number" placeholder="Coefficient" disabled/>
              <div v-if="curve[0].value == 'sigmoid'" class="col s6">
                <label> Lambda : </label>
                <input type="number" placeholder="Lambda" v-model="curve[0].params.lambda" step="0.01"/>
              </div>
              <div v-if="curve[0].value == 'gaussian'" class="col s6">
                <label> Mean : </label>
                <input type="number" placeholder="Mean" v-model="curve[0].params.mu" step="0.01"/>
              </div>
              <div v-if="curve[0].value == 'gaussian'" class="col s6">
                <label> Variance : </label>
                <input type="number" placeholder="Variance" v-model="curve[0].params.sigma" step="0.01"/>
              </div>
              <div class="col s6">
                <label> Self Coefficient : </label>
                <input type="number" placeholder="Self Coefficient" v-model="curve[0].params.coef" step="0.01"/>
              </div>
               <div class="col s6">
                <label> Delta : </label>
                <input type="number" placeholder="Self Delta" v-model="curve[0].params.delta" step="0.01"/>
              </div>
               <div class="col s6">
                <label> Const : </label>
                <input type="number" placeholder="Const" v-model="curve[0].params.const" step="0.01"/>
              </div>
              <input type="submit" class="btn" value="Update" />
            </form>
        </div>
  </div>

</template>

<script>
export default {
  name: 'updatecurveform',
  data () {
    return {
        curve: [{value:'', params: {}}],
        coefficient:'',
        lag: ''
    }
  },
  mounted(){
    this.$http.get(process.env.API_URL+'/curve/'+this.$route.params.id)
        .then(response => {
           this.curve = response.data.curve;
           this.id = response.data._id;
           this.lag = response.data.lag;
           this.coefficient = response.data.coefficient;
           console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
  },

  methods: {
    updateCurve(){
      this.$http.post(process.env.API_URL+'/curve/update',{
        'id': this.id,
        'curve': this.curve,
        'coefficient': this.coefficient,
        'lag': this.lag
      })
        .then(response => {
          console.log(this.curve)
          this.$router.push('/');
        })
        .catch(error =>{
          console.log(error);
        });
    }
  }
 
}
</script>

<style>

</style>
