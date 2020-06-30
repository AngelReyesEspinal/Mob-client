<template>
  <div>
    <sui-image
      :src="img.data"
      size="medium"
      alt="xdd"
      circular
    />
    <div class="flex end">
      <sui-button size="massive" basic color="teal" inverted @click="() => { this.$emit('changeComponent', 'add-component') }"> AGREGAR </sui-button>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator"
import BaseRepository from "../../services/baseRepository"
import Subject from '../../models/subject.model'

@Component({})
export default class Base extends Vue {
  areas: Array<Subject> = []
  repository: BaseRepository = new BaseRepository("Subject")
  img: string = '';
  async mounted() {
    this.img = await this.repository.getByUserId(1);
  }
}
</script>

<style lang="scss" scoped>
</style>

