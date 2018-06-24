import { Project } from "./project.model";

export class Task {
   
    constructor(
        public title?: string,
        public id?: number,
        public state?: string,
        public description?: string,
        public effort?: number, 
        public progress?: number, 
        public startDate?: Date,
        public endDate?: Date,
        public currentProject?: Project,
        public currentProjectId?: number,
        public user?: number

    ) { }
}