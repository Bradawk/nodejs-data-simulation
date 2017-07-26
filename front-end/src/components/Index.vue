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
        <div v-if="isloaded == true">
            <div class="preloader loading">
                <span class="slice"></span>
                <span class="slice"></span>
                <span class="slice"></span>
                <span class="slice"></span>
                <span class="slice"></span>
                <span class="slice"></span>
            </div>
        </div>
        <div class="row main-content">
              <div class="col s12">
                    <form v-on:submit.prevent="addInput">     
                      <button class="btn left waves-effect"><i class="material-icons">add</i></button>
                      <div class="Nfloat"></div>
                    </form>
                    <div>
                    <transition-group name="slide-fade" tag="p">
                      <div v-for="i in inputs" v-bind:key="i" class="list-item input-div jumbo col s3">
                       <div class="jumbo-head">
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
                  <input v-model="iNum" type="number" step="1" min="1" placeholder="Number of inputs" />
                  <input class="btn" type="submit" value="Create" />
                </form>
              </div>
        </div>
  </div>
</template>
<script>
import InputBlock from './InputBlock'

export default {
  name: 'index',
  components:{
    'inputblock': InputBlock
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
  mounted() {
      this.isloaded = true;
      this.$http.get(process.env.API_URL)
      .then(response => {
        this.isloaded = false;
        this.inputs = response.data;
        this.count = this.inputs.length;
      })
      .catch(function (error) {
        console.log(error);
      });
      this.$http.get(process.env.API_URL+"/curve")
        .then(response => {
            this.curvesCount = response.data.length;
        })
        .catch(function (error) {
            console.log(error);
        });
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
            .catch(function (error) {
                console.log(error);
            });
            Materialize.toast(response.data.message,'2000');
          })
      },
      randomizer(){
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
