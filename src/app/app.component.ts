import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite, Modal } from 'flowbite';
import { HomeComponent } from "./pages/home/home.component";
import { ModalComponent } from './components/modal/modal.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HomeComponent,ModalComponent]
})
export class AppComponent implements OnInit{
  @ViewChild(ModalComponent) modal?: ModalComponent;
  title = 'quizania';
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite();
    }
  }
}
