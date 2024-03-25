import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    require: true,
    validate: {
        validator: (value)=>{
            const pattern = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i
            return pattern.test(value)
        }
    }
  },
  password: {
    type: String,
    trim: true,
    require: true,
    validate: {
        validator: (value)=>{
            const pattern = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/
            return pattern.test(value)
        }
    }
  },
  role: {
    type: String,
    trim: true,
    require: true,
  },
  nombreUsuario: {
    type: String,
    required: true,
    unique: true,
    minLength: 4,
    maxLength: 15
  },
});

export const Usuario = mongoose.model('usuario', usuarioSchema);