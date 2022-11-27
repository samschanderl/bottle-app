import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bottle } from 'src/bottle';
import { BOTTLES } from 'src/mock-bottles';
import { BottlesDataService } from './bottles-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  title: string = 'bottle-app';
  searchString: string = '';
  // bottles data
  bottlesArray: Bottle[] = [];
  sortedBottles: Bottle[] = [];
  sortedAndFilteredBottles: Bottle[] = [];
  // state data
  listView: boolean = true;
  sortAscending: boolean = true;
  priceHigherThanTwoEuros = false;

  constructor(private _bottleDataService: BottlesDataService) {}

  ngOnInit() {
    this._bottleDataService.getBottlesData().subscribe(data => 
      {this.bottlesArray = data;
      console.log(this.bottlesArray);
      this.sortedBottles = this.sortBottlesByName();
      this.sortedAndFilteredBottles = this.filterBottlesByPrice();})
  }

  // functions to change state from children components
  toggleView(data: boolean) {
    console.log(data);
    this.listView = data;
  };
  toggleFilter(data: any) {
    console.log(data);
    this.sortAscending = data.sortAscending;
    this.priceHigherThanTwoEuros = data.priceHigherThanTwoEuros;
    this.sortedBottles = this.sortBottlesByName();
    this.sortedAndFilteredBottles = this.filterBottlesByPrice();
  };

  updateSearchString(event: any){
    this.searchString = event.target.value;
    // this.sortedAndFilteredBottles = this.filterBottlesBySearchString();
  }

  // sort the bottles array based on ascending or descending filter selected
  sortBottlesByName = () => {
    let bottlesArray = this.bottlesArray.sort((a, b) => {
      let textA = a.name.toLocaleLowerCase();
      let textB = b.name.toLocaleLowerCase();
      if (this.sortAscending) {
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      }
      else {
        return (textB < textA) ? -1 : (textB > textA) ? 1 : 0;
      }
      })
    return bottlesArray
  }

  // Filter the sorted array based on price larger than 2 Euros
  filterBottlesByPrice = () => {
    if (this.priceHigherThanTwoEuros) {
      return this.sortedBottles.filter(bottle => {
        // transform price per litre text into float
        let pricePerLitre = parseFloat(bottle.articles[0].pricePerUnitText.split(' ')[0].slice(1).replace(',', '.'));
        console.log(pricePerLitre)
        return pricePerLitre > 2
      })
    }
    return this.sortedBottles
  }

  // search array for substring
  // filterBottlesBySearchString = () => {
  //   return this.sortedAndFilteredBottles.filter(bottle => {
  //     return bottle.brandName.toLocaleLowerCase === this.searchString.toLocaleLowerCase;
  //   })
  // }

  // initialize the sorted and filtered arrays

}
