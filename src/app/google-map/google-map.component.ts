import { Component, OnInit } from '@angular/core';
import { isPointInPolygon } from 'geolib';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {

  constructor() { }

  polys = [
    JSON.stringify({ 'name': 1, 'coords': [{ latlang: '12.954615167713982,77.63853529426154' }, { latlang: '12.954442647529259,77.63924071523246' }, { latlang: '12.95424660171983,77.63919779988822' }, { latlang: '12.954419122040278,77.63849640223083' },] }),
    JSON.stringify({ 'name': 2, 'coords': [{ latlang: '12.95441650809697,77.63849477130759' }, { latlang: '12.954330247950807,77.63881395418036' }, { latlang: '12.954027030230158,77.63874421674598' }, { latlang: '12.954104141668257,77.63842235166419' },] }),
  ];
  tableData = [];

  fenceData = ['fence1', 'fence2', 'Add new fence'];

  latlng1; latlng2; latlng3; latlng4;

  area1Coords = [
    { lat: 12.954615167713982, lng: 77.63853529426154 },
    { lat: 12.954442647529259, lng: 77.63924071523246 },
    { lat: 12.95424660171983, lng: 77.63919779988822 },
    { lat: 12.954419122040278, lng: 77.63849640223083 },
  ];

  area2Coords = [
    { lat: 12.95441650809697, lng: 77.63849477130759 },
    { lat: 12.954330247950807, lng: 77.63881395418036 },
    { lat: 12.954027030230158, lng: 77.63874421674598 },
    { lat: 12.954104141668257, lng: 77.63842235166419 },
  ];

  area3Coords = [
    { lat: 12.954332861895066, lng: 77.63882736522544 },
    { lat: 12.95401657444008, lng: 77.63875494558204 },
    { lat: 12.953952532716421, lng: 77.63909424502242 },
    { lat: 12.954257057500277, lng: 77.6391626413523 },
  ];
  area4Coords = [
    { lat: 12.954100220748229, lng: 77.63841162282813 },
    { lat: 12.953951225742294, lng: 77.63906876403678 },
    { lat: 12.95377347719768, lng: 77.63902584869254 },
    { lat: 12.953915937438358, lng: 77.63837675411094 },
  ];
  coords = [[]];
  positions = [
    [12.954036238178764, 77.6394912253171],
    [12.954051921862435, 77.63929810626803],
    [12.954041466073427, 77.63917472465334]
  ]
  i = -0;
  position: any = this.positions[this.i];
  options = {
    position: this.position,
  }
  ngOnInit(): void {
    //this.convertToTableViewFormate(this.polys);
    console.log('check', isPointInPolygon({ lat: 12.954323775550376, lng: 77.63915473532667 }, this.area4Coords));
    setInterval(() =>
      this.setPosition(), 5000
    );
  }

  

  setPosition() {
    this.i++;
    if (this.i <= this.positions.length - 1) {
      var pos = this.positions[this.i];
      this.position = { 'lat': pos[0], 'lng': pos[1] };
      console.log('done', this.position);

    }
  }

  selectedFenceData(data) {
    console.log(data);
    this.convertToMapPolygons(data.coords);
    // {name: "1", coords: "12.954615167713982,77.63853529426154;12.9544426475…02584869254;12.953915937438358,77.63837675411094;"}
    // this.coords = [this.area1Coords, this.area2Coords, this.area3Coords, this.area4Coords];
  }

  convertToMapPolygons(latLngValues) {
    if(latLngValues[latLngValues.length-1] == ';'){
      latLngValues = latLngValues.substring(0, latLngValues.length -1);
    }
    let eachValue = latLngValues.split(';');
    let data= eachValue.map(value => {
      value = value.split(',');
      let modifiedValue = {lat:parseFloat(value[0]), lng: parseFloat(value[1])};
      value = modifiedValue;
      return value;
    });
    console.log('modified ', data );
  }

}
