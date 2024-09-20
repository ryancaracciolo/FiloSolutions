export default class Lead {
    static STATUS_OPTIONS = {
      Sent: 'Sent',
      Intro: 'Intro',
      Active: 'Active',
      ClosedWon: 'Closed-Won',
      ClosedLost: 'Closed-Lost',
    };
  
    constructor(id, date, creatorId, partnershipId, customerId, note, status) {
      this.PK = `PARTNERSHIP#${partnershipId}`; // Partition Key
      this.SK = `LEAD#${id}`;                   // Sort Key
      this.Type = 'Lead';                       // Item Type
      this.date = date;
      this.creator = creatorId; // Business ID of the creator
      this.customer = customerId; // Customer ID
      this.note = note;
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