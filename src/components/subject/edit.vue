<template>
  <div>
    <form enctype="multipart/form-data" class="flex form">
      <div>
        <template v-if="this.model">
            <sui-input
                :error="!isValid"
                class="input-custom-width big-big"
                size="massive"
                placeholder="Nombre del área..."
                transparent
                name="name"
                v-model="model.name"
            />
        </template>
      </div>
      <div>
        <label for="file" id="selector">
            <template v-if="this.model">
                {{ file ? file.name : this.model.fileName}}
            </template>
            <template v-else>
                Cargando...
            </template>
        </label>
        <input type="file" id="file" @change="processFile($event)" hidden/>
      </div>
      <div class="flex end">
        <sui-button size="massive" basic color="grey" inverted @click="goBack"> REGRESAR </sui-button>
        <sui-button size="massive" basic color="teal" inverted type="submit" @click="send"> EDITAR </sui-button>
      </div>
    </form>
  </div>
</template>

<script lang='ts'>
let data = new FormData;

import { Component, Prop } from "vue-property-decorator"
import BaseRepository from '../../services/baseRepository'
import BaseVue from "../../services/BaseVue.vue"
import Subject from "../../models/subject.model";

@Component({})
export default class Edit extends BaseVue {
  @Prop({ default: 0}) id: number;
  repository: BaseRepository = new BaseRepository("Subject")
  subjectName: string = ''
  file: any = null
  model: Subject = null
  open: boolean = false

  toggle() {
    this.open = !this.open;
  }

  async mounted() {
    this.repository.getByIdCustom(this.id).then((response: any) => {
        if (response) {
            this.model = response.data as Subject
            this.subjectName = this.model.name
        }
    });
  }

  processFile(event: any) {
    this.file = event.target.files[0]
  }

  async send() {
    if(this.model.name) {
    let myEvent: any = event as any
    myEvent.preventDefault()
    let subject = this.getFormData()
    this.$store.commit("setLoading", true)
    await this.repository.editSubject(subject)
    this.$store.commit("setLoading", false)
    this.operationSuccess();
    this.$emit('changeComponent', { component: 'base-component', id: 0 });
    data  = new FormData()
    } else {
      this.operationNotAllowed();
    }
  }

  getFormData(): FormData {
    data.append('id', String(this.model.id))
    data.append('name', this.model.name)
    data.append('file', this.file)
    return data
  }

  goBack() {
    this.$emit('changeComponent', {component: 'base-component', id: 0});
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

