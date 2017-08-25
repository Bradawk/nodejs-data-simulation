<template>
  <div>
        <div v-if="isloaded == true" class="black-screen">
          <loader></loader>
        </div>
        <div class="row header-resume">
          <div class="col s2">
            <small> Total of inputs </small><br>
            <span> {{count}} </span><br>
          </div>
        </div>
        <div v-if="error">
          <img src="/static/img/error.png" />
        </div>
        <div v-else>
          <div class="row main-content">
                <div class="col s12">
                      <form v-on:submit.prevent="addInput">     
                        <button class="btn left waves-effect"><i class="material-icons">add</i></button>
                      </form>
                      <form class="col s6" v-on:submit.prevent="randomizer">
                        <input class="left col s3" v-model="iNum" type="number" step="1" min="1" placeholder="Number of inputs" required />
                        <input class="btn left" type="submit" value="Create" />
                      </form>
                      <div class="Nfloat"></div>
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
                          <inputblock :id="i._id" v-on:curveCount="loaded"></inputblock>
                          </div>
                        </transition-group>
                      </div>    
                </div>
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
      error: '',
      count: '',
      isloaded: '',
      iNum: ''
    }
  },
  mounted(){
    this.isloaded = true;
    this.$http.all([
      this.$http.get(process.env.API_URL),
    ])
      .then(this.$http.spread((inputResponse) => {
        this.inputs = inputResponse.data;
        this.count = this.inputs.length;
    }))
    .catch((error)=> {
        this.error = error;
    });
  },

  methods: {
      loaded(){
        this.isloaded = false;
      },
      addInput(){
          this.$http.post(process.env.API_URL)
          .then(response => {
            this.inputs.push(response.data);
            this.count = this.inputs.length;
            Materialize.toast('Input added successfully !', 2000);
          })
          .catch((error) =>{
            Materialize.toast(error, '2000');
          })
      },
      deleteInput(id){
        this.$http.delete(process.env.API_URL+'/input/delete/'+id)
          .then(response => {
            var index = this.inputs.findIndex(input => input._id === id);
            this.inputs.splice(index, 1);
            this.count = this.inputs.length;
            this.$http.get(process.env.API_URL+"/curve")
            .then(response => {
                this.curvesCount = response.data.length;
            })
            .catch((error) =>{
              Materialize.toast(error, '2000');
            })
            Materialize.toast('Input, Output and associated curves deleted','2000');
          })
      },
      randomizer(e){
        if(this.iNum > 1000){
          e.preventDefault();
          Materialize.toast('Number of random inputs to generate is to high',2000);
        }else{
          this.isloaded = true;
          this.$http.post(process.env.API_URL+'/input/random',{'iNum':this.iNum})
          .then(response => {
              this.isloaded = false;
              console.log(response);
              this.$router.go('/');
            })
          .catch(function(error){
            Materialize.toast(error, '2000');
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
