```text
use ventas_online

show collections

db.productos.countDocuments()

db.createCollection("clientes")

db.createCollection("proveedores")

db.createCollection("ventas")

show collections

db.clientes.insertOne({
    cliente_id: "C001",
    nombre: "Ana Lopez",
    correo: "ana.lopez@email.com",
    telefono: "6671234567",
    direccion: {
        calle: "Alvaro Obregon",
        numero: 120,
        ciudad: "Culiacan",
        estado: "Sinaloa",
        cp: "80000"
    },
    preferencias: [
        "tecnologia",
        "electronica"
    ],
    activo: true
})

db.clientes.findOne({
    cliente_id: "C001"
})

db.clientes.find(
    {
        cliente_id: "C001"
    },
    {
        _id: 0,
        nombre: 1,
        "direccion.ciudad": 1
    }
)

db.clientes.insertOne({
    cliente_id: "C002",
    nombre: "Carlos Martinez",
    correo: "carlos@email.com",
    telefono: "6672345678",
    direccion: {
        ciudad: "Mazatlan",
        estado: "Sinaloa",
        cp: "82000"
    },
    preferencias: [
        "computacion",
        "accesorios",
        "audio"
    ],
    activo: true
})

db.clientes.find(
    {
        preferencias: "accesorios"
    },
    {
        _id: 0,
        cliente_id: 1,
        nombre: 1
    }
)

cls
clear

db.clientes.findOne({
    cliente_id: "C001"
})

db.clientes.find(
    {
        cliente_id: "C001"
    },
    {
        _id: 0,
        nombre: 1,
        "direccion.ciudad": 1
    }
)

db.clientes.find(
    {
        preferencias: "accesorios"
    },
    {
        _id: 0,
        cliente_id: 1,
        nombre: 1
    }
)
```
