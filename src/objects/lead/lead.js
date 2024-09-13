export default class Lead {

    static STATUS_OPTIONS = {
        Sent: "Sent",
        Introduced: "Intro'd",
        Active: 'Active',
        ClosedWon: 'Closed-Won',
        ClosedLost: 'Closed-Lost'
    };
    
    constructor(id, date, creator, partnership, customer, status) {
        this.id = id;
        this.date = date;
        this.creator = creator;
        this.partnership = partnership;
        this.customer = customer;
        this.setStatus(status);
    }

    setStatus(status) {
        if (Object.values(Lead.STATUS_OPTIONS).includes(status)) {
          this.status = status;
        } else {
          throw new Error(`Invalid status: ${status}. Must be one of: ${Object.values(Lead.STATUS_OPTIONS).join(', ')}`);
        }
      }
}