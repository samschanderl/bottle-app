import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  @Input() listView: boolean = true;
  @Output() toggleView: EventEmitter<any> = new EventEmitter;

  ngOnInit(): void {
  }

  toggleOn: boolean = true;

  sendState() {
    this.listView = !this.listView;
    this.toggleView.emit(this.listView)
  }
}
