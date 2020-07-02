<template>
  <div>
    <transition 
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__backInLeft"
      leave-active-class="animate__animated animate__backOutLeft"
    >
      <component 
        v-bind:is="component" 
        @changeComponent="manage_component"
        :id="id"></component>
    </transition>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import Add from '../components/evaluation/add.vue'
import Base from '../components/evaluation/base.vue'
import Edit from '../components/evaluation/edit.vue'
@Component({
  components: {
    'add-component' : Add,
    'base-component': Base,
    'edit-component': Edit,
  }
})
export default class Subject extends Vue {
  id: number = 0
  component: string = 'base-component'

  manage_component(data: any) {
    this.component = data.component
    this.id = data.id
  }
}
</script>

<style lang="scss" scoped>
</style>

