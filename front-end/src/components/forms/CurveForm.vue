<template>
    <div>
        <div class="col s6">
            <h2> Curve Maker </h2>
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
                            <input v-model="c.params.mu" type="number" placeholder="Mean" required />
                        </div>
                        <div class="col s6">
                            <label> Variance {{index}} </label>
                            <input v-model="c.params.sigma" type="number" placeholder="Variance" required />
                        </div>
                    </div>
                    <div class="col s12" v-if="c.value == 'sigmoid'">
                        <div class="col s6">
                            <label> Param delta {{index}} </label>
                            <input v-model="c.params.delta" type="number" placeholder="Param delta" required />
                        </div>
                    </div>
                </div>
                <input placeholder="Delta" type="number" name="delta" v-model="delta" required />
                <input style="margin-top: 2%;" class="btn" type="submit" />
            </form>
            <button class="btn-floating waves-effect waves-light" v-on:click="addType">
                    <i class="material-icons">add</i>
            </button><br>
        </div>

        <div class="col s6 curve-container" >
            <h2> What's in the box </h2>
            <div class="curve-details" v-for="(i, index) in curve">
                <i class="material-icons">show_chart</i>
                <h5> {{"Curve "+index}} </h5>
                <small> {{"Type : "+i.value}} </small>
                <div v-if="i.value == 'gaussian'">
                    <p> {{"Variance : "+i.params.sigma}} | {{" Mean : "+i.params.mu}} </p>
                </div>
                <div v-if="i.value == 'sigmoid'">
                    <p> {{"Delta : "+i.params.delta}} </p>
                </div>
            </div>
            <span> {{"Delta : "+delta}} </span>
        </div>
    </div>
</template>


<script>
export default {
  name: 'curveform',
  data () {
    return {
        curve: [],
        curves: [],
        delta: '',
    }
  },
  mounted(){

  },
  methods: {
    addType(){
            this.curve.push({value:'gaussian', params:{"sigma":'',"mu":"","delta":''}});
        },
    addCurve(){
    this.$http.post(process.env.API_URL+'/curve',{'curve':this.curve,'input_id':this.$route.params.id,'delta': this.delta})
        .then(response => {
            this.curves.push(response.data);
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    },
  }
}
</script>

<style scoped>
    .options{
        margin-top: 10%;
        text-align: left;
    }

    h2{
        text-align: center;
        margin-bottom: 10%;
    }

    .curve-container span{
        font-size: 2em;
        font-weight: bold;
    }

    .curve-details{
        padding: 2%;
        margin-bottom: 5%;
    }

    .curve-details i{
        font-size: 3em;
        font-weight: bold;
    }

</style>