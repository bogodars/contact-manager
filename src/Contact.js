import React, { useState } from 'react';
import ContactsInput from './ContactsInput';
import './Contact.css';
import Avatar from 'react-avatar';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

const Contact = ({ contact }) => {
  const [open, setOpen] = useState(false);
  const [showForm, setForm] = useState(false);
  let { name, surname, photo, number, id, info } = contact;
  return (
    <div className='contact__item'>
      {/* I think it should be implemented some connditional when there is no src another avatar with rendering name should be {...!src ? name={contact.name} : null} */}
      <Avatar size='50' src={contact.photo} />
      {/* <img width='80' height='80' src={contact.photo} alt={contact.surname} />  */}
      <h4>{contact.surname}</h4>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<h4 className='number__line'>{contact.number}</h4>}>
        {' '}
        <Modal.Header>Contact Info</Modal.Header>
        <div className='info__header'>
          {' '}
          <h4>{contact.name}</h4>
          <h4>{contact.surname}</h4>
        </div>
        <Modal.Content image>
          <Image
            size='medium'
            src={contact.photo}
            alt={contact.surname}
            wrapped
          />
          <Modal.Description>
            <Header>About</Header>
            <p>{contact.info}</p>
            <div>{contact.number}</div>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => setOpen(false)}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
      <h4>{contact.name}</h4>
      <ContactsInput contact={contact} />
    </div>
  );
};

export default Contact;
