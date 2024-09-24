
import shortUUID from "short-uuid";
 
 export default class Partnership {
    constructor(id, businessId1, businessId2, status, createdAt) {
      this.id = id || shortUUID().new() ; // Generate a unique ID
      this.PK = `BUSINESS#${businessId1}`;
      this.SK = `PARTNER#${businessId2}`;
      this.Type = 'Partnership';
      this.partnerId = businessId2;
      this.status = status; // Pending_Sent, Pending_Received, Confirmed, Suggested
      this.createdAt = createdAt || new Date().toISOString();
    }
  
    toItem() {
      return {
        id: this.id,
        PK: this.PK,
        SK: this.SK,
        Type: this.Type,
        partnerId: this.partnerId,
        status: this.status,
        createdAt: this.createdAt,
      };
    }

    fromItem(item) {
        const partnership = new Partnership(
            item.id,
            item.businessId1,
            item.businessId2,
            item.status,
            item.createdAt
        );
        return partnership;
      }
  }
  