<template>
  <div>
      <center>
          <h1 v-if="model" >
              <span style="font-size: 50px;"> 
                {{ model.name }}
              </span>
          </h1>
      </center>
    
    <div class="flex end">
        <sui-button size="massive" basic color="teal" inverted @click="send"> CONTINUAR </sui-button>
    </div>
  </div>
</template>

<script lang='ts'>

import { Component, Prop } from "vue-property-decorator"
import BaseRepository from '../../services/baseRepository'
import BaseVue from "../../services/BaseVue.vue"
import Subject from "../../models/subject.model";
import Evaluation from "../../models/evaluation.model";

@Component({})
export default class Question extends BaseVue {
  @Prop({ default: 0}) id: number;
  repository: BaseRepository = new BaseRepository("Evaluation")
  subjectName: string = ''
  file: any = null
  model: Evaluation = null
  open: boolean = false

  async mounted() {
    this.repository.GetByIdFull(this.id).then((response: any) => {
        if (response) {
            this.model = response.data as Evaluation
            this.subjectName = this.model.name
        }
    });
  }

  async send() {
    let myEvent: any = event as any
    myEvent.preventDefault()
    this.$store.commit("setLoading", true)
    await this.repository.edit(this.model)
    this.$store.commit("setLoading", false)
    this.operationSuccess();
    this.$emit('changeComponent', { component: 'base-component', id: 0 });
  }

}
</script>

<style lang="scss" scoped>
.title {
  font-size: 40px;
}

.form {
  justify-content: space-around;
  flex-direction: column;
  min-height: 300px!important;
}

#selector {
  padding: 16px 48px;
  border: 2px solid #bdc3c7;//#6dffff;
  color: #bdc3c7;
  border-radius: 2px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: bold;
}

#selector:hover {
  border: 2px solid #6dffff!important;
  color: #6dffff;
  cursor: pointer;
  border-radius: 2px;
}

#selector.active {
  background-color: white;
}
</style>

