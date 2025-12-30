import User from './User.js';
import Contact from './Contact.js';

// Встановлення зв'язків між моделями
User.hasMany(Contact, {
  foreignKey: 'owner',
  onDelete: 'CASCADE',
});

Contact.belongsTo(User, {
  foreignKey: 'owner',
});

export { User, Contact };
