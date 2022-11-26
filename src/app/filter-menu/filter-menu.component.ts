import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.css'],
})
export class FilterMenuComponent implements OnInit{
  @Input() sortAscending: boolean = true;
  @Input() 
  priceHigherThanTwoEuros: boolean = false;
  @Output() 
  toggleFilter: EventEmitter<any> = new EventEmitter;

  ngOnInit(): void {
  }
  sortByName() {
    this.sortAscending = !this.sortAscending;
    this.toggleFilter.emit({
      sortAscending: this.sortAscending,
      priceHigherThanTwoEuros: this.priceHigherThanTwoEuros})
  }
  filterByPrice() {
    this.priceHigherThanTwoEuros = !this.priceHigherThanTwoEuros;
    this.toggleFilter.emit({
      sortAscending: this.sortAscending,
      priceHigherThanTwoEuros: this.priceHigherThanTwoEuros})
  }
  
}
