import React, { useState } from 'react';
import firebase from './base';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import './ContactInput.css';
import { IoChevronBackCircle } from 'react-icons/io5';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const ContactsInput = ({ contact }) => {
  // Thin part should be refractored like that  const [values, setValues] = useState(initialValues);
  const [name, setName] = useState(contact.name);
  const [surname, setSurname] = useState(contact.surname);
  const [showForm, setShowForm] = useState(false);
  const [number, setNumber] = useState(contact.number);
  const [showCancel, setShowCancel] = useState(false);
  const [open, setOpen] = useState(false);

  const onUpdate = (e) => {
    setShowForm({
      showForm: true,
    });
    setShowCancel(!showCancel);
    const db = firebase.firestore();
    db.collection('contacts')
      .doc(contact.id)
      .set({ ...contact, name, surname, number });
  };

  const goBack = () => {
    setShowForm(!showForm);
    setShowCancel(!showCancel);
  };

  const onDelete = () => {
    const db = firebase.firestore();
    db.collection('contacts').doc(contact.id).delete();
    setOpen(false);
  };

  return (
    <div>
      {showForm ? (
        <div>
          <form
            action='
            '>
            {' '}
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              value={surname}
              name='surname'
              onChange={(e) => {
                setSurname(e.target.value);
              }}
            />
            <input
              value={number}
              name='number'
              onChange={(e) => {
                setNumber(e.target.value);
              }}
            />{' '}
          </form>
        </div>
      ) : null}
      <div className='icons'>
        <button title='update' onClick={onUpdate}>
          <TiEdit className='edit-icon' />
        </button>
        <Modal
          closeIcon
          open={open}
          trigger={
            <Button title='delete'>
              {' '}
              <RiCloseCircleLine className='delete-icon' />
            </Button>
          }
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}>
          <Header icon='archive' content='It will delete the contact' />
          <Modal.Content>
            <p>Are you sure you want to delete contact?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' onClick={() => setOpen(false)}>
              <Icon name='remove' /> No
            </Button>
            <Button color='green' onClick={onDelete}>
              <Icon name='checkmark' /> Yes
            </Button>
          </Modal.Actions>
        </Modal>

        {showCancel && (
          <button title='go back' onClick={goBack}>
            <IoChevronBackCircle className='back-icon' />
          </button>
        )}
      </div>
    </div>
  );
};

export default ContactsInput;
