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
              <tr v-for="i in inputs">
                <td> {{i._id}} </td>
                <td><a class="btn" v-bind:href="i._id"><i class="material-icons left">remove_red_eye</i>See</a></td>
                <td>
                  <form v-on:submit="deleteInput(i._id)">
                    <input class="btn" type="submit" value="X" />
                  </form>
                </td>
              </tr>
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

</style>
