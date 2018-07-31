interface teamRiders {
    name: String;
    link: String;
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

    addRiders(name: String, link: String){
        this.riders.push({name, link});
    }


}