import { Component, OnInit } from '@angular/core';

import {PortfolioService} from '../portfolio.service';
import {Position} from '../position';

@Component({
  selector: 'app-positions-list',
  templateUrl: './positions-list.component.html',
  styleUrls: ['./positions-list.component.css']
})
export class PositionsListComponent implements OnInit {

//  positionsList: Position[] = [];
 positionsList$ = this.portfolioService.positionsList$ ;

  constructor(private portfolioService: PortfolioService) { 
    // this.positionsList.push(new Position("Options", "CE", "Short", 700, 8));
    // this.positionsList.push(new Position("Options", "PE", "Short", 700, 8));
    this.portfolioService.positionAdded(new Position("Options", "CE", "Short", 700, 8));
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log("onsubmit of positionslist");
    this.portfolioService.plotPositions();
  }

}