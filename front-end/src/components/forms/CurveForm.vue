<template>
    <div>
        <div class="col s6">
            <h2> Curve Maker </h2>
            <label> Basic Function Type</label>
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
                                <input v-model="c.params.mu" type="number" placeholder="Mean" step="0.01" required />
                            </div>
                            <div class="col s6">
                                <label> Variance {{index}} </label>
                                <input v-model="c.params.sigma" type="number" placeholder="Variance" step="0.01" required />
                            </div>
                        </div>
                        <div class="col s12" v-if="c.value == 'sigmoid'">
                            <div class="col s6">
                                <label> Param delta {{index}} </label>
                                <input v-model="c.params.delta" type="number" placeholder="Param delta" step="0.01" required />
                            </div>
                        </div>
                    </div>
                    <div class="col s12">
                        <div class="col s6">
                            <input placeholder="Coefficient | Example : -2.2" type="number" name="coefficient" v-model="coefficient" step="0.01" required />
                        </div>
                        <div class="col s6">
                            <input placeholder="Delta" type="number" name="delta" v-model="delta" step="0.01" required />                        
                        </div>
                    </div>
                <input style="margin-top: 2%;" class="btn waves-effect" type="submit" value="SAVE CURVE" />
            </form>
            <button class="btn-floating waves-effect waves-light" v-on:click="addType">
                    <i class="material-icons">add</i>
            </button><br>
        </div>

        <div class="col s6 curve-container" >
            <h2> What's in the box </h2>
            <transition-group name="slide-fade" tag="p">
                <div class="curve-details" v-for="(i, index) in curve" v-bind:key="i">
                    <i class="material-icons">show_chart</i>
                    <h5> {{"Curve "+index}} </h5>
                    <small> {{"Type : "+i.value}} </small>
                    <div v-if="i.value == 'gaussian'">
                        <p> {{"Variance : "+i.params.sigma}} | {{" Mean : "+i.params.mu}} </p>
                    </div>
                    <div v-if="i.value == 'sigmoid'">
                        <p> {{"Lambda : "+i.params.lambda}} </p>
                    </div>
                </div>
            </transition-group>
            <span> {{"Delta : "+delta}} </span><br>
            <span> {{"Coefficient : "+coefficient}} </span>
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
        coefficient: '',
    }
  },
  mounted(){
    this.$http.get(process.env.API_URL+'/input/curves/'+this.$route.params.id)
        .then(response => {
           if(response.data.length > 0){
               this.$router.push('/');
           }
        })
        .catch(function (error) {
            console.log(error);
        });
  },
  methods: {
    addType(){
            this.curve.push({value:'gaussian', params:{"sigma":'',"mu":"","lambda":''}});
        },
    addCurve: function(e){
    e.preventDefault();
    this.$http.post(process.env.API_URL+'/curve',{'curve':this.curve,'input_id':this.$route.params.id,'delta': this.delta, 'coefficient': this.coefficient})
        .then(response => {
            this.curves.push(response.data);
            this.$router.push('/');
        })
        .catch(function (error) {
            console.log(error);
        });
    },
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
    .options{
        margin-top: 10%;
        text-align: left;
    }

    h2{
        text-align: center;
        margin-bottom: 10%;
    }

    h5{
        font-weight: bold;
        color: #687D94;
    }

    .curve-container span{
        font-size: 2em;
        font-weight: bold;
        color: #687D94;
    }

    .curve-details{
        padding: 2%;
        margin-bottom: 5%;
    }

    .curve-details i{
        font-size: 3em;
        font-weight: bold;
        padding:5%;
        border-radius: 100%;
        color: white;
        background: #43ccc0;
    }

    .select-wrapper select{
        width: 80%;
    }

</style>