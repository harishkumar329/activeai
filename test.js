var userJSON = {
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
var final = [];
fetch('https://jsonplaceholder.typicode.com/users/')
.then((resp) => resp.json())
.then(data => {
    data.forEach(response => {
        var user = Object.assign({},userJSON);
        user.street = response.address.street;
        final.push(user);
    });
});
