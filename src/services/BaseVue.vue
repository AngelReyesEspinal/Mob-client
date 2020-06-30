<script lang='ts'>
import { Component, Vue } from "vue-property-decorator"
import Swal from 'sweetalert2'
@Component({})
export default class BaseVue extends Vue {
    protected swal: any = Swal;
    protected isValid: boolean = true;

    protected operationSuccess() {
        this.swal.fire(
            '¡Muy bien!',
            '¡La operación se realizó de manera exitosa!',
            'success'
        )
    }
}
</script>

