export class IncidentLocation {
    public name: string;
    public id: string;
}
export class Incident {
    public datetime: string;
    public id: number;
    public locationName: string;
    public incidentName: string;
    public description: string;
    public priority: number;
    constructor(dtime: Date, id: number, name: string, incident: string, desc: string, prio: number) {
        this.datetime = new Date(dtime).toLocaleString();
        this.id = id;
        this.locationName = name;
        this.incidentName = incident;
        this.description = desc;
        this.priority = prio;
    }
}
