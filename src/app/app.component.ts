import { Component } from '@angular/core';
import { BOTTLES } from 'src/mock-bottles';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bottle-app';
  listView: boolean = false;
  bottles = BOTTLES;
  toggleView(data: boolean) {
    console.log(data)
    this.listView = data
  }
}
