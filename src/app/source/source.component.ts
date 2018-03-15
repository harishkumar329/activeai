import { Component, OnInit } from '@angular/core';
import { MappingService } from '../mapping.service';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.css']
})
export class SourceComponent implements OnInit {

  // souce code - directly to be displayed to the page
  public sourceCode:string = "";
  constructor(private ms:MappingService) { }

  ngOnInit() {
    // based on the mapping get LHS and RHS sections
    this.ms.jsonMapping.forEach(mapping => {
      // get LHS section, USER API format
      this.sourceCode += this.extractMapping(mapping.to,"user");
      this.sourceCode += "=";
      // get RHS section, based on the api
      this.sourceCode += this.extractMapping(mapping.from,"response");
      this.sourceCode += ";\n\t\t\t"
    });
    // source code in ES6 format
    if(this.sourceCode!=""){
      this.sourceCode = "var final=[];\nvar userJSON="+JSON.stringify(this.ms.getUserPayload())+";\nfetch('"+this.ms.apiURL+"').then((resp) => resp.json()).then(data=>{\n\tif(data instanceof Array){\n\t\tdata.forEach(response =>{\n\t\t\tvar user = Object.assign({},userJSON);\n\t\t\t"+this.sourceCode+"final.push(user);\n\t\t});\n\t}else{\n\t\t\tvar response=data;\n\t\t\tvar user = Object.assign({},userJSON);\n\t\t\t"+this.sourceCode+"final.push(user);\n\t}\n\tconsole.log(final);\n});";
    }
  }

  // extract the souce code based on the mapping and JSON source passed
  extractMapping = (mapping, source) => {
    // handle assosiate JSON Object formats
    // with redundant function call
    if(mapping.base instanceof Object){
      source += this.extractMapping(mapping.base,"");
    }
    source += "."+mapping.key+"";
    return source;
  }
}
