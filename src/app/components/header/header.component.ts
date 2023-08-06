import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchValue:string = '';

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  search(){
    console.log("searchValue", this.searchValue)
        
    this.router.navigate(
      ['/home/filter', { s: this.searchValue}] 
    ); 
  }

}
