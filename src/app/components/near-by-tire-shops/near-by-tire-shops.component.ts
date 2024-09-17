import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { errorMessage } from '../../utils/CommonoFunctions';

@Component({
  selector: 'app-near-by-tire-shops',
  standalone: true,
  imports: [
    CommonModule,
    GoogleMapsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
  templateUrl: './near-by-tire-shops.component.html',
  styleUrl: './near-by-tire-shops.component.scss',
})
export class NearByTireShopsComponent {
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  zoom = 4;
  mapOptions: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };

  constructor() {}

  ngOnInit(): void {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
        },
        (error) => {
          console.error(
            'Geolocation error (' + error.code + '): ' + error.message
          );
          errorMessage(
            'Geolocation error (' + error.code + '): ' + error.message
          );
        }
      );
    } else {
      errorMessage('Geolocation is not supported by this browser.');
    }
  }
}
