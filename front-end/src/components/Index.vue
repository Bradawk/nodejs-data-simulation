<template>
  <div>
        <div class="row header-resume">
          <div class="col s2">
            <small> Total of inputs </small><br>
            <span> {{count}} </span><br>
            <small> Last added : yesterday </small>
          </div>
          <div class="col s2">
            <small> Total of curves </small><br>
            <span> </span><br>
            <small> Last added : yesterday </small>
          </div>
          <div class="col s2">
            <small> Total of curves </small><br>
            <span> </span><br>
            <small> Last added : yesterday </small>
          </div>
          <div class="col s2">
            <small> Total of curves </small><br>
            <span> </span><br>
            <small> Last added : yesterday </small>
          </div>
          <div class="col s2">
            <small> Total of curves </small><br>
            <span> </span><br>
            <small> Last added : yesterday </small>
          </div>
          <div class="col s2">
            <small> Total of curves </small><br>
            <span> </span><br>
            <small> Last added : yesterday </small>
          </div>

        </div>
        <div class="row main-content">
              <div class="col s12">
                    <form v-on:submit="addInput">     
                      <input class="btn left" type="submit" value="ADD INPUT"/>
                      <div class="Nfloat"></div>
                    </form>
                    <div>
                    <transition-group name="slide-fade" tag="p">
                      <div v-for="i in inputs" v-bind:key="i" class="list-item input-div jumbo col s3">
                          <div class="jumbo-head">
                            <span class="right">
                              <form v-on:submit="deleteInput(i._id)"> 
                                <input type="submit" value="X" />
                              </form>
                            </span>
                            <div class="Nfloat"></div>
                          </div>
                          <router-link :to="{ name: 'Input', params: { id: i._id }}">Input</router-link><br>
                          <div class="input-details">
                            <span><i class="material-icons">show_chart</i> Number of curves : </span><br>
                            <span><i class="material-icons">multiline_chart</i> Curve type : </span>
                          </div>
                      </div>
                    </transition-group>
                    </div>
              </div>
        </div>
  </div>
</template>
<script>
import InputBlock from '@/components/InputBlock'
export default {
  name: 'index',
  data () {
    return {
      inputs: [],
      errors: [],
      count: '',
      curveCount: '',
    }
  },
  mounted() {
      this.$http.get(process.env.API_URL)
      .then(response => {
        this.inputs = response.data;
        this.count = this.inputs.length;
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
          })
      },
      deleteInput(id){
        this.$http.delete(process.env.API_URL+'/input/delete/'+id)
          .then(response => {
            var index = this.inputs.findIndex(input => input._id === id);
            this.inputs.splice(index, 1);
            this.count = this.inputs.length;
          })
      }
    }
 
}
</script>

<style scoped>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
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
