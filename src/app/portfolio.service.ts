import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import Chart from "chart.js";

import { Position } from "./position";

@Injectable()
export class PortfolioService {
  portfolioSubject = new BehaviorSubject<Position>(null);
  readonly positionsList$ = this.portfolioSubject.pipe(
    switchMap(position => this.addPosition(position))
  );
  positions: Position[] = [];
  chart = [];

  positionAdded(position: Position): void {
    console.log("inside positionAdded");
    this.portfolioSubject.next(position);
    // this.positionExistsSubject.next(null);
  }

  addPosition(position: Position): Observable<any> {
    console.log("inside addPosition" + position);
    this.positions.push(position as Position);
    console.log(this.positions);
    return of(this.positions.slice(1));
  }
  constructor() {}
  futuresPayoff(position: Position) {
    if (position.direction == "Long") {
      return function(x) {
        return x - position.strikePrice;
      };
    }
    if (position.direction == "Short") {
      return function(x) {
        return position.strikePrice - x;
      };
    }
    return function(x) {
      x;
    };
  }
  /*
def options_payoff(kind, direction, strike, premium):
    # kind: call or put 'ce' or 'pe' e-> european
    # direction buy(>0) or sell (<0)
    # strike - strike price of option
    # premium - premium paid for option
    if kind.lower() == 'ce' and direction > 0:
        # Bought call option.
        return lambda expiry_price: -premium + max(expiry_price - strike, 0)
    if kind.lower() == 'ce' and direction < 0:
        # sold call option
        return lambda expiry_price: premium - max(expiry_price - strike, 0)
    if kind.lower() == 'pe' and direction > 0:
        # bought put option.
        return lambda expiry_price: -premium + max(strike - expiry_price, 0)
    if kind.lower() == 'pe' and direction < 0:
        return lambda expiry_price: premium - max(strike - expiry_price, 0)
*/
  optionsPayoff(position) {
    if (position.optionKind == "CE" && position.direction == "Long") {
      return function(expiry_price) {
        return (
          -position.premium + Math.max(expiry_price - position.strikePrice, 0)
        );
      };
    }
    if (position.optionKind == "CE" && position.direction == "Short") {
      return function(expiry_price) {
        return (
          position.premium - Math.max(expiry_price - position.strikePrice, 0)
        );
      };
    }
    if (position.optionKind == "PE" && position.direction == "Long") {
      return function(expiry_price) {
        return (
          -position.premium + Math.max(position.strikePrice - expiry_price, 0)
        );
      };
    }
    if (position.optionKind == "PE" && position.direction == "Short") {
      return function(expiry_price) {
        return (
          position.premium - Math.max(position.strikePrice - expiry_price, 0)
        );
      };
    }
  }

  getCoordinates(
    payoffFuncs: any[],
    around: number,
    priceRangePct = [0.5, 1.5]
  ) {
    var nPoints = 25;
    //generate nPoints data points around 'around'
    var dataPoints = [];
    var dataResults = [];
    var point = priceRangePct[0] * around;
    var gradient = (around * (priceRangePct[1] - priceRangePct[0])) / nPoints;
    for (var i = 0; i < nPoints; i++) {
      dataPoints.push(point.toFixed(2));
      point = point + gradient;
      dataResults.push(0);
    }

    // apply each payoffFunc on dataPoints
    payoffFuncs.forEach(function(payoffFunc) {
      for (var i = 0; i < nPoints; i++) {
        dataResults[i] += payoffFunc(dataPoints[i]);
      }
    });

    return { x: dataPoints, y: dataResults };
  }

  plotPositions(): boolean {
    console.log("plotPositions");
    var payoffFuncs = [];
    var pstns = this.positions.slice(1);
    // console.log(this.optionsPayoff, this.futuresPayoff);
    if (pstns.length > 0) {
      pstns.forEach(function(pstn: Position) {
        console.log(pstn.positionType);
        console.log();
        if (pstn.positionType == "Options") {
          payoffFuncs.push(PortfolioService.prototype.optionsPayoff(pstn));
        } else if (pstn.positionType == "Futures") {
          payoffFuncs.push(PortfolioService.prototype.futuresPayoff(pstn));
        }
      });
      var coordinates = this.getCoordinates(payoffFuncs, pstns[0].strikePrice, [
        0.8,
        1.2
      ]);
      console.log(coordinates);
      this.chart = new Chart("canvas", {
        type: "line",
        data: {
          labels: coordinates.x,
          datasets: [
            {
              label: "Payoff Value",
              data: coordinates.y,
              borderColor: "#3cba9f",
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [
              {
                display: true
              }
            ],
            yAxes: [
              {
                display: true
              }
            ]
          }
        }
      });
      return true;
    }
    return false;
  }
}
