import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { InputformComponent } from './inputform/inputform.component';
import { PositionsListComponent } from './positions-list/positions-list.component';
import { PortfolioService } from './portfolio.service';
import { GraphPlotComponent } from './graph-plot/graph-plot.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule ],
  declarations: [ AppComponent, HelloComponent, InputformComponent, PositionsListComponent, GraphPlotComponent ],
  bootstrap:    [ AppComponent ],
  providers: [PortfolioService]
})
export class AppModule { }
