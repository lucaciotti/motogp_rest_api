class careerSummary {
    [title: string]: { label: string; value: number };
}

interface careerStatistics {
    [season: number]: {
        Category: String;
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
    // private team: String;
    // private bike: String;
    // private bike_image: String;
    // private plc_birth: String;
    // private date_birth: Date;
    // private weight: number;
    // private height: number;
    private career_summary: Array<careerSummary>;
    // private career_statistics: Array<careerStatistics>;
    // private bio_profile: Text;

    constructor(name: String){
        this.name = name;
        this.career_summary = [];
    }

    addCareerSummary(title:string, label:string, value:number){
        let c_summary: careerSummary = {};
        c_summary[title] = {label, value};
        this.career_summary.push(c_summary);
    }
}