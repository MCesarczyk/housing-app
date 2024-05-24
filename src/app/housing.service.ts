import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { HousingLocation } from './housinglocation';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  private url = 'api/locations';

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getAllHousingLocations(): Observable<HousingLocation[]> {
    return this.http.get<HousingLocation[]>(this.url).pipe(catchError(this.handleError<HousingLocation[]>('getAllHousingLocations', [])));
  }

  getLoationNo404(id: number): Observable<HousingLocation> {
    const url = `${this.url}/?id=${id}`;
    return this.http.get<HousingLocation[]>(url).pipe(
      map(location => location[0]), catchError(this.handleError<HousingLocation>(`getHousingLocation id=${id}`))
    );
  }

  getHousingLocationById(id: number): Observable<HousingLocation | undefined> {
    return this.http.get<HousingLocation>(`${this.url}/${id}`).pipe(catchError(this.handleError<HousingLocation>(`getHousingLocationById id=${id}`)));
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`);
  }
}
