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
        @changeParentComponent="manage_module"
        :id="id"></component>
    </transition>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import Add from '../components/subject/add.vue'
import Base from '../components/subject/base.vue'
import Edit from '../components/subject/edit.vue'
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
    this.id = (data.id > 0) ? data.id : this.id
    
  }

  manage_module(data: any) {
    this.$emit('changeComponent', data)
  }
}
</script>

<style lang="scss" scoped>
</style>

