console.log("******* Welcome To Address Book System *******");

const nameRegex = RegExp('^[A-Z]{1}[a-z]{3,}$');
const addressRegex = RegExp('^[a-zA-z0-9#,]{4,}$');
const cityStateRegex = RegExp('^[a-zA-z]{4,}$');
const zipRegex = RegExp("^[0-9]{3}\\s{0,1}[0-9]{3}$");
const phoneNumberRegex = RegExp("^[0-9]{2}\\s{1}[0-9]{10}$");
const emailRegex = RegExp("^[a-zA-Z]+[a-zA-Z0-9]*[- . + _]?[a-zA-Z0-9]+[@]{1}[a-z0-9]+[.]{1}[a-z]+[.]?[a-z]+$");

class Contact {

    constructor(...params) {
        this.firstName = params[0];
        this.lastName = params[1];
        this.address = params[2];
        this.city = params[3];
        this.state = params[4];
        this.zip = params[5];
        this.phoneNumber = params[6];
        this.email = params[7];
    }

    get firstName() {
        return this._firstName;
    }

    get lastName() {
        return this._lastName;
    }

    get address() {
        return this._address;
    }

    get city() {
        return this._city;
    }

    get state() {
        return this._state;
    }

    get zip() {
        return this._zip;
    }

    get phoneNumber() {
        return this._phoneNumber;
    }

    get email() {
        return this._email;
    }

    set firstName(firstName) {
        if (nameRegex.test(firstName))
            this._firstName = firstName;
        else
            throw "**** FIRST NAME is Incorrect ****";
    }

    set lastName(lastName) {
        if (nameRegex.test(lastName))
            this._lastName = lastName;
        else
            throw "**** LAST NAME is Incorrect ****";
    }

    set address(address) {
        if (addressRegex.test(address))
            this._address = address;
        else
            throw "**** ADDRESS is Incorrect ****";
    }

    set city(city) {
        if (cityStateRegex.test(city))
            this._city = city;
        else
            throw "**** CITY is Incorrect ****";
    }

    set state(state) {
        if (cityStateRegex.test(state))
            this._state = state;
        else
            throw "**** STATE is Incorrect ****";
    }

    set zip(zip) {
        if (zipRegex.test(zip))
            this._zip = zip;
        else
            throw "**** ZIP is Incorrect ****";
    }

    set phoneNumber(phoneNumber) {
        if (phoneNumberRegex.test(phoneNumber))
            this._phoneNumber = phoneNumber;
        else
            throw "**** PHONE NUMBER is Incorrect ****";
    }

    set email(email) {
        if (emailRegex.test(email))
            this._email = email;
        else
            throw "**** EMAIL ADDRESS is Incorrect ****";
    }

    toString() {
        return "First Name : " + this.firstName + ", Last Name : " + this.lastName + ", Address : " + this.address + ", City : " + this.city + ", State : " + this.state + ", Zip : " + this.zip + ", Phone Number : " + this.phoneNumber + ", Email : " + this.email;
    }
}

let addressBookArray = new Array();
let contactsCityMap = new Map();
let contactsStateMap = new Map();

function contactExists(firstName, lastName) {
    return addressBookArray.some(contact => contact.firstName == firstName && contact.lastName == lastName);
}

function addContact(contact) {
    if (!contactExists(contact.firstName, contact.lastName)) 
        addressBookArray.push(contact);
    else 
        throw "Contact is Present in the Address Book";
}

function editContact(firstName, lastName, property, newValue) {
    if (contactExists(firstName, lastName)) {
        switch (property) {
            case "address":
                addressBookArray.find((contact) => contact.firstName == firstName).address = newValue;
                break;
            case "city":
                addressBookArray.find((contact) => contact.firstName == firstName).city = newValue;
                break;
            case "state":
                addressBookArray.find((contact) => contact.firstName == firstName).state = newValue;
                break;
            case "zip":
                addressBookArray.find((contact) => contact.firstName == firstName).zip = newValue;
                break;
            case "phoneNumber":
                addressBookArray.find((contact) => contact.firstName == firstName).phoneNumber = newValue;
                break;
            case "email":
                addressBookArray.find((contact) => contact.firstName == firstName).email = newValue;
                break;
            default:
                console.log("Enter valid property");
        }
    }
    else {
        console.log("Contact Does Not Exist");
    }
}

function deleteContact(firstName, lastName) {
    if (contactExists(firstName, lastName)) {
        addressBookArray = addressBookArray.filter((contact) => contact.firstName != firstName && contact.lastName != lastName);
    } else {
        console.log("Contact Does Not Exist");
    }
}

function getCountOfContacts(count) {
    count += 1;
    return count;
}

function searchContactByCity(firstName, city) {
    return addressBookArray.filter((contact) => contact.city == city && contact.firstName == firstName);
}
  
function searchContactByState(firstName, state) {
    return addressBookArray.filter((contact) => contact.state == state && contact.firstName == firstName);
}

function viewContactsByCity(city){
    return addressBookArray.filter((contact) => contact.city == city);
}

function viewContactsByState(state){
    return addressBookArray.filter((contact) => contact.state == state);
}

let firstContact = new Contact("Praful", "Gabhane", "#3ac910", "Mumbai", "Maharashtra", "560 043", "91 777777777", "dp@gmail.com");
let secondContact = new Contact("Preeti", "Gabhane", "#6ac810", "Pune", "Maharashtra", "123 569", "91 9898989897", "ks@gmail.com");
let thirdContact = new Contact("Pragati", "Gabhane", "#8105bc", "Ratnagiri", "Maharashtra", "550 864", "91 9475768574", "ks@gmail.com");
let fourthContact = new Contact("Ganesh", "Gabhane", "#8105bc", "Sindhudurg", "Maharashtra", "550 864", "91 9465667465", "kk@gmail.com");

try {
    addressBookArray.push(firstContact);
    addressBookArray.push(secondContact);
    addressBookArray.push(thirdContact);
    addressBookArray.push(fourthContact);
} catch (e) {
    console.error(e);
}

console.log(addressBookArray);

console.log("\nAfter Editing Contact");
editContact("Praful", "Gabhane", "city", "Mumbai");
console.log(addressBookArray);

console.log("\nCount of Contacts : " + addressBookArray.reduce(getCountOfContacts, 0));

console.log("\nAfter Deleting Contact");
deleteContact("Praful", "Gabhane");
console.log(addressBookArray);

console.log("\nCount of Contacts : " + addressBookArray.reduce(getCountOfContacts, 0));

console.log("\nAdding Duplicate Contact");
try {
    addContact(secondContact);
} catch (e) {
    console.error(e);
}
console.log(addressBookArray);

console.log("\nSearch Pragati In City - Pune");
console.log(searchContactByCity("Pragati", "Pune"));

console.log("\nSearch Pragati In State - Maharashtra");
console.log(searchContactByState("Pragati", "Maharashtra"));


console.log("\nView Contacts By City : Pune \n" );
console.log(viewContactsByCity("Pune"));

console.log("\nView Contacts By State : Maharashtra \n" );
console.log(viewContactsByState("Maharashtra"));