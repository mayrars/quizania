import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css'
})
export class StepperComponent implements OnInit {
  @Input() questions: any
  currentStep = 0;
  ngOnInit(): void {
    console.log(this.questions)
  }
}
