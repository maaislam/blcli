/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';

export default () => {
  setup();

  (async () => {
    const rawResponse = await fetch('https://dy-api.com/v2/collect/user/event', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': 'https://dy-api.com',
        // 'Access-Control-Allow-Credentials': 'true'
      },
      body: `{
        "user": {
          "id": "-2760706204914197437"
        },
        "session": {
          "custom": "b07b7d7d28b3f39ed0a8dc18f9108dd1"
        },`
    }).then((response) => {
      return response.text();
    }).then((data) => {
      console.log(data);
    });
    
  })();

};


var request = require("request");

var options = {
  method: 'POST',
  url: 'https://dy-api.com/v2/collect/user/event',
  headers: {'content-type': 'application/json', 'dy-api-key': 'your-api-key'},
  body: `{
  "user": {
    "id": "myuser123abc"
  },
  "session": {
    "custom": "custsession123"
  },
  "events": [{
  	"name": "myEvent123",
  	"properties":{}
  }]}`
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});