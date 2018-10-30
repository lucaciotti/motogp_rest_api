"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Calendar {
    constructor(name, date, location, nation, isTest, image, circuit_link) {
        this.name = name;
        this.date = date;
        this.location = location;
        this.nation = nation;
        this.isTest = isTest;
        this.image = image;
        this.event_number = 0;
        this.circuit_link = 'localhost:3000/api/v1/circuit' + circuit_link.substr(circuit_link.lastIndexOf('/'));
        if (!isTest) {
            this.event_number = +name.toString().substr(0, 2);
            this.name = name.substr(name.indexOf('-') + 1).trim();
        }
        if (image != null) {
            this.short_name = image.substr(image.lastIndexOf('/') + 1, 5).replace('.', '').replace('j', '').trim();
        }
    }
}
exports.Calendar = Calendar;
//# sourceMappingURL=calendar.js.map