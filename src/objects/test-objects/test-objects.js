import Business from '../business/business';
//import Partnership from '../partnership/partnership';
//import Customer from '../customer/customer';
import { faker } from '@faker-js/faker';
//import Lead from '../lead/lead';


// Dummy function to generate a business description
function generateBusinessDescription() {
    return `${faker.company.name()} specializes in ${faker.company.catchPhrase().toLowerCase()} and excels at ${faker.company.buzzPhrase().toLowerCase()}.`;
}

export function dummyBusiness() {
    return new Business(
        faker.number.int(10000),  // Updated method for company name
        faker.company.name(),  // Updated method for company name
        faker.image.url(150,150),     // Updated method for image URL (e.g., logo placeholder)
        generateBusinessDescription(),  // Updated to use catchPhrase for business slogan
        faker.person.fullName(),       
        faker.company.catchPhrase(),    // Updated to use catchPhrase for business slogan
        faker.location.streetAddress(),  // Updated method for street address
        faker.internet.email(),
        faker.phone.number(),  // Updated method for phone number
        faker.internet.url(),  // Updated method for URL
        []  // Will fill in partnerships later
    );
};

export function dummyBusinesses(count) {
    const businesses = [];
    for (let i = 1; i <= count; i++) {
        businesses.push(dummyBusiness());
    }
    return businesses;
};

// export default function generateData() {
//     // Create arrays to hold our fake data
//     const businesses = [];
//     const partnerships = [];
//     const leads = [];
//     const customers = [];

//     // 2. Create fake customers
//     for (let i = 1; i <= 5; i++) {
//         customers.push(new Customer(
//             i,
//             faker.person.firstName(),
//             faker.person.lastName(),
//             faker.internet.email(),
//             faker.phone.number()  // Updated method for phone number
//         ));
//     }

//     // 3. Create fake businesses
//     for (let i = 1; i <= 3; i++) {
//         businesses.push(new Business(
//             i,
//             faker.company.name(),  // Updated method for company name
//             faker.image.url(),     // Updated method for image URL (e.g., logo placeholder)
//             generateBusinessDescription(),  // Updated to use catchPhrase for business slogan
//             faker.person.fullName(),       
//             faker.company.catchPhrase(),    // Updated to use catchPhrase for business slogan
//             faker.location.streetAddress(),  // Updated method for street address
//             faker.internet.email(),
//             faker.phone.number(),  // Updated method for phone number
//             faker.internet.url(),  // Updated method for URL
//             []  // Will fill in partnerships later
//         ));
//     }

//     function generateBusinessDescription() {
//         // You can use a combination of methods to generate a random business description
//         const companyName = faker.company.name();
//         const catchPhrase = faker.company.catchPhrase();
//         const bsDescription = faker.company.buzzPhrase(); // Business buzzwords
      
//         return `${companyName} specializes in ${catchPhrase.toLowerCase()} and excels at ${bsDescription.toLowerCase()}.`;
//       }

//     // 4. Create 3 unique partnerships, each connecting 2 businesses
//     partnerships.push(new Partnership(1, [], [businesses[0].id, businesses[1].id]));  // Partnership between business 1 and 2
//     partnerships.push(new Partnership(2, [], [businesses[1].id, businesses[2].id]));  // Partnership between business 2 and 3
//     partnerships.push(new Partnership(3, [], [businesses[0].id, businesses[2].id]));  // Partnership between business 1 and 3

//     // 5. Create fake leads (each lead connects users, partnerships, and customers)
//     for (let i = 1; i <= 4; i++) {
//         const randomBusiness = faker.helpers.arrayElement(businesses);  // Updated method for random selection
//         const randomPartnership = faker.helpers.arrayElement(partnerships);  // Updated method
//         const randomCustomer = faker.helpers.arrayElement(customers);  // Updated method

//         const newLead = new Lead(
//             i,
//             faker.date.recent(),  // Recent date
//             randomBusiness.id,        // Creator is a user
//             randomPartnership.id, // Associated with a partnership
//             randomCustomer.id,    // Linked to a customer
//             faker.helpers.arrayElement(Object.values(Lead.STATUS_OPTIONS))  // Random lead status
//         );

//         leads.push(newLead);

//         // Add the lead to the partnership it belongs to
//         randomPartnership.leads.push(newLead.id);
//     }

//     // 6. Link businesses to partnerships
//     businesses.forEach(business => {
//         partnerships.forEach(partnership => {
//             if (partnership.businesses.includes(business.id)) {
//                 business.partnerships.push(partnership.id);
//             }
//         });
//     });

//     // Return all the generated data as an object
//     return {
//         businesses,
//         partnerships,
//         leads,
//         customers
//     };
// };