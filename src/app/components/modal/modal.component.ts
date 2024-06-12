import { Component, ElementRef, ViewChild } from '@angular/core';
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';
import type { InstanceOptions } from 'flowbite';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @ViewChild('modal') modalElement!:ElementRef
  title:string = '';
  content:string = '';

  modalOptions: ModalOptions = {
      placement: 'bottom-right',
      backdrop: 'dynamic',
      backdropClasses:
          'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
      closable: true,
      onHide: () => {
          console.log('modal is hidden');
      },
      onShow: () => {
          console.log('modal is shown');
      },
      onToggle: () => {
          console.log('modal has been toggled');
      },
  };

  // instance options object
  instanceOptions: InstanceOptions = {
    id: 'modal',
    override: true
  };

  openModal(){
    this.modalElement.nativeElement.show();
  }
  closeModal(){
    this.modalElement.nativeElement.hide();
  }
}
