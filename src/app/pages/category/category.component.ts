import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute,Params } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
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
      console.log(params)
      this.category = params['id'];
      this._apiService.getQuestions(this.category).subscribe(data=>{
        this.numberOfQuestions = data.results.length;
      })
    })
  }
}
