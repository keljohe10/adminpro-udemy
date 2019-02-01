import { ModalUploadService } from './modal-upload.service';
import { SubirArchivoService } from '../../services/service.index';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

archivoSubir: File;
imgTemp: string;
  constructor( public _subirArchivoService: SubirArchivoService,
               public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
  }
  seleccionarArchivo( archivo: File ) {
    if (!archivo) {
      this.archivoSubir = null;
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      this.archivoSubir = null;
      swal('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      return;
    }
    this.archivoSubir = archivo;

    let reader = new FileReader();
    let urlTemporal = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imgTemp = reader.result.toString();

  }
  cerrarModal() {
    this.imgTemp = null;
    this.archivoSubir = null;
    this._modalUploadService.ocultarModal();
  }
   subirImagen() {
    this._subirArchivoService.subirArchivo( this.archivoSubir, this._modalUploadService.tipo, this._modalUploadService.id)
          .then( resp => {
             this._modalUploadService.notificacion.emit( resp );
             this.cerrarModal();
          })
          .catch( err => {
            console.log('error en la carga');
          });
  }

}
