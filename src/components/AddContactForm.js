import React, { useEffect, useState } from 'react';
import { app } from '../base';
import Contact from '../Contact';
import ContactsInput from '../ContactsInput';

import '../ContactForm.css';
import { useForm } from 'react-hook-form';
import Header from './Header';
const db = app.firestore();

const AddContactForm = ({ contact }) => {
  const [photo, setPhoto] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [clickedButton, setClickedButtonText] = useState(false);
  const { register, handleSubmit } = useForm();
  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setPhoto(await fileRef.getDownloadURL());
  };

  const onSubmit = async (e, values) => {
    e.preventDefault();
    const surname = e.target.surname.value;
    const name = e.target.name.value;
    const number = e.target.number.value;
    const info = e.target.info.value;
    if (!surname || !name || !photo || !info) {
      return;
    }
    db.collection('contacts').doc(surname, name, number, info).set({
      surname: surname,
      photo: photo,
      name: name,
      number: number,
      info: info,
    });
  };

  const handleChangeForm = (e) => {
    e.preventDefault();
    setShowForm(!showForm);
    setClickedButtonText(!clickedButton);
  };

  return (
    <div>
      <button onClick={handleChangeForm}>
        {clickedButton ? 'Cancel' : 'Add Contact'}
      </button>{' '}
      {showForm ? (
        <form onSubmit={onSubmit}>
          <input type='file' onChange={onFileChange} />
          <input type='text' name='surname' placeholder='Surname' />
          <input type='text' name='number' placeholder='Phone number' />
          <input type='text' name='name' placeholder='Name' />
          <input type='text' name='info' placeholder='Info here' />
          <button type='submit'>Submit</button>
        </form>
      ) : null}
    </div>
  );
};

export default AddContactForm;
