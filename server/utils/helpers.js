// helper function for generating a random string
export const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
};

// helper function for formatting dates
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
};

// helper function for validating email addresses
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// helper function for connecting to a database
export const connectDatabase = async () => {
    // Implementation for connecting to the database
    console.log("Database connected");
};
