import User from '../models/userModel.js';

export const getUsers = async (req, res) => {
  try {
    // Get all users from the database
    const users = await User.find();

    // Send a response to the client
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al obtener los usuarios' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Search for a user by their ID in the database
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Send a response to the client
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al obtener el usuario' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;

    // Search for a user by their ID in the database
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Update user email and password
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    await user.save();

    // Send a response to the client
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al actualizar el usuario' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Search for a user by their ID in the database
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Delete user from database
    await user.remove();

    // Send a response to the client
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al eliminar el usuario' });
  }
};
