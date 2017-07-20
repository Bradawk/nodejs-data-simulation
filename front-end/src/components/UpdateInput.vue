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
                   <curve-update-form></curve-update-form>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</template>

<script>
import CurveUpdateForm from './forms/CurveUpdateForm'
export default {
  name: 'updateinput',
  components: {
      'curve-update-form': CurveUpdateForm
  },
  data () {
    return {

    }
  },
}
</script>

<style scoped>

</style>