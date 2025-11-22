import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';

// Шлях до файлу contacts.json
const contactsPath = path.join('db', 'contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    // Якщо файл не знайдено, повертаємо порожній масив
    if (err && err.code === 'ENOENT') return [];
    throw err;
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(c => String(c.id) === String(contactId));
  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(c => String(c.id) === String(contactId));
  if (index === -1) return null;
  const [removed] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removed;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const id = typeof randomUUID === 'function'
    ? randomUUID()
    : Date.now().toString() + Math.random().toString(36).slice(2, 8);

  const newContact = { id, name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

async function updateContact(contactId, updatedFields) {
    const contacts = await listContacts();
    const index = contacts.findIndex(c => String(c.id) === String(contactId));
    if (index === -1) return null;

    const updatedContact = { ...contacts[index], ...updatedFields };
    contacts[index] = updatedContact;
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return updatedContact;
}

export { listContacts, getContactById, removeContact, addContact, updateContact };