interface Ranking {
    rider_name: String;
    rider_nation: String;
    bike: String;
    position: Number;
    points: Number;
}

export class finalRank {
    esercizio: String;
    eventName: String;
    category: String;
    ranking: Array<Ranking>;

    constructor(esercizio, eventName, category){
        this.esercizio = esercizio;
        this.eventName = eventName;
        this.category = category;
    }

    addRank(rider_name, rider_nation, bike, position, points){
        let rank: Ranking = {
            rider_name: rider_name,
            rider_nation: rider_nation,
            bike: bike,
            position: position,
            points: points,
        }
        if (!this.ranking) {
            this.ranking = [];
        }
        this.ranking.push(rank);
    }
}