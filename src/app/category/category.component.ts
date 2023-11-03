import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent  implements OnInit {

  ngOnInit(): void {
  
  }

  onButtonClick() {
    alert('Categoria salva!')
  }

  onEnterKey() {
    this.onButtonClick();
  }

}
