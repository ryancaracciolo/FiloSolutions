import { v4 as uuidv4 } from 'uuid';

  export default class Partnership {
    constructor(businessId1, businessId2) {
      if (!businessId1 || !businessId2) {
        throw new Error('Both business IDs are required to create a partnership.');
      }
  
      this.id = uuidv4(); // Generate a unique Partnership ID
      this.PK = `PARTNERSHIP#${this.id}`;
      this.SK = 'METADATA';
      this.Type = 'Partnership';
      this.Businesses = [businessId1, businessId2];
    }
  
    toItem() {
      return {
        PK: this.PK,
        SK: this.SK,
        Type: this.Type,
        id: this.id,
        Businesses: this.Businesses,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      };
    }
  }
  