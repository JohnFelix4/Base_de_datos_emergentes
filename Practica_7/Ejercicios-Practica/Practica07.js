use ventas_online

// 1
db.ventas.aggregate([
    {
        $project: {
            _id: 0,
            venta_id: 1,
            cliente_id: 1,
            fecha: 1,
            total: 1
        }
    }
])

// 2
db.ventas.aggregate([
    {
        $project: {
            venta_id: 1,
            total: 1,
            iva_estimado: {
                $multiply: ["$total", 0.16]
            }
        }
    }
])

// 3
db.ventas.aggregate([
    {
        $project: {
            venta_id: 1,
            fecha: 1,
            anio: {
                $year: "$fecha"
            }
        }
    }
])

// 4
db.ventas.aggregate([
    {
        $project: {
            venta_id: 1,
            fecha: 1,
            mes: {
                $month: "$fecha"
            }
        }
    }
])

// 5
db.ventas.aggregate([
    {
        $project: {
            venta_id: 1,
            fecha: 1,
            anio: {
                $year: "$fecha"
            },
            mes: {
                $month: "$fecha"
            },
            total: 1
        }
    }
])

// 6
db.ventas.aggregate([
    {
        $group: {
            _id: {
                anio: {
                    $year: "$fecha"
                },
                mes: {
                    $month: "$fecha"
                }
            }
        }
    }
])

// 7
db.ventas.aggregate([
    {
        $group: {
            _id: {
                anio: {
                    $year: "$fecha"
                },
                mes: {
                    $month: "$fecha"
                }
            },
            cantidad_ventas: {
                $sum: 1
            }
        }
    }
])

// 8
db.ventas.aggregate([
    {
        $group: {
            _id: {
                anio: {
                    $year: "$fecha"
                },
                mes: {
                    $month: "$fecha"
                }
            },
            ingreso_total: {
                $sum: "$total"
            }
        }
    }
])

// 9
db.ventas.aggregate([
    {
        $unwind: "$items"
    }
])

// 10
db.ventas.aggregate([
    {
        $unwind: "$items"
    },
    {
        $project: {
            _id: 0,
            venta_id: 1,
            sku: "$items.sku",
            cantidad: "$items.cantidad",
            precio: "$items.precio"
        }
    }
])

// 11
db.ventas.aggregate([
    {
        $unwind: "$items"
    },
    {
        $group: {
            _id: "$items.sku",
            unidades_vendidas: {
                $sum: "$items.cantidad"
            }
        }
    }
])

// 12
db.ventas.aggregate([
    {
        $unwind: "$items"
    },
    {
        $group: {
            _id: "$items.sku",
            unidades_vendidas: {
                $sum: "$items.cantidad"
            }
        }
    },
    {
        $sort: {
            unidades_vendidas: -1
        }
    }
])

// 13
db.ventas.aggregate([
    {
        $unwind: "$items"
    },
    {
        $project: {
            _id: 0,
            venta_id: 1,
            sku: "$items.sku",
            ingreso: {
                $multiply: [
                    "$items.cantidad",
                    "$items.precio"
                ]
            }
        }
    }
])

// 14
db.ventas.aggregate([
    {
        $unwind: "$items"
    },
    {
        $group: {
            _id: "$items.sku",
            ingreso_total: {
                $sum: {
                    $multiply: [
                        "$items.cantidad",
                        "$items.precio"
                    ]
                }
            }
        }
    },
    {
        $sort: {
            ingreso_total: -1
        }
    },
    {
        $limit: 5
    }
])

// 15
db.ventas.aggregate([
    {
        $unwind: "$items"
    },
    {
        $group: {
            _id: "$items.sku",
            unidades_vendidas: {
                $sum: "$items.cantidad"
            }
        }
    },
    {
        $sort: {
            unidades_vendidas: -1
        }
    },
    {
        $limit: 10
    }
])

// 16
db.ventas.aggregate([
    {
        $match: {
            estado: "completada"
        }
    },
    {
        $unwind: "$items"
    },
    {
        $group: {
            _id: "$items.sku",
            unidades_vendidas: {
                $sum: "$items.cantidad"
            }
        }
    }
])

// 17
db.ventas.aggregate([
    {
        $match: {
            estado: "completada"
        }
    },
    {
        $group: {
            _id: {
                anio: {
                    $year: "$fecha"
                },
                mes: {
                    $month: "$fecha"
                }
            },
            ingreso_total: {
                $sum: "$total"
            }
        }
    }
])

// 18
db.ventas.aggregate([
    {
        $unwind: "$items"
    },
    {
        $group: {
            _id: null,
            total_unidades: {
                $sum: "$items.cantidad"
            }
        }
    }
])

// 19
db.ventas.aggregate([
    {
        $unwind: "$items"
    },
    {
        $group: {
            _id: "$items.sku",
            unidades_vendidas: {
                $sum: "$items.cantidad"
            }
        }
    },
    {
        $group: {
            _id: null,
            promedio_unidades: {
                $avg: "$unidades_vendidas"
            }
        }
    }
])

// 20
db.ventas.aggregate([
    {
        $match: {
            estado: "completada"
        }
    },
    {
        $unwind: "$items"
    },
    {
        $group: {
            _id: "$items.sku",
            ingreso_total: {
                $sum: {
                    $multiply: [
                        "$items.cantidad",
                        "$items.precio"
                    ]
                }
            }
        }
    },
    {
        $sort: {
            ingreso_total: -1
        }
    }
])