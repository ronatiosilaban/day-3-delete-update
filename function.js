//deklarasi fs
const fs = require('fs');
const { tmpdir } = require('os');
//deklarasi readline
const validator = require('validator');

// const readline = require('readline');

//untuk sign in data dan output ke terminal
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
//deklarasi nama folder & file
const folder = './data'
const filepath = "./data/contacts.json";


//pengkondisian apabila folder tidak ada atau file tidak ada, akan dibuat folder & baru
if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder)
}
if (!fs.existsSync(filepath)) {
    fs.writeFileSync(filepath, '[]')
}

// const pertanyaan = (ask) => {
//     return new Promise((resolve, reject) => {
//         rl.question(ask, (jawaban) => {
//             resolve(jawaban)
//         })

//     })
// }
const loadContact = () => {
    const file = fs.readFileSync(filepath, 'utf8');
    const contacts = JSON.parse(file);
    return contacts
}

const listContact = () => {
    const contacts = loadContact();
    console.log('Contact List :');
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}.${contact.name}-${contact.number}`);
    });
};

const removecontact = (name) => {
    const Contact = loadContact();
    const index = Contact.findIndex((contact) => contact.name === name)
    console.log(index);
    if (index > -1) {
        Contact.splice(index, 1)
        fs, fs.writeFileSync(filepath, JSON.stringify(Contact))
        console.log("Removed Note");
        // loadContact(filteredNotes);
    } else {
        console.log("No Data Found");
        return false
    }
    console.log('succes');
};

const updateContact = (name, newName, newEmail, newNumber) => {
    const temp = []
    const Contact = loadContact();
    const index = Contact.findIndex((contact) => contact.name.toLowerCase() === name.toLowerCase())
    console.log(Contact);
    if (index > -1) {
        if (newName) {
            Contact[index].name = newName;
        }
        if (newEmail) {
            if (!validator.isEmail(newEmail)) {
                temp.push('masukan email yang valid!')
            }
            Contact[index].email = newEmail;
        }
        if (newNumber) {
            if (!validator.isMobilePhone(newNumber, "id-ID")) {
                temp.push('masukan nomer yang valid!')
            }
            Contact[index].number = newNumber;
        }
        if (temp.length > 0) {
            console.log(temp);
            return false
        }


    } else {
        console.log('maaf gagal');
        return false
    }
    fs.writeFileSync(filepath, JSON.stringify(Contact));
    console.log('success');
}


const detailContact = (name) => {
    const contacts =






        loadContact();
    const detailContact = contacts.find((contact => contact.name === name));
    if (detailContact) {
        console.log('Contact Detail :');
        console.log(detailContact.name);
        console.log(detailContact.email);
        console.log(detailContact.number);
    } else {
        console.log('Data tidak ditemukan');
    }
    fs.writeFileSync(filepath, JSON.stringify(contacts));
    console.log("Terimakasih sudah memasukkan data!");
}

const getcontacts = (name, email, number) => {
    const contact = { name, email, number };
    const contacts = loadContact();

    const duplicate = contacts.find((contact => contact.Name === name));

    if (duplicate) {
        console.log('Contact name is already recorded. Use another contact name.');
        return false
    }
    if (!validator.isMobilePhone(number, "id-ID")) {
        console.log('number invalid');
        return false
    }
    if (email) {
        if (!validator.isEmail(email)) {
            console.log('email invalid');
            return false
        }
    }


    contacts.push(contact);
    fs.writeFileSync(filepath, JSON.stringify(contacts));
    console.log("Terimakasih sudah memasukkan data!");

}


//exports function yang ingin dipanggil di file js lain
module.exports = { getcontacts, listContact, detailContact, removecontact, updateContact }

