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
                    <div class="col s5">
                        <label> Base Function Type</label>
                        <form id="add_curve_form" @submit="addCurve">
                            <div class="select-wrapper" v-for="c in curve" v-bind:key="c">
                                <select v-model="c.value" style="margin-top: 2%;" required>
                                    <option value="gaussian"> Gaussian </option>
                                    <option value="sigmoid"> Sigmoid </option>
                                    <option value="polynomial"> Polynomial </option>
                                    <option value="logarithmic"> Logarithmic </option>
                                </select>
                            </div>
                            <div class="options" v-for="(c, index) in curve">
                                <div class="col s12" v-if="c.value == 'gaussian'">
                                    <div class="col s6">
                                        <label> Mean {{index}} </label>
                                        <input type="text" placeholder="Mean" />
                                    </div>
                                    <div class="col s6">
                                        <label> Variance {{index}} </label>
                                        <input type="text" placeholder="Variance" />
                                    </div>
                                </div>
                                <div class="col s12" v-if="c.value == 'sigmoid'">
                                    <div class="col s6">
                                        <label> Param delta {{index}} </label>
                                        <input type="text" placeholder="Param delta" />
                                    </div>
                                </div>
                            </div>
                            <input placeholder="Delta" type="text" name="delta" v-model="delta" required />
                            <input style="margin-top: 2%;" class="btn" type="submit" />
                        </form>
                        <button class="btn-floating waves-effect waves-light" v-on:click="addType">
                                <i class="material-icons">add</i>
                        </button><br>
                    </div>
                    <div class="col s5" v-for="(i, index) in curve">
                        {{"Curve "+index+": "+i.value}}
                    </div>
                </div>
                <div v-else>
                    <div class="col s6" v-for="c in curves">
                        <span> ID : {{c._id}} </span><br>
                        <span v-if="c.delta"> Delta : {{c.delta}} </span><br>
                        <span> Types : {{c.value}} </span><br>
                        <div class="scroll curve_table_container">
                            <table class="data_table bordered striped">
                                <thead>
                                    <tr>
                                        <th>X</th>
                                        <th> Y </th>
                                    </tr>
                                </thead>
                                    <tbody>
                                    <tr v-for="i in 5">
                                        <td > {{i}} </td>
                                        <td>{{c.data_objects[i]}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                <div class="Chart__list">
                    <div class="Chart">
                        <line-example></line-example>
                    </div>
                </div>
            
            </div>
        </div>
    </div>
</div>
</div>
</template>




<script>
import LineExample from './Chart'

export default {
  name: 'input',
  components: {
    LineExample
  },
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
        },
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

    .Chart__list{
        margin-top: 5%;
        margin-bottom: 5%;
    }

    .options{
        margin-top: 10%;
        text-align: left;
    }

</style>