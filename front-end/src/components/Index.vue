<template>
  <div>
        <div class="row header-resume">
          <div class="col s2">
            <small> Total of inputs </small><br>
            <span> {{count}} </span><br>
          </div>
          <div class="col s2">
            <small> Total of curves </small><br>
            <span> {{curvesCount}} </span><br>
          </div>
        </div>
        <loader v-if="isloaded == true"></loader>
        <div v-else class="row main-content">
              <div class="col s12">
                    <form v-on:submit.prevent="addInput">     
                      <button class="btn left waves-effect"><i class="material-icons">add</i></button>
                      <div class="Nfloat"></div>
                    </form>
                    <div v-if="count">
                      <transition-group name="slide-fade" tag="p">
                        <div v-for="i in inputs" v-bind:key="i" class="list-item input-div jumbo col s3">
                        <div style="background" class="jumbo-head">
                            <span class="right">
                                <form v-on:submit.prevent="deleteInput(i._id)"> 
                                    <input type="submit" value="X" />
                                </form>
                            </span>
                            <div class="Nfloat"></div>
                        </div>
                        <inputblock :id="i._id"></inputblock>
                        </div>
                      </transition-group>
                    </div>      
              </div>
              <div class="col s3">
                <form v-on:submit="randomizer">
                  <input v-model="iNum" type="number" step="1" min="1" placeholder="Number of inputs" required />
                  <input class="btn" type="submit" value="Create" />
                </form>
              </div>
        </div>
  </div>
</template>
<script>
import InputBlock from './InputBlock'
import Loader from './loaders/Loader'

export default {
  name: 'index',
  components:{
    'inputblock': InputBlock,
    'loader': Loader
  },
  data () {
    return {
      inputs: [],
      errors: [],
      count: '',
      curvesCount: '',
      isloaded: '',
      iNum: ''
    }
  },
  beforeCreate(){
    this.isloaded = true;
  },
  created(){
    this.isloaded = false;
    this.count = this.inputs.length;
    this.$http.all([
      this.$http.get(process.env.API_URL),
      this.$http.get(process.env.API_URL+"/curve")
    ])
      .then(this.$http.spread((inputResponse, counterResponse) => {
        this.inputs = inputResponse.data;
        this.count = inputResponse.data.length;
        this.curvesCount = counterResponse.data.length; 
    }));
  },

  methods: {
      addInput(){
          this.$http.post(process.env.API_URL)
          .then(response => {
            this.inputs.push(response.data);
            this.count = this.inputs.length;
            Materialize.toast('Input added successfully !', 2000);
          })
      },
      // See axios.all
      deleteInput(id){
        this.$http.delete(process.env.API_URL+'/input/delete/'+id)
          .then(response => {
            var index = this.inputs.findIndex(input => input._id === id);
            this.inputs.splice(index, 1);
            this.count = this.inputs.length;  
            Materialize.toast(response.data.message,'2000');
          })
      },
      randomizer(e){
        if(this.iNum > 1000){
          e.preventDefault();
          Materialize.toast('Number of random inputs to generate is to high',2000);
        }else{
            this.$http.post(process.env.API_URL+'/input/random',{'iNum':this.iNum})
          .then(response => {
              this.$router.go('/');
            })
          .catch(function(error){
            console.log(error);
          });
        }
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

</style>
