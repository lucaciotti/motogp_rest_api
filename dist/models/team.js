"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Team {
    constructor(name, eimage) {
        this.name = name;
        this.image = this.image;
        this.riders = [];
    }
    addRiders(name, profile_link) {
        profile_link = 'localhost:3000/api/v1/riders/profile' + profile_link.substr(profile_link.lastIndexOf('/'));
        this.riders.push({ name, profile_link });
    }
}
exports.Team = Team;
//# sourceMappingURL=team.js.map