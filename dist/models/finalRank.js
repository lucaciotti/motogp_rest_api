"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class finalRank {
    constructor(esercizio, eventName, category) {
        this.esercizio = esercizio;
        this.eventName = eventName;
        this.category = category;
    }
    addRank(rider_name, rider_nation, bike, position, points) {
        let rank = {
            rider_name: rider_name,
            rider_nation: rider_nation,
            bike: bike,
            position: position,
            points: points,
        };
        if (!this.ranking) {
            this.ranking = [];
        }
        this.ranking.push(rank);
    }
}
exports.finalRank = finalRank;
//# sourceMappingURL=finalRank.js.map