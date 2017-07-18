<template>
    <div>
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
</template>


<script>
export default {
  name: 'curveform',
  data () {
    return {

    }
  },
  mounted(){

  },
  methods: {

  }
}
</script>

<style scoped>
    .options{
        margin-top: 10%;
        text-align: left;
    }

</style>