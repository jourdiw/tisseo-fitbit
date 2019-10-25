import { API_KEY } from "../common/auth";
// TODO: 
//    How to get stops correct in order to have correct API response

// https://api.tisseo.fr/v1/stops_schedules.json?stopPointId=3377699720881992&key=1ca585eb-f7a8-41e7-870a-7519f8cc2c96
// results[departures][departure][0][dateTime]

export function TisseoAPI(apiKey) {
  if (apiKey !== undefined) {
    this.apiKey = apiKey;
  }
  else {
    // Default key for open public access.
    this.apiKey = API_KEY;
  }
};

TisseoAPI.prototype.realTimeDepartures = function(stop_id) {
  let self = this;
  return new Promise(function(resolve, reject) {
    let url = "https://api.tisseo.fr/v1/stops_schedules.json?";
    url += "stopPointId=" + stop_id;
    url += "&key=" + self.apiKey;

    fetch(url).then(function(response) {
      return response.json();
    }).then(function(json) {
      //console.log("Got JSON response from server:" + JSON.stringify(json));

      let data = json["departures"];
      let departures = [];

      data["departure"].forEach( (destination) => {
        var MS = 60000;
        let full_time = destination["dateTime"];
        let clean_time = new Date(full_time);
        let today = new Date();
        let wait_in_minutes = (clean_time - today) / MS;
        let d = {
          "minutes": Number.parseInt(wait_in_minutes)
        };
        if (!Number.isInteger(d["minutes"])) {
          d["minutes"] = 0;
        }
        departures.push(d);
      });

      // Sort departures
      departures.sort( (a,b) => { return (a["minutes"] - b["minutes"]) } );

      resolve(departures);
    }).catch(function (error) {
      reject(error);
    });
  });
}
