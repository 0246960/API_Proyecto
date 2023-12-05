import Mensajes from '../models/mensajesModel.js';

export const getMensajes = async (req, res) => {
    try {
        // Get all users from the database
        const mensajes = await Mensajes.find();
    
        // Send a response to the client
        res.status(200).json(mensajes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching messages' });
    }
    }
export const getMensajeById = async (req, res) => {
    try {
        const { id } = req.params;
    
        // Search for a user by their ID in the database
        const mensaje = await Mensajes.findById(id);
        if (!mensaje) {
            return res.status(404).json({ message: 'Message not found' });
        }
    
        // Send a response to the client
        res.status(200).json(mensaje);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while obtaining the message' });
    }
    }
export const createMensaje = async (req, res) => {
    try {
        const { name, email, message } = req.body;
    
        // Create a new user 
        const newMensaje = new Mensajes({ name, email, message });
        await newMensaje.save();
    
        // Send a response to the client
        res.status(201).json(newMensaje);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating the message' });
    }
    }
export const updateMensaje = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, message } = req.body;
    
        // Search for a user by their ID in the database
        const mensaje = await Mensajes.findById(id);
        if (!mensaje) {
            return res.status(404).json({ message: 'Message not found' });
        }
    
        // Update user email and password
        if (name) mensaje.name = name;
        if (email) mensaje.email = email;
        if (message) mensaje.message = message;
        await mensaje.save();
    
        // Send a response to the client
        res.status(200).json(mensaje);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating the message' });
    }
    }

export const deleteMensaje = async (req, res) => {
    try {
        const { id } = req.params;
    
        // Search for a user by their ID in the database
        const mensaje = await Mensajes.findById(id);
        if (!mensaje) {
            return res.status(404).json({ message: 'Message not found' });
        }
    
        // Delete user from database
        await mensaje.remove();
    
        // Send a response to the client
        res.status(200).json(mensaje);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting the message' });
    }
    }

