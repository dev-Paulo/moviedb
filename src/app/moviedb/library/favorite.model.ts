export class Favorite {
    constructor(
        public id: string, 
        public userId: string, 
        public backdrop_path: string,        
        public overview: string,
        public release_date: Date,
        public title: string,
        public vote_average: number,
    ) {}
}
