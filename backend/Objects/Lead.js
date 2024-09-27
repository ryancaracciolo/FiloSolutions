import shortUUID from "short-uuid";

export default class Lead {
  constructor({id, businessId, otherBusinessId, name, email, phone, note, status, direction, createdAt}) {
    this.id = id || shortUUID().new(); // Generate or accept a unique Lead ID
    this.businessId = businessId; // The business that will own this item (sender or recipient)
    this.otherBusinessId = otherBusinessId; // The other business involved
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.note = note;
    this.status = status;
    this.direction = direction; // 'Shared' or 'Received'
    this.createdAt = createdAt || new Date().toISOString();
    this.PK = `BUSINESS#${this.businessId}`;
    this.SK = `LEAD#${this.createdAt}#${this.id}`;
    this.Type = 'Lead';
  }

  toItem() {
    return {
      id: this.id,
      PK: this.PK,
      SK: this.SK,
      Type: this.Type,
      businessId: this.businessId,
      otherBusinessId: this.otherBusinessId,
      name: this.name,
      email: this.email,
      phone: this.phone,
      note: this.note,
      status: this.status,
      direction: this.direction,
      createdAt: this.createdAt,
    };
  }

  static fromItem(item) {
    // Pass an object with named properties matching the constructor
    const lead = new Lead({
      id: item.id,
      businessId: item.businessId,
      otherBusinessId: item.otherBusinessId,
      name: item.name,
      email: item.email,
      phone: item.phone,
      note: item.note,
      status: item.status,
      direction: item.direction,
      createdAt: item.createdAt,
    });
    return lead;
  }  

  static STATUS_OPTIONS = {
    New: 'New',
    Contacted: 'Contacted',
    Qualified: 'Qualified',
    InNegotiation: 'In-Negotiation',
    ClosedWon: 'Closed-Won',
    ClosedLost: 'Closed-Lost',
  };
}