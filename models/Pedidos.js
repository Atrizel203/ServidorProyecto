const mongoose= require('mongoose');
const Schema = mongoose.Schema

const pedidosSchema = new Schema({

    cliente:{
        type:Schema.ObjectId,
        ref:'Clientes'
    },
    pedido:[{
        producto:{
           type: Schema.ObjectId,
           ref:'Productos'
        },
        cantidad:Number
    }],
    total:{
        type:Number
    }
})

exports.nuevoPedido = (req, res) => {
    const pedido = new Pedido(req.body);

    pedido.save((error, pedidoGuardado) => {
        if (error) res.json({error});

        // Emitir el evento 'nuevo pedido'
        io.emit('nuevo pedido', pedidoGuardado);

        res.json({pedido: pedidoGuardado});
    });
};

module.exports = mongoose.model('Pedidos',pedidosSchema);