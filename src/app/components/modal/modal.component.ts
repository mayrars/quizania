import { Component, ElementRef, ViewChild } from '@angular/core';
import { Modal } from 'flowbite';
import type { ModalOptions } from 'flowbite'

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @ViewChild('defaultModal') $modal!:ElementRef<Modal>
  title:string = '';
  content:string = '';
  modalOptions: ModalOptions = {
    placement: 'center'
  }
  ngAfterViewInit(): void { 
    if (typeof document !== 'undefined') { 
      const modalEl = document.getElementById('defaultModal') 
      this.$modal.nativeElement = new Modal(modalEl, this.modalOptions);
    } 
  }

  open(title:string, content:string){
    this.title = title;
    this.content = content;
    this.$modal.nativeElement.show()
  }
  close(){
    this.$modal.nativeElement.hide()
  }
}
