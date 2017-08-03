<template>
<div>
    <div class="row header-resume">
          <div class="col">
            <small> Input </small><br>
            <span>{{$route.params.id}} </span><br>
          </div>
    </div>
    <div class="container">     
        <curveform></curveform>
    </div>
</div>
</template>

<script>
import CurveForm from './forms/CurveForm'
export default {
  name: 'input',
  components: {
    'curveform': CurveForm,
  }
}

</script>

<style scoped>

</style>
