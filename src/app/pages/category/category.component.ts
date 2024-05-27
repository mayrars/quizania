import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { StepperComponent } from '../../components/stepper/stepper.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [StepperComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{
  private _apiService = inject(ApiService);
  private _route = inject(ActivatedRoute)
  category!: number;
  questions: any[] = [];
  numberOfQuestions: number = 0;
  constructor(private rutaActiva: ActivatedRoute) { }
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.category = params['id'];
      this._apiService.getQuestions(this.category).subscribe(data=>{
        this.questions = data.results
        this.numberOfQuestions = data.results.length;
      })
    })
  }
}
