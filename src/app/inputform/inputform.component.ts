import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";

import { Position } from "../position";
import {PortfolioService} from '../portfolio.service';

@Component({
  selector: "app-inputform",
  templateUrl: "./inputform.component.html",
  styleUrls: ["./inputform.component.css"]
})
export class InputformComponent implements OnInit {
  portfolioInputForm;
  positionType;

  constructor(private formBuilder: FormBuilder, private portfolioService: PortfolioService) {
    this.portfolioInputForm = this.formBuilder.group({
      positionType: this.positionTypes[0],
      optionKind: this.optionKinds[0],
      direction: this.directions[0],
      strikePrice: "",
      premium: ""
    });
    this.positionType = this.positionTypes[0];
  }

  ngOnInit() {}
  positionTypes = ["Options", "Futures"];
  optionKinds = ["CE", "PE"];
  directions = ["Long", "Short"];
  model = new Position("Options", "CE", "Short", 700, 8);
  submitted = false;
  onSubmit(position: Position) {
    console.log(position);
    this.portfolioService.positionAdded(position);
    this.submitted = true;
  }
}
