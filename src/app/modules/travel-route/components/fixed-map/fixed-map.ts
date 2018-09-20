
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'fixed-map',
  templateUrl: 'fixed-map.html',
  styleUrls: ['./fixed-map.scss']
})
export class FixedeMapComponent implements OnChanges {
  @Input() data: any;

  polypoints = [];
  center = {
    lat: 0,
    lng: 0
  };

  zoom = 3;

  constructor() {
    this.updatePolygons();
  }

  ngOnChanges() {
    this.updatePolygons();
  }

  updatePolygons() {
    if (this.data) {
      this.polypoints = [];
      this.center = {
        lat: 0,
        lng: 0
      };

      const centerCoordinate = {
        lat: 0,
        lng: 0
      };

      for (const d of this.data) {
        this.polypoints.push({
          _id: d._id,
          title: d.title,
          coordinate: d.coordinate
        });
        centerCoordinate.lat += d.coordinate.lat;
        centerCoordinate.lng += d.coordinate.lng;

      }

      this.center.lat = centerCoordinate.lat / this.data.length;
      this.center.lng = centerCoordinate.lng / this.data.length;
    }
  }

}
