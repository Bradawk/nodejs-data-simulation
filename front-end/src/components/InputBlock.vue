

<script>
export default {
  name: 'inputBlock',
  data () {
    return {
      curve: []
    }
  },
  methods: {
      getCurves(id){
        this.$http.get(process.env.API_URL+'input/curves/'+id)
        .then(response => {
            this.curve = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
      }
  }
}
</script>