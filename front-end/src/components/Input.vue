<template>
    <div>
        <div style="position:relative" class="jumbo">
    <h2> Input </h2>
    <a style="position:absolute; top:45%; left: 3%;" href="/"> < </a>
</div>
<div class="row">
        <div class="col s12 jumbo">
            <div class="col s12">
                <table class="striped bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th> Label </th>
                            <th> Curve Type </th>
                            <th> Delta </th>
                            <th></th>
                            <th><a class="btn-floating btn-large waves-effect waves-light" href="#function_form" ><i class="material-icons">add</i></a></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="c in curves">
                            <td><a href="/">{{c._id}}</a></td>
                            <td>{{c.label}}</td>
                            <td>{{c.curve_type}}</td>
                            <td>{{c.delta}}</td>
                        </tr> 
                    </tbody>
                </table> 

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
        curves: []
    }
  },
  mounted() {
        this.$http.get(process.env.API_URL+"input/curves/"+this.$route.params.id)
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