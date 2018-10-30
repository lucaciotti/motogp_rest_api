"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RiderProfile {
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
    setDefaultValue(data) {
        this.name = data['name'];
        this.team = data['team'];
        this.bike = data['bike'];
        this.plc_birth = data['plc_birth'];
        this.date_birth = new Date(data['date_birth']);
        let weight = data['weight'];
        let height = data['height'];
        this.weight = weight ? weight.substr(weight.length - weight.indexOf(':')).trim() : 0;
        this.height = height ? height.substr(height.length - height.indexOf(':')).trim() : 0;
    }
    setBikeImage(image) {
        this.bike_image = image;
    }
    setBioProfile(text) {
        this.bio_profile = text.replace('Profile\n', '');
    }
    addCareerSummary(title, value1, value2, value3, value4) {
        let c_summary = {
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
    addCareerStatistics(data) {
        let c_statistic = {
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
exports.RiderProfile = RiderProfile;
//# sourceMappingURL=riderProfile.js.map