import { Component, Input, EventEmitter, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'route-map',
  templateUrl: 'route-map.html',
  styleUrls: ['./route-map.scss'],
})
export class RouteMapComponent implements OnChanges {
  @Input() data: any;
  @Output() tapped = new EventEmitter<string>();

  polypoints = [];
  center = {
    lat: 0,
    lng: 0
  };

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

  markerClicked(id) {
    this.tapped.emit(id);
  }

}
