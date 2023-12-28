import { useState, useEffect } from "react";
import personService from "./services/persons";

const Name = ({ person, deletePerson }) => {
  return (
    <div>
      {person.name} {person.number} {""}
      <button onClick={deletePerson}>delete</button>
    </div>
  );
};

const Filter = ({ searchTerm, setSearchTerm }) => {
  return (
    <div>
      filter shown with{" "}
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

const PersonForm = ({
  addName,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, searchTerm, deletePerson }) => {
  return (
    <div>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((person) => (
          <Name
            key={person.name}
            person={person}
            deletePerson={() => deletePerson(person.id)}
          />
        ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState(null);
  const [errorMessages, setErrorMessages] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialList) => {
      setPersons(initialList);
    });
  }, []);

  console.log("render", persons.length, "people");

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };
    const existingPerson = persons.find((person) => person["name"] === newName);

    if (existingPerson) {
      if (existingPerson.number != newNumber) {
        if (
          confirm(
            `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
          ) === true
        ) {
          const changedPerson = { ...existingPerson, number: newNumber };
          personService
            .update(existingPerson.id, changedPerson)
            .then((returnedList) => {
              setPersons(
                persons.map((person) =>
                  person.id === returnedList.id ? returnedList : person
                )
              );
            })
            .catch((error) => {
              setErrorMessages(
                `Information of ${existingPerson.name} has already been removed from the server`
              );
              setTimeout(() => {
                setErrorMessages(null);
              }, 5000);
            });
        }
      } else {
        alert(`${newName} is already added to phonebook`);
      }
    } else {
      personService.create(nameObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setMessages(`Successfully added ${newName}`);
        setTimeout(() => {
          setMessages(null);
        }, 3000);
      });
    }
  };

  const deletePerson = (id) => {
    const person = persons.find((n) => n.id === id);
    console.log(person);
    if (confirm(`Delete ${person.name} ?`) === true) {
      personService.delPerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const Notification = ({ message, errorMessages }) => {
    if (message !== null) {
      return <div className="successful">{message}</div>;
    } else if (errorMessages !== null) {
      setMessages(null);
      return <div className="error">{errorMessages}</div>;
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={messages} errorMessages={errorMessages} />
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <h3>Add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        searchTerm={searchTerm}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
