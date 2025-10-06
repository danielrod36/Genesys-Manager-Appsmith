export default {
  // Default tab for login/register (if using tabs)
  defaultTab: 'Sign In',

  // Set default tab (for UI)
  setDefaultTab: (newTab) => {
    this.defaultTab = newTab;
  },

  // Generate password hash using bcrypt
  generatePasswordHash: async () => {
    return dcodeIO.bcrypt.hashSync(inp_registerPassword.text, 10);
  },

  // Verify password hash
  verifyHash: async (password, hash) => {
    return dcodeIO.bcrypt.compareSync(password, hash);
  },

  // Create JWT token for authentication
  createToken: async (user) => {
    return jsonwebtoken.sign(user, 'secret', { expiresIn: 60 * 60 }); // Change 'secret' to a secure key in production
  },

  // Sign in function
  signIn: async () => {
    const password = LoginPassword.text;
    const [user] = await findUserByEmail.run();

    if (user && await this.verifyHash(password, user?.password_hash)) {
      // Store user data and token
      storeValue('token', await this.createToken(user));
      storeValue('user_email', user.email);
      storeValue('user_name', user.name || user.email); // Use name or fallback to email
      storeValue('user_role', user.role);
      storeValue('is_authenticated', true);
      
      // Update last login (optional)
      await updateLogin.run({ id: user.id });
      
      // Navigate to Mode Select
      navigateTo('Mode Select');
    } else {
      showAlert('Invalid email/password combination', 'error');
    }
  },

  // Register function
  register: async () => {
    const passwordHash = await this.generatePasswordHash();
    const [user] = await createUser.run({ passwordHash });
    
    if (user) {
      // Store user data and token
      storeValue('token', await this.createToken(user));
      storeValue('user_email', user.email);
      storeValue('user_name', user.name || user.email); // Use name or fallback to email
      storeValue('user_role', user.role);
      storeValue('is_authenticated', true);
      
      showAlert('Registration Successful', 'success');
      navigateTo('Mode Select');
    } else {
      showAlert('Error creating new user', 'error');
    }
  },

  // Authentication check for page loads
  checkAuth: () => {
    if (!appsmith.store.is_authenticated) {
      navigateTo('Login');
    }
  },

  // Optional: Logout function
  logout: () => {
    clearStore(); // Clears all stored values
    navigateTo('Login');
  }
}