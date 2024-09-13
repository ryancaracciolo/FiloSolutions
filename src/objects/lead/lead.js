export default class Lead {

    static STATUS_OPTIONS = {
        Sent: "Sent",
        Intro: "Intro",
        Active: 'Active',
        ClosedWon: 'Closed-Won',
        ClosedLost: 'Closed-Lost'
    };
    
    constructor(id, date, creator, note, partnership, customer, status) {
        this.id = id;
        this.date = date;
        this.creator = creator; // a business id
        this.note = note; // a note string from the creator
        this.partnership = partnership; // a partnership id (not a business)
        this.customer = customer; // a customer id
        this.setStatus(status);
    }

    setStatus(status) {
        if (Object.values(Lead.STATUS_OPTIONS).includes(status)) {
            this.status = status;
        } else {
            this.status = this.getRandomStatus();
        }
    }

    getRandomStatus() {
        const statuses = Object.values(Lead.STATUS_OPTIONS);
        return statuses[Math.floor(Math.random() * statuses.length)];
    }
}