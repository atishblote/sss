import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../shared/global.service';

@Component({
  selector: 'app-home-starline',
  standalone: true,
  imports: [],
  templateUrl: './home-starline.component.html',
  styleUrl: './home-starline.component.scss'
})
export class HomeStarlineComponent implements OnInit{
  allSTarlineData:any
  constructor(private global:GlobalService){}

  ngOnInit(): void {
    this.global.getWithoutToken("all-starline-todays").subscribe({
      next: (res:any)=>{
        this.allSTarlineData = res.data
        console.log(this.allSTarlineData)
      },
      error: (err:any)=>{
        console.log(err.error)
      }
    })
  }
}
