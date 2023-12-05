import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

const Mensaje = mongoose.model('Mensaje', messageSchema);

export default Mensaje;
