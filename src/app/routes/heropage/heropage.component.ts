import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heropage',
  templateUrl: './heropage.component.html',
  styleUrls: ['./heropage.component.scss']
})
export class HeropageComponent implements OnInit {


  public customClass = 'customClass';
  constructor() { }

  ngOnInit(): void {
  }

}
