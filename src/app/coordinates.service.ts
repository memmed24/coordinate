import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coordinate } from './Coordinates';
import { Observable } from 'rxjs';
import * as IO from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class CoordinatesService {

  private socket: SocketIOClient.Socket;
  private url: string = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { 
    this.socket = IO('http://localhost:3000');
  }

  all() {
    return this.http.get<Coordinate[]>(`${this.url}/coordinates`);
  }

  listenToNewCoordinate() {
    return new Observable((observer) => {
      this.socket.on('receive', (data) => {
        observer.next(data)
      })
    })
  }

}
