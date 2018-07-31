
interface careerSummary {
    [title: string]: {
        motoGP: Number,
        moto2_250: Number,
        moto3_125: Number,
        all: Number,
    }
}

interface careerStatistics {
    [season: number]: {
        category: String;
        starts: Number;
        first_place: Number;
        second_place: Number;
        third_place: Number;
        tot: Number;
        poles: Number;
        bike: String;
        points: Number;
        position: Number;
    }
}

export class RiderProfile {
    private name: String;
    private team: String;
    private bike: String;
    private bike_image: String;
    private plc_birth: String;
    private date_birth: Date;
    private weight: String;
    private height: String;
    private career_summary?: Array<careerSummary>;
    private career_statistics?: Array<careerStatistics>;
    private bio_profile?: Text;

    constructor() {
        this.name = '';
        this.team = '';
        this.bike = '';
        this.bike_image = '';
        this.plc_birth = '';
        this.date_birth = new Date();
        this.weight = '';
        this.height = '';
    }

    getArrayOfDefaultKey() {
        return ['name', 'team', 'bike', 'plc_birth', 'date_birth', 'weight', 'height'];
    }

    getArrayOfSummerytKey() {
        return ['title', 'value1', 'value2', 'value3', 'valueAll'];
    }

    getArrayOfStatistictKey() {
        return ['season', 'category', 'starts', 'first_plc', 'second_plc', 'third_plc', 'tot', 'poles', 'bike', 'points', 'position'];
    }

    setDefaultValue(data: any) {
        this.name = data['name'];
        this.team = data['team'];
        this.bike = data['bike'];
        this.plc_birth = data['plc_birth'];
        this.date_birth = new Date(data['date_birth']);
        let weight = data['weight'];
        let height = data['height'];

        this.weight = weight.substr(weight.length - weight.indexOf(':')).trim();
        this.height = height.substr(height.length - height.indexOf(':')).trim();
    }

    setBikeImage(image: String){
        this.bike_image = image;
    }

    setBioProfile(text: Text){
        this.bio_profile = text;
    }

    addCareerSummary(title: string, value1: number, value2: number, value3: number, value4: number) {
        let c_summary: careerSummary = {
            [title]: {
                motoGP: value1,
                moto2_250: value2,
                moto3_125: value3,
                all: value4
            }
        };
        if (!this.career_summary) {
            this.career_summary = [];
        }
        this.career_summary.push(c_summary);
    }

    addCareerStatistics(data: any) {
        let c_statistic: careerStatistics = {
            [data['season']]: {
                category: data['category'],
                starts: data['starts'],
                first_place: data['first_plc'],
                second_place: data['second_plc'],
                third_place: data['third_plc'],
                tot: data['tot'],
                poles: data['poles'],
                bike: data['bike'],
                points: data['points'],
                position: data['position']
            }
        };
        if (!this.career_statistics) {
            this.career_statistics = [];
        }
        this.career_statistics.push(c_statistic);
    }
}