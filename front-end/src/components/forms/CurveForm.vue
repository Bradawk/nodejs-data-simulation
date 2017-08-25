<template>
    <div>
   <div v-if="isloaded == true" class="black-screen">
        <loader></loader>
    </div>
   <div v-else class="col s12 jumbo">
      <div class="row">
         <div>
            <div class="col s6">
               <h2> Curve Maker </h2>
               <label> Basic Function Type</label>
               <form id="add_curve_form" v-on:submit.prevent="addCurve">
                  <div class="select-wrapper" v-for="c in curve" v-bind:key="c">
                     <select v-model="c.value" style="margin-top: 2%;" required>
                        <option value="gaussian"> Gaussian </option>
                        <option value="sigmoid"> Sigmoid </option>
                        <option value="polynomial"> Polynomial </option>
                        <option value="noise"> Random </option>
                     </select>
                  </div>
                  <div class="options" v-for="(c, index) in curve">
                     <h5 style="text-transform: uppercase;">{{c.value}}</h5>
                     <div class="col s12" v-if="c.value == 'gaussian'">
                        <div class="col s6">
                           <label> Mean {{index}} </label>
                           <input v-model="c.params.mu" type="number" placeholder="Mean" step="0.01" required />
                        </div>
                        <div class="col s6">
                           <label> Variance {{index}} </label>
                           <input v-model="c.params.sigma" type="number" placeholder="Variance" step="0.01" required />
                        </div>
                     </div>
                     <div class="col s12" v-if="c.value == 'sigmoid'">
                        <div class="col s6">
                           <label> Lambda {{index}} </label>
                           <input v-model="c.params.lambda" type="number" placeholder="Lambda" step="0.01" required />
                         </div>
                        <div class="col s6">
                           <label> Const {{index}} </label>
                           <input v-model="c.params.const" type="number" placeholder="Const" step="0.01" required />
                        </div>
                     </div>
                     <div class="col s12" v-if="c.value == 'noise'">
                        <div class="col s6">
                           <label> Min </label>
                           <input v-model="c.params.min" type="number" placeholder="Minimum" step="0.01" required />
                        </div>
                        <div class="col s6">
                           <label> Max </label>
                           <input v-model="c.params.max" type="number" placeholder="Maximum" step="0.01" required />
                        </div>
                     </div>
                     <div class="col s12" v-if="c.value == 'polynomial'">
                        <div class="col s6">
                           <label> Polynomial expression </label>
                           <input v-model="c.params.poly" type="text" placeholder="Polynomial expression" required />
                        </div>
                     </div>
                     <div class="col s12">
                        <div class="col s6" v-if="c.value != 'polynomial' && c.value != 'noise'">
                           <label> Coefficient {{index}} </label>
                           <input v-model="c.params.coef" type="number" placeholder="Self Coefficient" step="0.01" required />
                        </div>
                        <div class="col s6" v-if="c.value != 'gaussian'">
                           <label> Delta {{index}} </label>
                           <input v-model="c.params.delta" type="number" placeholder="Self Delta" step="0.01" required />
                        </div>
                     </div>
                  </div>
                  <div class="col s12">
                     <div class="col s6">
                        <input placeholder="Coefficient | Example : -2.2" type="number" name="coefficient" v-model="coefficient" step="0.01" required />
                     </div>
                     <div class="col s6">
                        <input placeholder="Lag" type="number" name="lag" v-model="lag" step="0.01" required />                        
                     </div>
                  </div>
                  <input class="btn waves-effect" type="submit" value="SAVE CURVE" />
               </form>
               <form class="random" v-on:submit.prevent="randomize">
                  <input class="btn orange accent-1 waves-effect" type="submit" value="RANDOMIZE" />
               </form>
               <button class="btn-floating waves-effect waves-light" v-on:click="addType">
               <i class="material-icons">add</i>
               </button><br>
            </div>
            <div class="col s6 curve-container" >
               <h2> What's in the box </h2>
               <transition-group name="slide-fade" tag="p">
                  <div class="curve-details" v-for="(i, index) in curve" v-bind:key="i">
                     <i class="material-icons">show_chart</i>
                     <h5> {{"Curve "+index}} </h5>
                     <small> {{"Type : "+i.value}} </small>
                     <div>
                        <p> {{"Self coefficient : "+i.params.coef}} </p>
                     </div>
                     <div>
                        <p v-if="i.value != 'gaussian'"> {{"Delta : "+i.params.delta}} </p>
                     </div>
                     <div v-if="i.value == 'gaussian'">
                        <p> {{"Variance : "+i.params.sigma}} | {{" Mean : "+i.params.mu}} </p>
                     </div>
                     <div v-if="i.value == 'sigmoid'">
                        <p> {{"Lambda : "+i.params.lambda}} </p>
                     </div>
                     <div v-if="i.value == 'polynomial'">
                        <p> {{"Polynomial expression : "+i.params.poly}} </p>
                     </div>
                     <div v-if="i.value == 'noise'">
                        <p> {{"Minimum : "+i.params.min}} | {{"Maximum : "+i.params.max}}  </p>
                     </div>
                  </div>
               </transition-group>
               <span> {{"Lag : "+lag}} </span><br>
               <span> {{"Coefficient : "+coefficient}} </span>
            </div>
         </div>
      </div>
   </div>
</div>
</template>


<script>
import Loader from '../loaders/Loader'

export default {
  name: 'curveform',
  components:{
      'loader': Loader
  },
  data () {
    return {
        curve: [],
        curves: [],
        lag: '',
        coefficient: '',
        isloaded: ''
    }
  },
  mounted(){
    this.$http.get(process.env.API_URL+'/input/curves/'+this.$route.params.id)
        .then(response => {
           if(response.data.length > 0){
               this.$router.push('/');
           }
           console.log(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
  },
  created(){
    this.isloaded = false;
    this.curve.push({value:'gaussian', params:{'mu':'', 'sigma':'', 'delta':'','coef':'','min':'','max':'','lambda':''}});
  },

  methods: {
    addType(){
            this.curve.push({value:'gaussian', params:{'mu':'', 'sigma':'', 'lambda':'','delta':'','coef':'','poly':'','min':'','max':''}});
        },
    addCurve(){
        this.isloaded = true;
        this.$http.post(process.env.API_URL+'/curve',{'curve':this.curve,'input_id':this.$route.params.id,'lag': this.lag, 'coefficient': this.coefficient})
            .then(response => {
                this.curves.push(response.data);
                this.$router.go('/input/'+this.$route.params.id);
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    randomize(){
        this.isloaded = true;
        this.$http.post(process.env.API_URL+'/curve/random',{'input_id':this.$route.params.id})
        .then(response => {
            this.isloaded = false;
            this.$router.go('/');
        })
        .catch(function (error) {
            console.log(error);
        });
    }
  }
}
</script>

<style scoped>
    .slide-fade-enter-active {
    transition: all .3s ease;
    }
    .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for <2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
    }
    .options{
        margin-top: 10%;
        text-align: left;
    }

    h2{
        text-align: center;
        margin-bottom: 10%;
    }

    h5{
        font-weight: bold;
        color: #687D94;
        text-align: center;
    }

    .curve-container span{
        font-size: 2em;
        font-weight: bold;
        color: #687D94;
    }

    .curve-details{
        padding: 2%;
        margin-bottom: 5%;
    }

    .curve-details i{
        font-size: 3em;
        font-weight: bold;
        padding:5%;
        border-radius: 100%;
        color: white;
        background: #43ccc0;
    }

    .select-wrapper select{
        width: 80%;
    }

    .random, input[type="submit"]{
        margin-top: 2%;
    }
</style>
