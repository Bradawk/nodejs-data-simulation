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
                <div>
                   <curveform></curveform>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</template>

<script>
import CurveForm from './forms/CurveForm'
export default {
  name: 'input',
  components: {
    'curveform': CurveForm,
  },
  data () {
    return {

    }
  },
  mounted() {
    
 },
}

</script>

<style scoped>

</style>