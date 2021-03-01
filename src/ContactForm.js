import React, { useEffect, useState } from 'react';
import { app } from './base';
import Contact from './Contact';
import ContactsInput from './ContactsInput';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './ContactForm.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Header from './components/Header';
import AddContactForm from './components/AddContactForm';

const db = app.firestore();

const ContactForm = () => {
  const [photo, setPhoto] = React.useState(null);
  const [contacts, setContacts] = React.useState([]);

  // const onFileChange = async (e) => {
  //   const file = e.target.files[0];
  //   const storageRef = app.storage().ref();
  //   const fileRef = storageRef.child(file.name);
  //   await fileRef.put(file);
  //   setPhoto(await fileRef.getDownloadURL());
  // };

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   const surname = e.target.surname.value;
  //   const name = e.target.name.value;
  //   const number = e.target.number.value;
  //   if (!surname || !name || !photo) {
  //     return;
  //   }
  //   db.collection('contacts').doc(surname, name, number).set({
  //     surname: surname,
  //     photo: photo,
  //     name: name,
  //     number: number,
  //   });
  // };

  useEffect(() => {
    const fetchUsers = async () => {
      const contactsCollection = await db.collection('contacts').get();
      setContacts(
        contactsCollection.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <Header />
      <div></div>
      <ul className='contacts__list'>
        {contacts.map((contact, id) => {
          return (
            <div key={id}>
              <Contact contact={contact} />
            </div>
          );
        })}
      </ul>

      {/* <form onSubmit={onSubmit}>
        <input type='file' onChange={onFileChange} />
        <input type='text' name='surname' placeholder='Surname' />
        <input type='number' name='number' placeholder='Phone number' />
        <input type='text' name='name' placeholder='Name' />
        <button>Submit</button>
      </form> */}
      <AddContactForm contact={contacts} />
    </div>
  );
};

export default ContactForm;
