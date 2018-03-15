import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MappingService } from '../mapping.service';

@Component({
  selector: 'app-testmapping',
  templateUrl: './testmapping.component.html',
  styleUrls: ['./testmapping.component.css']
})
export class TestmappingComponent {

  // url text field reference
  @ViewChild("testurl") testurl: ElementRef;
  // rest result array
  public testResult: any = [];

  constructor(public ms: MappingService) {
    // rest the alert
    this.ms.showAlert = false;
  }

  // fetch API
  // map API json to the user JSON format mapping
  // store the results in testResult array 
  testMapping = () => {
    this.ms.showAlert = false;
    // get user JSON format
    var userJSON = this.ms.getUserPayload();
    // reset test results
    this.testResult = [];
    // fetch API from service fetchData observable
    this.ms.fetchData(this.testurl.nativeElement.value)
      .subscribe(data => {
        /**
         * In case of Array, loop each JSON field and map to the User JSON format
         * In case of single object, point directly
         * Throw error message if in case of Unexpected format
         */
        if (data instanceof Array) {
          data.forEach(response => {
            // create new object instance
            var json = Object.assign({}, userJSON);
            this.ms.jsonMapping.forEach(mapping => {
              // map from field against the user JSON template
              this.assignValue(mapping.to, json, this.extractDataField(mapping.from, response));
            });
            this.testResult.push((this.syntaxHighlight(json)));
          });
        } else if (data instanceof Object) {
          // create new object instance
          var json = Object.assign({}, userJSON);
          this.ms.jsonMapping.forEach(mapping => {
            // map from field against the user JSON template
            this.assignValue(mapping.to, json, this.extractDataField(mapping.from, data));
          });
          this.testResult.push((this.syntaxHighlight(json)));
        }else{
          this.ms.alert = "Unexpected JSON Format";
          this.ms.showAlert = true;
        }
      }, (err) => {
        // api error catch
        this.ms.alert = "API call error: " + err;
        this.ms.showAlert = true;
      });
  }

  // extract the data field from the API JSON based on the mapping
  extractDataField = (mapping, response) => {
    if (mapping.base instanceof Object) {
      response = this.extractDataField(mapping.base, response);
    }
    return response[mapping.key];
  }

  // assign JSON template based on the mapping of the API template
  assignValue = (mapping, json, value) => {
    var obj = {};
    obj[mapping.key] = value;
    // handle assosiate objects
    // dynamic programming - redundant
    if (mapping.base instanceof Object) {
      json = this.assignValue(mapping.base, json, obj);
    } else {
      if (obj[mapping.key] instanceof Object) {
        json = Object.assign(json[mapping.key], obj[mapping.key]);
      } else {
        json = Object.assign(json, obj);
      }
    }
    return json;
  }

  // format the final json syntax
  // display in a proper pretty JSON format
  syntaxHighlight = (json) => {
    if (typeof json != 'string') {
      json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
  }
}
