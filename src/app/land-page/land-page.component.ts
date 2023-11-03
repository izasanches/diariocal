import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-land-page',
  templateUrl: './land-page.component.html',
  styleUrls: ['./land-page.component.css']
})

export class LandPageComponent implements OnInit {
  imageUrl: string = "https://img.freepik.com/fotos-gratis/conceito-de-comida-saudavel-com-smartphone-e-area-de-transferencia_23-2147803014.jpg?w=740&t=st=1698973494~exp=1698974094~hmac=e21394db7a8d1fbce24aac70452e92f261e6e0c0d378a92f1112174104607024";
  isHidePannel = true;
  constructor() {}

  getBackgroundImage() {
    return {
      'backgroung-image':
      'linear-gradient(rgba(0, 0, 0, .7)), url (' +
      this.imageUrl + ')',
    };
  }

  ngOnInit(): void {
  
  }

}
