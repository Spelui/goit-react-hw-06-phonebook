import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import Filter from "../Filter/Filter";
import * as storage from "../../services/localStorage";
import s from "./App.module.scss";

const STORAGE_KEY = "contacts";

const App = () => {
  const [contacts, setContacts] = useState([
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const savedContacts = storage.get(STORAGE_KEY);
    if (savedContacts) {
      setContacts([...savedContacts]);
    }
  }, []);

  useEffect(() => storage.save(STORAGE_KEY, contacts), [contacts]);

  const onSubmitName = ({ name, number }) => {
    const newName = {
      id: nanoid(),
      name,
      number,
    };

    const compareContact = contacts.some(
      (contact) => contact.name.toLowerCase() === newName.name.toLowerCase()
    );
    if (compareContact) {
      return alert(`${name} is alredy in contacts`);
    }

    setContacts([newName, ...contacts]);
  };

  const filteredContact = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  const filterResult = filteredContact();

  const onFilterValueChange = (e) => setFilter(e.target.value);

  const deleteContact = (id) =>
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );

  return (
    <main>
      <section>
        <div className={s.container}>
          <h1 className={s.title}>Phonebook</h1>

          <ContactForm onSubmit={onSubmitName} />

          <h2 className={s.title}>Contacts</h2>

          <Filter onChangeValue={onFilterValueChange} filter={filter} />

          <ContactList
            filterContactsList={filterResult}
            onClickDel={deleteContact}
          />
        </div>
      </section>
    </main>
  );
};

export default App;
