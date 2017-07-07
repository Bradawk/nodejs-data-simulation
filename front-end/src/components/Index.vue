<template>
  <div>
    <div class="jumbo">
      <h2> DAAB Project </h2>
      <small> Unleash the data .. </small>

      
    </div>
    <div class="row">
      <div class="col s12 jumbo">
        <div class="col s12">
          <table class="highlight">
            <thead>
              <tr>
                <th> ID </th>
                <th></th>
                <th>
                    <form v-on:submit="addInput">     
                      <input class="btn" type="submit" value="ADD"/>
                    </form>
                </th>
              </tr>
            </thead>
            <tbody>
                <transition-group name="slide-fade" tag="p">
                <tr v-for="i in inputs" v-bind:key="i" class="list-item">
                  <td><router-link :to="{ name: 'Input', params: { id: i._id }}">{{i._id}}</router-link></td>
                  <td>
                    <form v-on:submit="deleteInput(i._id)">
                      <input class="btn" type="submit" value="X" />
                    </form>
                  </td>
                </tr>
                </transition-group>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'index',
  data () {
    return {
      inputs: [],
      errors: []
    }
  },
  mounted() {
      this.$http.get(process.env.API_URL)
      .then(response => {
        this.inputs = response.data;
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
          })
      },
      deleteInput(id){
        this.$http.delete(process.env.API_URL+'input/delete/'+id)
          .then(response => {
            var index = this.inputs.findIndex(input => input._id === id);
            this.inputs.splice(index, 1);
          })
      }
    }
 
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
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
