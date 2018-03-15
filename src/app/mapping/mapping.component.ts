import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MappingService } from '../mapping.service';

@Component({
  selector: 'mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.css']
})
export class MappingComponent implements OnInit {

  // url text box reference
  @ViewChild("apiurl") apiurl: ElementRef;

  // store user payload - user API format
  public userPayload: Object;
  // store API payload - API payload format
  public apiPayload: Object = {};

  constructor(public ms: MappingService) {
    // get the user payload json format from mapping service
    this.userPayload = ms.getUserPayload();
    // reset the alert
    this.ms.showAlert = false;
  }

  ngOnInit() {
    // fetch default URL
    this.fetchURL();
  }

  // fetch URL, and store it to the API payload
  fetchURL = () => {
    this.ms.showAlert = false;
    // fetch data observable
    this.ms.fetchData(this.apiurl.nativeElement.value)
      .subscribe((data) => {
        /**
         * in case of array of objects (list), take the first object as a reference
         * in case of direct json object, use as direct reference
         * throw error when in case of unexpected data
         */
        if (data instanceof Array && typeof data[0] != undefined) {
          this.apiPayload = data[0];
        } else if (data instanceof Object) {
          this.apiPayload = data;
        } else {
          this.ms.alert = "Unexpected JSON Format";
          this.ms.showAlert = true;
        }
        // cache the api url, reused in testmapping component
        this.ms.apiURL = this.apiurl.nativeElement.value;
      }, (err) => {
        // api call, catch
        this.ms.alert = "Unexpected JSON Format - Error: " + err;
        this.ms.showAlert = true;
      });
  }

  // convert object to an Array
  generateArray = (obj) => {
    let array = Object.keys(obj).map((key) => { return key; });
    return array;
  }

  // check whether the param is object or not
  isObject = (data) => {
    return data instanceof Object;
  }

  // drag drop event, on drop store the data to the mapping
  // cache the mapping component state
  onItemDrop = (event, target) => {
    event.nativeEvent.currentTarget.innerHTML = event.dragData.data;
    this.ms.jsonMapping.push({ 'from': event.dragData.path, 'to': target });
    this.ms.defaultValue[target.key] = event.dragData.data;
  }
}
