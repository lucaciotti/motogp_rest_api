interface circuitStatistics {
    rider_name: String;
    rider_num: String;
    value: Number;
}

interface circuitRecords {
    [type: string]: {
        season: Number;
        rider_name: String;
        rider_num: Number;
        rider_team: String;
        value: {
            time: Number;
            speed: Number;
        }
    }
}

export class Circuit {
    event_name: String;
    event_nation: String;
    event_autodrome: String;
    event_date: String;
    air_temp: String;
    ground_temp: String;
    short_description: Text;
    lenght_euro: Number;
    lenght_anglo: Number;
    corner_left: Number;
    corner_right: Number;
    width_euro: Number;
    width_anglo: Number;
    longstraight_euro: Number;
    longstraight_anglo: Number;
    image_circuit: String;
    motogp_laps: Number;
    moto2_laps: Number;
    moto3_laps: Number;
    motogp_tot_dist_euro: String;
    motogp_tot_dist_anglo: String;
    moto2_tot_dist_euro: String;
    moto2_tot_dist_anglo: String;
    moto3_tot_dist_euro: String;
    moto3_tot_dist_anglo: String;

    motogp_most_wins: Array<circuitStatistics>;
    motogp_most_poles: Array<circuitStatistics>;
    motogp_circuit_records: Array<circuitRecords>;
    moto2_most_wins: Array<circuitStatistics>;
    moto2_most_poles: Array<circuitStatistics>;
    moto2_circuit_records: Array<circuitRecords>;
    moto3_most_wins: Array<circuitStatistics>;
    moto3_most_poles: Array<circuitStatistics>;
    moto3_circuit_records: Array<circuitRecords>;

    constructor(name, nation, autodrome, date, air_temp, ground_temp, short_description, lenght_euro, lenght_anglo, corner_left, corner_right, 
        width_euro, width_anglo, longstraight_euro, longstraight_anglo, image_circuit='', motogp_laps,
        moto2_laps, moto3_laps, motogp_tot_dist, moto2_tot_dist, moto3_tot_dist){
            this.event_name = name;
            this.event_nation = nation;
            this.event_autodrome = autodrome;
            this.event_date = date;
            this.air_temp = air_temp;
            this.ground_temp = ground_temp;
            this.short_description = short_description;
            this.lenght_euro = lenght_euro;
            this.lenght_anglo = lenght_anglo;
            this.corner_left = corner_left;
            this.corner_right = corner_right;
            this.width_euro = width_euro;
            this.width_anglo = width_anglo;
            this.longstraight_euro = longstraight_euro;
            this.longstraight_anglo = longstraight_anglo;
            this.image_circuit = image_circuit != '' ? image_circuit.substr(0, image_circuit.indexOf('?version')) : '';
            this.motogp_laps = motogp_laps;
            this.moto2_laps = moto2_laps;
            this.moto3_laps = moto3_laps;
            this.motogp_tot_dist_euro = motogp_tot_dist.substr(0, motogp_tot_dist.indexOf('km') + 2).trim();
            this.motogp_tot_dist_anglo = motogp_tot_dist.substr(motogp_tot_dist.indexOf('km') + 3).trim();
            this.moto2_tot_dist_euro = moto2_tot_dist.substr(0, motogp_tot_dist.indexOf('km') + 2).trim();
            this.moto2_tot_dist_anglo = moto2_tot_dist.substr(motogp_tot_dist.indexOf('km') + 3).trim();
            this.moto3_tot_dist_euro = moto3_tot_dist.substr(0, motogp_tot_dist.indexOf('km') + 2).trim();
            this.moto3_tot_dist_anglo = moto3_tot_dist.substr(motogp_tot_dist.indexOf('km') + 3).trim();
    }

    addMotoGpMostWins(rider_name, rider_num, value){
        let stats: circuitStatistics = {
            rider_name: rider_name,
            rider_num: rider_num,
            value: value
        }
        if (!this.motogp_most_wins) {
            this.motogp_most_wins = [];
        }
        this.motogp_most_wins.push(stats);
    }

    addMotoGpMostPoles(rider_name, rider_num, value) {
        let stats: circuitStatistics = {
            rider_name: rider_name,
            rider_num: rider_num,
            value: value
        }
        if(!this.motogp_most_poles){
            this.motogp_most_poles = [];
        }
        this.motogp_most_poles.push(stats);
    }

    addMotoGpRecords(type :string, season, rider_name, rider_num, rider_team, time?, speed?) {
        let typeName :string = type.toLowerCase().split(' ').join('_').trim();
        let records: circuitRecords = {
            [typeName]: {
                season: season,
                rider_name: rider_name,
                rider_num: rider_num,
                rider_team: rider_team,
                value: {
                    time: time ? time : null,
                    speed: speed ? speed : null,
                }
            }
        }
        if (!this.motogp_circuit_records) {
            this.motogp_circuit_records = [];
        }
        this.motogp_circuit_records.push(records);
    }

    addMoto2MostWins(rider_name, rider_num, value) {
        let stats: circuitStatistics = {
            rider_name: rider_name,
            rider_num: rider_num,
            value: value
        }
        if (!this.moto2_most_wins) {
            this.moto2_most_wins = [];
        }
        this.moto2_most_wins.push(stats);
    }

    addMoto2MostPoles(rider_name, rider_num, value) {
        let stats: circuitStatistics = {
            rider_name: rider_name,
            rider_num: rider_num,
            value: value
        }
        if (!this.moto2_most_poles) {
            this.moto2_most_poles = [];
        }
        this.moto2_most_poles.push(stats);
    }

    addMoto2Records(type, season, rider_name, rider_num, rider_team, time?, speed?) {
        let typeName: string = type.toLowerCase().split(' ').join('_').trim();
        let records: circuitRecords = {
            [typeName]: {
                season: season,
                rider_name: rider_name,
                rider_num: rider_num,
                rider_team: rider_team,
                value: {
                    time: time ? time : null,
                    speed: speed ? speed : null,
                }
            }
        }
        if (!this.moto2_circuit_records) {
            this.moto2_circuit_records = [];
        }
        this.moto2_circuit_records.push(records);
    }

    addMoto3MostWins(rider_name, rider_num, value) {
        let stats: circuitStatistics = {
            rider_name: rider_name,
            rider_num: rider_num,
            value: value
        }
        if (!this.moto3_most_wins) {
            this.moto3_most_wins = [];
        }
        this.moto3_most_wins.push(stats);
    }

    addMoto3MostPoles(rider_name, rider_num, value) {
        let stats: circuitStatistics = {
            rider_name: rider_name,
            rider_num: rider_num,
            value: value
        }
        if (!this.moto3_most_poles) {
            this.moto3_most_poles = [];
        }
        this.moto3_most_poles.push(stats);
    }

    addMoto3Records(type, season, rider_name, rider_num, rider_team, time?, speed?) {
        let typeName: string = type.toLowerCase().split(' ').join('_').trim();
        let records: circuitRecords = {
            [typeName]: {
                season: season,
                rider_name: rider_name,
                rider_num: rider_num,
                rider_team: rider_team,
                value: {
                    time: time ? time : null,
                    speed: speed ? speed : null,
                }
            }
        }
        if (!this.moto3_circuit_records) {
            this.moto3_circuit_records = [];
        }
        this.moto3_circuit_records.push(records);
    }
}

// motogp_most_wins, motogp_most_poles, moto2_most_wins, moto2_most_poles, 
// moto3_most_wins, moto3_most_poles, moto3_circuit_redords


    // location: String;
    // history: String;
    // descrition: String;
    // weather_suggestion: String;
    // site_circuit: String;
    // site_airport: String;
    // site_tourist: String;
    // magazine: String;