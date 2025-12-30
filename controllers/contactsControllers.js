import { listContacts, getContactById, removeContact, addContact, updateContact as putContact, updateStatusContact } from "../services/contactsServices.js";

export const getAllContacts = (req, res) => {
    const userId = req.user.id;
    const { page = 1, limit = 20, favorite } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    return listContacts(userId, pageNum, limitNum, favorite).then(contacts => res.json(contacts));
};

export const getOneContact = (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    return getContactById(id, userId).then(contact => {
        if (!contact) {
            return res.status(404).json({ message: "Not found" });
        }
        return res.json(contact);
    });
};

export const deleteContact = (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    return removeContact(id, userId).then(removedContact => {
        if (!removedContact) {
            return res.status(404).json({ message: "Not found" });
        }
        return res.json(removedContact);
    });
};

export const createContact = (req, res) => {
    const { name, email, phone } = req.body;
    const userId = req.user.id;
    return addContact(name, email, phone, userId).then(newContact => {
        return res.status(201).json(newContact);
    });
};

export const updateContact = (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const userId = req.user.id;

    return putContact(id, { name, email, phone }, userId).then(updatedContact => {
        if (!updatedContact) {
            return res.status(404).json({ message: "`Not found" });
        }
        return res.json(updatedContact);
    });
};

export const updateContactFavorite = (req, res) => {
    const { contactId } = req.params;
    const userId = req.user.id;

    return updateStatusContact(contactId, req.body, userId).then(updatedContact => {
        if (!updatedContact) {
            return res.status(404).json({ message: "Not found" });
        }
        return res.json(updatedContact);
    });
};
