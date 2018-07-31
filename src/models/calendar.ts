export class Calendar {
    name: String;
    date: Date;
    location: String;
    nation: String;
    isTest: Boolean;
    image: String;
    event_number: Number;
    short_name: String;

    constructor(name:String, date:Date, location:String, nation: String, isTest: Boolean, image: String){
        this.name = name;
        this.date = date;
        this.location = location;
        this.nation = nation;
        this.isTest = isTest;
        this.image = image;
        this.event_number = 0;
        if (!isTest) {
            this.event_number = +name.toString().substr(0, 2);
            this.name = name.substr(name.indexOf('-')+1).trim();
        }
        this.short_name = image.substr(image.lastIndexOf('/')+1, (image.length-image.indexOf('.j')));
    }
}