interface Ranking {
    rider_name: String;
    rider_num: Number;
    rider_team: String;
    rider_nation: String;
    bike: String;
    position: Number;
    points: Number;
    speed: Number;
    time_gap: String;
}

interface Weather {
    air_temp: String;
    ground_temp: String;
    humidity: String;
    track_condition: String;
}

interface eventRecords {
    type: String;
    detail: String;
    rider_name: String;
    speed: String;
    time: String;
}

export class eventResult {
    esercizio: String;
    name: String;
    category: String;
    session: String;
    ranking: Array<Ranking>;
    weather: Weather;
    records: Array<eventRecords>;

    constructor(esercizio, name, category, session){
        this.esercizio = esercizio;
        this.name = name;
        this.category = category;
        this.session = session;
    }

    addRanking(rider_name, rider_num, rider_team, rider_nation, bike, position, speed, time_gap, points?) {
        let rank: Ranking = {
            rider_name: rider_name,
            rider_num: rider_num,
            rider_team: rider_team,
            rider_nation: rider_nation,
            bike: bike,
            position: position,
            points: points,
            speed: speed,
            time_gap: time_gap,
        }
        if (!this.ranking) {
            this.ranking = [];
        }
        this.ranking.push(rank);
    }

    addWeather(air_temp, ground_temp, humidity, track_condition) {
        this.weather = {
            air_temp: air_temp.substr(air_temp.indexOf(':')+1),
            ground_temp: ground_temp.substr(ground_temp.indexOf(':') + 1),
            humidity: humidity.substr(humidity.indexOf(':') + 1),
            track_condition: track_condition.substr(track_condition.indexOf(':') + 1),
        }
    }

    addRecords(type, detail, rider_name, speed, time) {
        let record: eventRecords = {
            type: type,
            detail: detail,
            rider_name: rider_name,
            speed: speed,
            time: time,
        }
        if (!this.records) {
            this.records = [];
        }
        this.records.push(record);
    }
}