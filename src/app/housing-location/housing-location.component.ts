import { Component, Input } from "@angular/core";
import { HousingLocation } from "../housinglocation";

@Component({
  selector: "app-housing-location",
  template: `
    <section class="listing">
      <img
        class="listing-photo"
        [src]="housingLocation.photo"
        alt="Exterior photo of {{ housingLocation.name }}"
      />
      <h2 class="listing-heading">{{ housingLocation.name }}</h2>
      <div class="listing-location-wrapper">
        <img
          class="listing-location-pin"
          src="assets/location-pin.svg"
          alt="Location pin icon"
          aria-hidden="true"
        />
        <p class="listing-location">
          {{ housingLocation.city }}, {{ housingLocation.state }}
        </p>
      </div>
      <a [routerLink]="['/details', housingLocation.id]">Learn More</a>
    </section>
  `,
  styleUrl: "./housing-location.component.css"
})
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;
}
