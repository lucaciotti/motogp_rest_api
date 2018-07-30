
export class Riders {
    private name: String;
    private nation: String;
    private num: Number;
    private image: String;
    private flag_image: String;
    private profileLink: String;
    private prova?: String;

    constructor(name: String, nation: String, num: Number, image: String, flag_image: String, profileLink: String){
        this.name = name;
        this.nation = nation;
        this.num = num;
        this.image = image;
        this.flag_image = flag_image;
        this.profileLink = profileLink;
    }
}