const mongoose = require('mongoose')
const Product = require('../models/Product.model')

mongoose
  .connect('mongodb://localhost/backend',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })

  const products = [
    {
      name: 'Kombucha',
      flavour: 'menta',
      imageURL: 'https://res.cloudinary.com/drl9vgjbw/image/upload/v1614891230/curaSana/menta_gvbdvv.png',
      price: 80,
      measurement: '500 ml.'
    },
    {
      name: 'Kombucha',
      flavour: 'jengibre',
      imageURL: 'https://res.cloudinary.com/drl9vgjbw/image/upload/v1614891241/curaSana/jengibre_kufg7i.jpg',
      price: 80,
      measurement: '500 ml.'
    },
    {
      name: 'Kombucha',
      flavour: 'betabel',
      imageURL: 'https://res.cloudinary.com/drl9vgjbw/image/upload/v1614891258/curaSana/betabel_kpyce1.jpg',
      price: 80,
      measurement: '500 ml.'
    },
    {
      name: 'Kombucha',
      flavour: 'café',
      imageURL: 'https://res.cloudinary.com/drl9vgjbw/image/upload/v1614891249/curaSana/cafe_r1fnem.jpg',
      price: 80,
      measurement: '500 ml.'
    },
    {
      name: 'Kombucha',
      flavour: 'pétalos de rosa',
      imageURL: 'https://res.cloudinary.com/drl9vgjbw/image/upload/v1614892512/curaSana/petalos_de_rosa_kvsmyf.jpg',
      price: 80,
      measurement: '500 ml.'
    },
    {
      name: 'Queso',
      flavour: 'cúrcuma',
      imageURL: 'https://res.cloudinary.com/drl9vgjbw/image/upload/v1614892539/curaSana/queso_curcuma_guehzs.jpg',
      price: 150,
      measurement: '150 g.'
    },
    {
      name: 'Queso',
      flavour: 'paprika',
      imageURL: 'https://res.cloudinary.com/drl9vgjbw/image/upload/v1614892546/curaSana/queso_paprika_c8n9bn.jpg',
      price: 150,
      measurement: '150 g.'
    },
  ]

  Product.create(products)
    .then(productsFromDB => {
      console.log(`Created ${productsFromDB.length} products`)
      mongoose.connection.close()
    }).catch(err => console.log(`An error ocurred: ${err}`))