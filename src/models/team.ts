interface teamRiders {
    name: String;
    profile_link: String;
}

export class Team {
    private name: String;
    private image: String;
    private riders: Array<teamRiders>;

    constructor(name: String, eimage: String) {
        this.name = name;
        this.image = this.image;
        this.riders = [];
    }

    addRiders(name: String, profile_link: String){
        profile_link = 'localhost:3000/api/v1/riders/profile' + profile_link.substr(profile_link.lastIndexOf('/'));
        this.riders.push({ name, profile_link});
    }


}