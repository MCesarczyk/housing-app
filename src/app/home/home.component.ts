import { Component, OnInit } from '@angular/core';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  template: `
  <section>
    <form>
      <input type="text" placeholder="Filter by city" #filter>
      <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
    </form>
  </section>
  <section class="results">
    <app-housing-location
      *ngFor="let housingLocation of filteredLocationList"
      [housingLocation]="housingLocation"
    >
    </app-housing-location>
  </section>
`,
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];

  constructor(private housingService: HousingService) { }

  ngOnInit(): void {
    this.getLocations();
  }

  getLocations(): void {
    this.housingService.getAllHousingLocations().subscribe(locations => {
      this.housingLocationList = locations;
      this.filteredLocationList = locations;
    })
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
