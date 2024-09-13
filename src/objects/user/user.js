class User {
    constructor(id, name, email, phone, partners) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.partners = partners;
    }

    displayInfo() {
        return `${this.name} <${this.email}>' ${this.phone}`;
    }

    getPartner(partnerID) {
        return this.partners.find(partner => partner.id === partnerID);
    }
}