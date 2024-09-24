import shortUUID from "short-uuid";

export default class Business {
    constructor(id, name, logo, desc, owner, industry, address, email, phone, website,) {
      if (!id || !email || !name) {
        console.log(id, email, name)
        throw new Error('Business ID, email, and name are required.');
      }
      this.id = id || shortUUID().new(); // Generate a unique ID
      this.PK = `BUSINESS#${this.id}`; // Partition Key
      this.SK = 'METADATA';        // Sort Key
      this.Type = 'Business';      // Item Type
      this.name = name;
      this.logo = logo;
      this.desc = desc;
      this.owner = owner;
      this.industry = industry;
      this.address = address;
      this.email = email;          // For GSI
      this.phone = phone;
      this.website = website;
    }
  
    // Method to validate business data
    validate() {
      if (!this.email.includes('@')) {
        throw new Error('Invalid email address.');
      }
      // Add more validation as needed
    }
  
    // Method to convert the class instance to a plain object for DynamoDB
    toItem() {
      return {
        id: this.id,
        PK: this.PK,
        SK: this.SK,
        Type: this.Type,
        name: this.name,
        logo: this.logo,
        desc: this.desc,
        owner: this.owner,
        industry: this.industry,
        address: this.address,
        email: this.email,
        phone: this.phone,
        website: this.website,
      };
    }

    static fromItem(item) {
        const business = new Business(
            item.id,
            item.name,
            item.logo,
            item.desc,
            item.owner,
            item.industry,
            item.address,
            item.email,
            item.phone,
            item.website,
        );
        return business;
      }
}