<template>
  <div>
    <form enctype="multipart/form-data" class="flex form">
      <div>
        <sui-input
          :error="!isValid"
          class="input-custom-width big-big"
          size="massive"
          placeholder="Nombre del área..."
          transparent
          v-model="subjectName"
        />
      </div>
      <div>
        <label for="file" id="selector">
          {{ file ? file.name : 'Selecciona una imagen'}}
        </label>
        <input type="file" id="file" @change="processFile($event)" hidden/>
      </div>
      <div class="flex end">
        <sui-button size="massive" basic color="grey" inverted @click=" () => { this.$emit('changeComponent', { component: 'base-component', id: 0 }) } "> REGRESAR </sui-button>
        <sui-button size="massive" basic color="teal" inverted type="submit" @click="send"> AGREGAR </sui-button>
      </div>
    </form>
  </div>
</template>

<script lang='ts'>
let data = new FormData;

import { Component } from "vue-property-decorator"
import BaseRepository from '../../services/baseRepository'
import BaseVue from "../../services/BaseVue.vue"

@Component({})
export default class Add extends BaseVue {
  repository: BaseRepository = new BaseRepository("Subject")
  subjectName: string = ''
  file: any = null

  processFile(event: any) {
    this.file = event.target.files[0]
  }

  async send() {
    let myEvent: any = event as any
    myEvent.preventDefault()
    let subject = this.getFormData()
    this.$store.commit("setLoading", true)
    await this.repository.addSubject(subject)
    this.$store.commit("setLoading", false)
    this.operationSuccess();
    this.$emit('changeComponent', {component: 'base-component', id: 0});
    data  = new FormData()
  }

  getFormData(): FormData {
    data.append('userId', String(this.$store.state.user.id))
    data.append('name', this.subjectName)
    data.append('file', this.file)
    return data
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

