export default class Customer {
    constructor(id, name, email, phone) {
      this.PK = `CUSTOMER#${id}`; // Partition Key
      this.SK = 'METADATA';        // Sort Key
      this.Type = 'Customer';      // Item Type
      this.name = name;
      this.email = email;
      this.phone = phone;
    }
  }  