import { Component, OnInit } from '@angular/core';
import { Bottle } from 'src/bottle';
import { BottlesDataService } from './bottles-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  title: string = 'bottle-app';
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
        // set the sorted and filtered arrays
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

  // filter the sorted array based on price larger than 2 Euros
  filterBottlesByPrice = () => {
    if (this.priceHigherThanTwoEuros) {
      return this.sortedBottles.filter(bottle => {
        
        // create empty price array to check for prices of bottle articles
        let priceArray: Array<number> = [];

        // loop through each article, check liter price, and add to price array
        bottle.articles.forEach( article => {
          // transform price per litre text into float for each article and add to array
          let pricePerLitre = parseFloat(article.pricePerUnitText.split(' ')[0].slice(1).replace(',', '.'));
          priceArray.push(pricePerLitre);
        })
        priceArray.some(el => el > 2) ? console.log(true) : console.log(false);
        
        // return true if one of the articles for that bottle is larger than 2
        if (priceArray.some(el => el > 2)) {
          return true
        }
        else {
          return false
        }
      })
    }
    return this.sortedBottles
  }

}
