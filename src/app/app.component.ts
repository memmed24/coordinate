import { Coordinate } from './Coordinates';
import { CoordinatesService } from './coordinates.service';
import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentInit {

  coordinates: Array<Coordinate>;

  counter = 1;

  public load: boolean = true;
  private socket;

  zoom = 3;
  lat: number = 40.3711792138771;
  lng: number = 49.84524513099768;

  latA: number = 40.379415268035046;
  latB: number = 49.88142018714893;

  constructor(
    private coordinateService: CoordinatesService
  ) {
    
  }
  
  ngOnInit(): void {
    this.coordinateService.listenToNewCoordinate().subscribe((data: Coordinate) => {
      this.coordinates.push(data);
    })
  }

  ngAfterContentInit(): void {
    this.fetchCoordinates();
  }

  increaseAmount() {
    this.counter++;
  }


  fetchCoordinates(): void {
    this.coordinateService.all().subscribe((coordinates: Coordinate[]) => {
      this.coordinates = coordinates;
      this.load = false;
    })
  }
  
  onClickHandler(e) {
    console.log(this.coordinates);
    console.log(e);
  }
}
