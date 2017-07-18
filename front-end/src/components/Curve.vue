<!-- ## INPUT BLOCK VUE ## -->
<template>
<div class="col s6" v-for="curve in curves">
    <span> ID : {{curve._id}} </span><br>
    <span v-if="curve.delta"> Delta : {{curve.delta}} </span><br>
    <div class="scroll curve_table_container">
        <table class="data_table bordered striped">
            <thead>
                <tr>
                    <th>X</th>
                    <th> Y </th>
                </tr>
            </thead>
                <tbody>

            </tbody>
        </table>
    </div>
</div>
</template>

<!-- ## INPUT BLOCK VUE ## -->

<script>
export default {
  name: 'curve',
  props: ['curves'],
  data () {
    return {
    }
  },
  mounted(){
      this.$http.get(process.env.API_URL+'/input/curves/'+this.$route.params.id)
        .then(response => {
            this.curves = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
  },
  methods: {

  }
}
</script>