import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import { HousingLocation } from "../housinglocation";
import { HousingService } from "../housing.service";

@Component({
  selector: "app-details",
  template: `
    <article>
      <img
        class="listing-photo"
        [src]="housingLocation?.photo"
        alt="Exterior photo of {{ housingLocation?.name }}"
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <div class="listing-location-wrapper">
          <img
            class="listing-location-pin"
            src="assets/location-pin.svg"
            alt="Location pin icon"
            aria-hidden="true"
          />
          <p class="listing-location">
            {{ housingLocation?.city }}, {{ housingLocation?.state }}
          </p>
        </div>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{ housingLocation?.availableUnits }}</li>
          <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
          <li>
            Does this location have laundry: {{ housingLocation?.laundry }}
          </li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName" />

          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName" />

          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email" />
          <button type="submit" class="primary">Apply now</button>
        </form>
      </section>
    </article>
  `,
  styleUrl: "./details.component.css"
})
export class DetailsComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl("")
  });

  constructor(private housingService: HousingService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.getLocationById(id);
  }

  getLocationById(id: number): void {
    this.housingService
      .getHousingLocationById(id)
      .subscribe(location => (this.housingLocation = location));
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? "",
      this.applyForm.value.lastName ?? "",
      this.applyForm.value.email ?? ""
    );
  }
}