<template>
  <div class="hello">
    <h1> DAAB Simulation</h1>
    <ul id="example-1">
    <li v-for="input in inputs">
      {{ input._id }}
    </li>
  </ul>
  <form v-on:submit="addInput">     
    <input type="submit"/>
  </form>
  </div>
</template>
<script>

export default {
  name: 'index',
  data () {
    return {
      msg: 'hello',
      inputs: [],
      errors: [],
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
      }
    }
 
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
