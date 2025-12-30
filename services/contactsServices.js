import Contact from '../models/Contact.js';

async function listContacts(userId, page = 1, limit = 20, favorite) {
  const offset = (page - 1) * limit;
  const where = { owner: userId };
  
  if (favorite !== undefined) {
    where.favorite = favorite === 'true';
  }
  
  return await Contact.findAll({ 
    where,
    limit,
    offset
  });
}

async function getContactById(contactId, userId) {
  return await Contact.findOne({ where: { id: contactId, owner: userId } });
}

async function removeContact(contactId, userId) {
  const contact = await Contact.findOne({ where: { id: contactId, owner: userId } });
  if (!contact) return null;
  
  await contact.destroy();
  return contact;
}

async function addContact(name, email, phone, userId) {
  return await Contact.create({ name, email, phone, owner: userId });
}

async function updateContact(contactId, updatedFields, userId) {
  const contact = await Contact.findOne({ where: { id: contactId, owner: userId } });
  if (!contact) return null;

  await contact.update(updatedFields);
  return contact;
}

async function updateStatusContact(contactId, body, userId) {
  const contact = await Contact.findOne({ where: { id: contactId, owner: userId } });
  if (!contact) return null;

  await contact.update({ favorite: body.favorite });
  return contact;
}

export { listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact };