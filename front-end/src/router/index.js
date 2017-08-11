import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Input from '@/components/Input'
import AddInput from '@/components/AddInput'
import UpdateInput from '@/components/UpdateInput'
import NotFound from '@/components/errors/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/input/:id',
      name: 'Input',
      component: Input
    },
    {
      path: '/input/create/:id',
      name: 'AddInput',
      component: AddInput
    },
    {
      path: '/input/update/:id',
      name: 'UpdateInput',
      component: UpdateInput
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
