<template>
  <div>
      <div class="col s6">
            <h2> Update your curve </h2>
            <form v-on:submit.prevent="updateCurve">
              <input type="number" placeholder="Lag" disabled />
              <input type="number" placeholder="Coefficient" v-model="coefficient"/>
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
        curve: [],
        coefficient:'',
        lag: '',
    }
  },
  mounted(){
    this.$http.get(process.env.API_URL+'/curve/'+this.$route.params.id)
        .then(response => {
           this.curve = response.data.curve
           this.id = response.data._id;
           this.lag = response.data.lag;
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
