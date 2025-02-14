import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StarshipsRes } from './types/types';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  private _http = inject(HttpClient);

  public readonly baseUrl= 'https://swapi.dev/api';

  public getAllStarships() {
    return this._http.get<StarshipsRes>(`${this.baseUrl}/starships`);
  }
}
