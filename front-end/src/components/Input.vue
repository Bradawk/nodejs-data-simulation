<template>
<div>
    <div class="row header-resume">
          <div class="col">
            <small> Input </small><br>
            <span>{{$route.params.id}} </span><br>
          </div>
    </div>
<div class="container">
        <div class="col s12 jumbo">
            <div class="row">
                <h2> Curves </h2>
                <div v-if="curves.length == 0">
                    <p> Let's add some curves, shall we? </p>
                    <div class="col s6">
                        <label> Base Function Type</label>
                        <form id="add_curve_form" @submit="addCurve">
                            <div class="select-wrapper" v-for="c in curve" v-bind:key="c">
                                <select v-model="c.value" style="margin-top: 2%;">
                                    <option value="gaussian"> Gaussian </option>
                                    <option value="sigmoid"> Sigmoid </option>
                                    <option value="polynomial"> Polynomial </option>
                                    <option value="logarithmic"> Logarithmic </option>
                                </select>
                            </div>
                            <input type="text" name="delta" v-model="delta" />
                            <input style="margin-top: 2%;" class="btn" type="submit" />
                        </form>
                        <button class="btn-floating waves-effect waves-light" v-on:click="addType">
                                <i class="material-icons">add</i>
                        </button><br>
                    </div>
                </div>
                <div v-else v-for="c in curves">
                    {{c}}
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</template>
<script>
export default {
  name: 'input',
  data () {
    return {
        curves: [],
        curve: [],
        delta: ''
    }
  },
  mounted() {
        this.$http.get(process.env.API_URL+'/input/curves/'+this.$route.params.id)
        .then(response => {
            this.curves = response.data;
            console.log(this.curves);
        })
        .catch(function (error) {
            console.log(error);
        });
 },

    methods: {
        addType(){
            this.curve.push({value:'gaussian'});
        },
        addCurve(){
        this.$http.post(process.env.API_URL+'/curve',{'curve':this.curve,'input_id':this.$route.params.id,'delta': this.delta})
            .then(response => {
                this.curves.push(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
        
}
</script>

<style scoped>
    .container{
        width: 90%;
        max-width: 100%;
    }

    .col h2{
        text-align: center;
    }

</style>