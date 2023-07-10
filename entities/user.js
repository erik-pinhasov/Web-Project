// Represents the User entity in the app

class User {
  constructor(user) {
    // Initialize user properties
    this.id = user.id;
    this.name = user.username;
    this.email = user.email;
    this.letter = user.username.charAt(0);
  }
}
module.exports = User;
