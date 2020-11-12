import { Component, OnInit } from '@angular/core';
import { LAVANDERIA } from 'src/app/consts/consts';

@Component({
  selector: 'app-bookwashingmachine',
  templateUrl: './bookwashingmachine.component.html',
  styleUrls: ['./bookwashingmachine.component.css']
})
export class BookwashingmachineComponent implements OnInit {
  actividad: string;
  constructor() { }

  ngOnInit(): void {
    this.actividad = LAVANDERIA;
  }

}
