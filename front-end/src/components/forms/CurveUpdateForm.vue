<template>
  <div>
    <loader v-if="isloaded == true"></loader>
      <div v-else class="container">
            <div>
              <h2> Update your curve </h2>
              <form v-on:submit.prevent="updateCurve">
                  <label> Lag : </label>
                  <input v-model="lag" type="number" placeholder="Lag" disabled />
                  <label> Coefficient : </label>
                  <input v-model="coefficient" type="number" placeholder="Coefficient" disabled/>
                <div v-for="(c, index) in curve">
                  <div>
                    <h5> Curve {{index}} </h5>
                    <div v-if="c.value == 'sigmoid'" class="col s6">
                      <label> Lambda : </label>
                      <input type="number" placeholder="Lambda" v-model="c.params.lambda" step="0.01"/>
                    </div>
                    <div v-if="c.value == 'polynomial'" class="col s6">
                      <label> Polynomial expression : </label>
                      <input type="number" placeholder="Polynomial Expression" v-model="c.params.poly" step="0.01"/>
                    </div>
                    <div class="col s12" v-if="c.value == 'gaussian'">
                      <div class="col s6">
                        <label> Mean : </label>
                        <input type="number" placeholder="Mean" v-model="c.params.mu" step="0.01"/>
                      </div>
                      <div class="col s6">
                        <label> Variance : </label>
                        <input type="number" placeholder="Variance" v-model="c.params.sigma" step="0.01"/>
                      </div>
                    </div>
                    <div class="col s6">
                      <label> Self Coefficient : </label>
                      <input type="number" placeholder="Self Coefficient" v-model="c.params.coef" step="0.01"/>
                    </div>
                    <div v-if="c.value != 'gaussian' && c.value != 'polynomial'" class="col s6">
                      <label> Delta : </label>
                      <input type="number" placeholder="Self Delta" v-model="c.params.delta" step="0.01"/>
                    </div>
                    <div v-if="c.value == 'sigmoid'" class="col s6">
                      <label> Const : </label>
                      <input type="number" placeholder="Const" v-model="c.params.const" step="0.01"/>
                    </div>
                  </div>
                  <div class="Nfloat"></div>
                </div>
                <input type="submit" class="btn" value="Update" />
              </form>
          </div>
        </div>
  </div>

</template>

<script>
import Loader from '../loaders/Loader'

export default {
  name: 'updatecurveform',
  components:{
    'loader': Loader
  },
  data () {
    return {
        curve: [{value:'', params: {}}],
        coefficient:'',
        lag: '',
        res: '',
        id: '',
        isloaded:''
    }
  },
  mounted(){
    this.$http.get(process.env.API_URL+'/curve/'+this.$route.params.id)
        .then(response => {
           this.curve = response.data.curve;
           this.lag = response.data.lag;
           this.coefficient = response.data.coefficient;
           this.res = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
  },

  methods: {
    updateCurve(){
      this.isloaded = true;
      this.$http.put(process.env.API_URL+'/curve/'+this.$route.params.id,{
        'id': this.$route.params.id,
        'curve': this.curve,
        'coefficient': this.coefficient,
        'lag': this.lag,
        'input_id': this.res.input_id
      })
        .then(response => {
          this.isloaded = false;
          this.$router.push('/input/'+this.res.input_id);
        })
        .catch(error =>{
          console.log(error);
        });
    }
  }
}
</script>

<style scoped>
h2{
  text-align: center;
}
</style>
