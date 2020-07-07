import { Component, OnInit } from '@angular/core';
import { isPointInPolygon } from 'geolib';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {

  constructor() { }
  area1Coords = [
    { lat: 12.954106603821828, lng: 77.63842666333177 },
    { lat: 12.95395760881971, lng: 77.63905430024126 },
    { lat: 12.953772018429293, lng: 77.63900602047899 },
    { lat: 12.953909250773563, lng: 77.63838508909204 },
  ];

  area2Coords = [
    { lat: 12.954182408262366, lng: 77.63909185116746 },
    { lat: 12.954242529009168, lng: 77.63890543764093 },
    { lat: 12.954303956713737, lng: 77.63892220144727 },
    { lat: 12.954331403130036, lng: 77.63882631247499 },
    { lat: 12.954031452845054, lng: 77.63875590448835 },
    { lat: 12.95395630184562, lng: 77.63905564134576 },
  ];

  area3Coords = [
    { lat: 12.954335322601548, lng: 77.63848298972108 },
    { lat: 12.95410790935029, lng: 77.6384320277498 },
    { lat: 12.954029490939643, lng: 77.6387565750406 },
    { lat: 12.954331401685184, lng: 77.63882631247499 },
    { lat: 12.95434283769111, lng: 77.63873377626398 },
    { lat: 12.954281083252992, lng: 77.63872707074144 },

  ];
  area4Coords = [
    { lat: 12.954614491155372, lng: 77.6385297806262 },
    { lat: 12.954338720196253, lng: 77.63848418307295 },
    { lat: 12.954281952437343, lng: 77.6387269229888 },
    { lat: 12.954342215148218, lng: 77.63873463433971 },
    { lat: 12.95430699789374, lng: 77.63892088022818 },
    { lat: 12.954242973993296, lng: 77.6389074272736 },
    { lat: 12.954178287715624, lng: 77.63912734745806 },
    { lat: 12.954184455548749, lng: 77.63914796563019 },
    { lat: 12.954218069810473, lng: 77.63915785496626 },
    { lat: 12.954225177583877, lng: 77.63916958701135 },
    { lat: 12.954252462855832, lng: 77.63917695784745 },
    { lat: 12.954249526604682, lng: 77.63920242835572 },
    { lat: 12.954445607908808, lng: 77.6392398954629 },
  ];

  positions = [
    [12.954036238178764, 77.6394912253171],
    [12.954051921862435, 77.63929810626803],
    [12.954041466073427, 77.63917472465334]
  ]
  i = -0;
  position:any = this.positions[this.i];
  options = {
    position: this.position,
  }
  ngOnInit(): void {
    console.log('check', isPointInPolygon({ lat: 12.954323775550376, lng: 77.63915473532667 }, this.area4Coords));
    setInterval(() =>
      this.setPosition(), 5000
    );
  }
  setPosition() {
    this.i++;
    if (this.i <= this.positions.length - 1) {
      var pos = this.positions[this.i];
      this.position = {'lat': pos[0], 'lng': pos[1]};
      console.log('done', this.position);
      
    }
  }

  check(lat, lng) {
    var j = 0;
    var oddNodes = false;
    var x = lng;
    var y = lat;
    for (var i = 0; i < this.area1Coords.length; i++) {
      j++;
      if (j == this.area1Coords.length) { j = 0; }
      if (((this.area1Coords[i].lat < y) &&
        (this.area1Coords[j].lat >= y))
        || ((this.area1Coords[j].lat < y) &&
          (this.area1Coords[i].lat >= y))) {
        if (this.area1Coords[i].lng + (y -
          this.area1Coords[i].lat)
          / (this.area1Coords[j].lat -
            this.area1Coords[i].lat)
          * (this.area1Coords[j].lng -
            this.area1Coords[i].lng) < x) {
          oddNodes = !oddNodes
        }
      }
    }
    return oddNodes;
  }

}
