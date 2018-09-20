import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import * as extent from 'turf-extent';

import { MapboxService } from '@innomobile/mapbox';

export interface Marker {
  _id: string;
  coordinate: {
    lat: number;
    lng: number;
  };
}

@Component({
  selector: 'mapbox-map',
  templateUrl: './mapbox-map.component.html',
  styleUrls: ['./mapbox-map.component.scss']
})
export class MapboxMapComponent implements OnInit {
  @Input() data: any;
  @Output() tapped = new EventEmitter<string>();
  @ViewChild('map') mapContainer = null;

  myMarkers: any = [];

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/outdoors-v9';
  allGeoData: any;

  constructor(
    private mapboxService: MapboxService,
  ) { }

  ngOnInit() {
    this.buildMap();
  }

  buildMap() {
    const incomingMarkers = this.data.locations;

    this.map = new mapboxgl.Map({
      container: this.mapContainer.nativeElement,
      style: this.style,
      zoom: 3,
      center: [136.93506082541745, -27.428578202590764]
    });

    this.map.on('load', (event) => {
      this.map.resize();
      this.map.addSource('route',
        {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: null,
            properties: {
            }
          },
        }
      );
      this.map.addLayer({
        id: 'route',
        source: 'route',
        type: 'line',
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': '#2d5f99',
          'line-width': 6
        }
      });

      this.myMarkers = [];


      incomingMarkers.forEach((element, index) => {
        let type = '';
        if (index === 0) { type = 'start'; }
        if (index == incomingMarkers.length - 1) { type = 'last'; }
        this.addToMap(element, type);
      });

      this.getRoute();

    });
  }


  async getRoute() {
    const decoded = this.data.decoded_route;
    const allGeoData = this.mapboxService.getAllGeoDataFromGeometry(decoded);

    const s: any = this.map.getSource('route');

    s.setData(allGeoData);

    console.log('allGeoData', allGeoData);
    const bounds = extent(allGeoData);
    this.map.fitBounds(bounds, { padding: 20 });
  }




  addToMap(element: any, type = '') {
    const coordinates = [element.coordinate.lng, element.coordinate.lat];

    // console.log('Coord', element);

    const filterIndex = this.myMarkers.findIndex(element => element[0] === coordinates[0] && element[1] === coordinates[1]);
    // console.log('Filter', filterIndex)

    let alignment: any = 'center';

    let className = 'mapbox-marker';
    if (filterIndex >= 0) {
      className += ' marker-duplicate marker-element';
      alignment = 'left';
    }

    this.myMarkers.push(coordinates);

    const el = document.createElement('div');
    el.className = className;


    let color = '';
    let inside = '';
    switch (type) {
      case 'start':
        color = '#e74c3c';
        inside = '<span class="marker-icon"><?xml version="1.0" encoding="iso-8859-1"?> <!-- Generator: Adobe Illustrator 18.1.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --> <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" 	 viewBox="0 0 25.643 25.643" style="enable-background:new 0 0 25.643 25.643;" xml:space="preserve"> <g> 	<path style="fill:#030104;" d="M24.046,14.254c-0.077,0.375-0.333,0.725-0.804,0.612c-1.695-0.401-4.351-0.521-5.924-0.14 		c-0.578,0.14-0.848-0.112-1.065-0.803c-0.541-1.717-1.395-3.787-1.211-6.439c0.411-5.941,2.864-7.586,4.712-7.479 		S26.351,3.049,24.046,14.254z M16.444,17.799c0,0-0.331,1.031-0.517,2.71c-0.308,2.777,0.289,4.704,3.001,5.094 		c2.288,0.33,3.757-1.39,4.063-4.167c0.185-1.678,0.201-2.749,0.201-2.749L16.444,17.799z"/> 	<path style="fill:#030104;" d="M5.89,0.005c1.848-0.106,4.301,1.538,4.712,7.479c0.184,2.652-0.67,4.723-1.211,6.439 		c-0.218,0.69-0.487,0.942-1.065,0.803c-1.573-0.381-4.229-0.262-5.924,0.14c-0.471,0.112-0.727-0.237-0.804-0.612 		C-0.707,3.049,4.043,0.112,5.89,0.005z M2.451,18.687c0,0,0.017,1.071,0.201,2.749c0.307,2.777,1.775,4.497,4.063,4.167 		c2.712-0.39,3.309-2.316,3.001-5.094c-0.186-1.679-0.517-2.71-0.517-2.71L2.451,18.687z"/> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg></span>';
        break;
      case 'last':
        color = '#f1c40f';
        inside = '<span class="marker-icon"><?xml version="1.0" encoding="iso-8859-1"?> <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --> <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 496 496" style="enable-background:new 0 0 496 496;" xml:space="preserve" width="512px" height="512px"> <g> 	<g> 		<g> 			<path d="M428,24H100V8c0-4.418-3.582-8-8-8H68c-4.418,0-8,3.582-8,8v480c0,4.418,3.582,8,8,8h24c4.418,0,8-3.582,8-8V296h328     c4.418,0,8-3.582,8-8V32C436,27.582,432.418,24,428,24z M84,480h-8V16h8V480z M420,120h-80v80h80v80h-80v-80h-80v80h-80v-80h-80     v-80h80V40h80v80h80V40h80V120z" fill="#FFFFFF"/> 			<rect x="180" y="120" width="80" height="80" fill="#FFFFFF"/> 		</g> 	</g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg></span>';
        break;
      default:
        color = '#3FB1CE';
        inside = '' + this.myMarkers.length;
        break;
    }

    el.innerHTML = '<div class="marker-inside"><span style="position: absolute;transform: translate(0%,30%);width: 100%;text-align: center;">' + inside + '</span><svg height="41px" width="27px" viewBox="0 0 27 41"><g fill-rule="nonzero"><g transform="translate(3.0, 29.0)" fill="#000000"><ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="10.5" ry="5.25002273"></ellipse><ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="10.5" ry="5.25002273"></ellipse><ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="9.5" ry="4.77275007"></ellipse><ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="8.5" ry="4.29549936"></ellipse><ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="7.5" ry="3.81822308"></ellipse><ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="6.5" ry="3.34094679"></ellipse><ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="5.5" ry="2.86367051"></ellipse><ellipse opacity="0.04" cx="10.5" cy="5.80029008" rx="4.5" ry="2.38636864"></ellipse></g><g fill="' + color + '"><path d="M27,13.5 C27,19.074644 20.250001,27.000002 14.75,34.500002 C14.016665,35.500004 12.983335,35.500004 12.25,34.500002 C6.7499993,27.000002 0,19.222562 0,13.5 C0,6.0441559 6.0441559,0 13.5,0 C20.955844,0 27,6.0441559 27,13.5 Z"></path></g></g></svg></div>';

    new mapboxgl.Marker(el, {
      anchor: alignment
    })
      .setLngLat(coordinates)
      .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML('<h3>' + element.title + '</h3>'))
      .addTo(this.map);

    this.map.fitBounds(this.map.getBounds());
  }


  markerClicked(id) {
    console.log('Tapped', id);
    this.tapped.emit(id);
  }

}
