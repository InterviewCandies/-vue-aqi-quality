export const data = {
        "name": "Eilat Harbor",
        "city": "Eilat",
        "state": "South District",
        "country": "Israel",
        "location": {
            "type": "Point",
            "coordinates": [
                34.939443,
                29.531814
            ]
        },
        "current": {
            "weather": {
                "ts": "2017-02-01T01:00:00.000Z",
                    "tp": 12,
                    "pr": 1020,
                    "hu": 62,
                    "ws": 2,
                    "wd": 320,
                    "ic": "01n"
            },
            "pollution": {
                "ts": "2017-02-01T01:15:00.000Z",
                    "aqius": 50,
                    "mainus": "p1", //main pollutant for US AQI
                    "aqicn": 20,
                    "maincn": "p1",  //main pollutant for Chinese AQI
                    "p1": {   //pollutant details, concentration and appropriate AQIs
                    "conc": 20,
                        "aqius": 18,
                        "aqicn": 20
                }
            }
        },
        "units": { //object containing units information
            "p2": "ugm3", //pm2.5
                "p1": "ugm3", //pm10
                "o3": "ppb", //Ozone O3
                "n2": "ppb", //Nitrogen dioxide NO2
                "s2": "ppb", //Sulfur dioxide SO2
                "co": "ppm" //Carbon monoxide CO
        }
}