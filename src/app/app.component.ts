import { Component, ChangeDetectorRef } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { default as fakeJs } from "../assets/js/fake-api";
import { IncidentLocation, Incident } from 'src/app/app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  locationList: Array<IncidentLocation>;
  incidents: Array<Incident> = [];
  tableColumns: Array<string> = ['Date and Time', 'ID', 'Priority', 'Location Name',
    'Incident Name', 'Description'];

  constructor(private cd: ChangeDetectorRef) {

  }

  ngOnInit() {
    let tempIncident: Array<Incident> = [];
    //Call the locationn api and get the list of locations.
    fakeJs.getLocations()
      .then((val: Array<any>) => {
        this.locationList = val;
        this.locationList.forEach(location => {

          //Get incident by passing location id- dependent call
          fakeJs.getIncidentsByLocationId(location.id)
            .then((incsList: Array<any>) => {

              incsList.forEach(inci => {
                if (this.incidents.some(function (val) { return val.id === inci.id }) === false) {
                  this.incidents.push(new Incident(inci.datetime, inci.id, location.name, inci.name,
                    'description not provided', inci.priority));
                  //Sort by datetime descending
                  this.incidents = this.incidents.sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());
                }
              });
            }
            );
        })
      })
  }

  /* Get the list sorted by priority ascending*/
  sorted(unsortedLst: Array<Incident>) {
    let sortedIncidents: Array<Incident> = [];
    for (var i = 1; i < 4; i++) {
      const x = unsortedLst.filter(obj => obj.priority === i);
      sortedIncidents = sortedIncidents.concat(x);
    }
    this.incidents = sortedIncidents;
  }
}

