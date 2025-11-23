import { listContacts, getContactById, removeContact, addContact, updateContact as putContact, updateStatusContact } from "../services/contactsServices.js";

export const getAllContacts = (req, res) => {
    return listContacts().then(contacts => res.json(contacts));
};

export const getOneContact = (req, res) => {
    const { id } = req.params;
    return getContactById(id).then(contact => {
        if (!contact) {
            return res.status(404).json({ message: "Not found" });
        }
        return res.json(contact);
    });
};

export const deleteContact = (req, res) => {
    const { id } = req.params;
    return removeContact(id).then(removedContact => {
        if (!removedContact) {
            return res.status(404).json({ message: "Not found" });
        }
        return res.json(removedContact);
    });
};

export const createContact = (req, res) => {
    const { name, email, phone } = req.body;
    return addContact(name, email, phone).then(newContact => {
        return res.status(201).json(newContact);
    });
};

export const updateContact = (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    return putContact(id, { name, email, phone }).then(updatedContact => {
        if (!updatedContact) {
            return res.status(404).json({ message: "`Not found" });
        }
        return res.json(updatedContact);
    });
};

export const updateContactFavorite = (req, res) => {
    const { contactId } = req.params;

    return updateStatusContact(contactId, req.body).then(updatedContact => {
        if (!updatedContact) {
            return res.status(404).json({ message: "Not found" });
        }
        return res.json(updatedContact);
    });
};
