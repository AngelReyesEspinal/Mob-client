<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import Swal from "sweetalert2";
import BaseRepository from "./baseRepository";
@Component({})
export default class BaseVue extends Vue {
  protected swal: any = Swal;
  protected isValid: boolean = true;

  protected operationNotAllowed() {
    this.swal.fire({
      title: "¡Atención!",
      text: "¡Debe completar todos los campos!",
      icon: "warning",
      showClass: {
        popup: "animate__animated animate__backInLeft"
      },
      hideClass: {
        popup: "animate__animated animate__backOutLeft"
      }
    });
  }

  protected operationSuccess() {
    this.swal.fire({
      title: "¡Muy bien!",
      text: "¡La operación se realizó de manera exitosa!",
      icon: "success",
      showClass: {
        popup: "animate__animated animate__backInLeft"
      },
      hideClass: {
        popup: "animate__animated animate__backOutLeft"
      }
    });
  }

  protected async operationDelete(
    id: number,
    repository: BaseRepository,
    onDeleted: any
  ) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      showClass: {
        popup: "animate__animated animate__backInLeft"
      },
      hideClass: {
        popup: "animate__animated animate__backOutLeft"
      }
    }).then(result => {
      if (result.value) {
        repository.delete(id).then((response: any) => {
          if (response) {
            Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "success",
              hideClass: {
                popup: "animate__animated animate__backOutLeft"
              }
            });
            onDeleted();
          }
        });
      }
    });
  }
}
</script>

