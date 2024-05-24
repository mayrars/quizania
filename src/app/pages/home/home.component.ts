import { afterNextRender, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ICategories } from '../../models/categories.model';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private _apiService = inject(ApiService);
  categories: ICategories[] = [];
  ngOnInit(): void {    
    this._apiService.getCategories().subscribe(res=> {
      this.categories = res.trivia_categories.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          color: `rgb(${this.getRandomNumber(0, 255)},${this.getRandomNumber(0, 255)},${this.getRandomNumber(0, 255)})`,
          icon:item.name.toLowerCase().replace(/\s/g, '').replace(":","")
        }
      })
    })
  }
  getRandomNumber(min:number, max:number) {
    return Math.random() * (max - min) + min
  }
}
