import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MappingService {

    // array to map api json field to user json field
    public jsonMapping:any = [];
    // array to memorize api URL
    // carried from mapping to testmapping component
    public apiURL:string;
    // store the values after the dragging
    // remember mapping state
    public defaultValue:Object = {};
    // alert message
    public alert:string;
    public showAlert:boolean = false;

    constructor(private _http:Http){}

    // function to fetch api and return as a JSON
    fetchData = (url)=>{
        return this._http.get(url).map(data => {
            try{
                return data.json();
            }catch(e){
                this.showAlert = true;
                this.alert = "Unexpected JSON Format";
            }
        });
    }

    // user API template
    getUserPayload = ()=>{
        return {
            "uid": "",
            "fullname": "",
            "uname": "",
            "email": "",    
            "street": "",      
            "city": "",
            "pin": "",
            "geo": {
                "lat": "",
                "lon": ""
            },
            "call": "",
            "site": "",    
            "companyname": "",
            "companyCatchPhrase": ""      
           };
    }
}