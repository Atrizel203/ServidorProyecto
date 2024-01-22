const mongoose= require('mongoose');
const Schema = mongoose.Schema

const clienteSchema = new Schema({
    nombre:{
        type:String,
        trim:true,
    },
    apellido:{
        type:String,
        trim:true,
    },
    empresa:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        lowercase:true,
    },
    telefono:{
        type:String,
        trim:true,
    }
});

exports.nuevoCliente = (req, res) => {
    const cliente = new Cliente(req.body);

    cliente.save((error, clienteGuardado) => {
        if (error) res.json({error});

        // Emitir el evento 'nuevo cliente'
        io.emit('nuevo cliente', clienteGuardado);

        res.json({cliente: clienteGuardado});
    });
};

module.exports = mongoose.model('Clientes',clienteSchema);