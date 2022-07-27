const axios = require('axios')
const { Seller, Beer } = require('../db.js')

async function postSellers(req, res, next) {
  const { name, description, mail, password, dni } = req.body;
  try {
    let newSeller = await Seller.create(
      {
        name,
        description,
        mail,
        password,
        dni
      },
      {
        fields: ["name", "description", "mail", "password", "dni"],
      }
    );
    return res.json(newSeller);
  } catch (error) {
    next(error)
  }
}

async function getAllSellers(req, res, next) {
  const { name } = req.query
  try {
    const sellers = await axios.get('https://beerland-42137-default-rtdb.firebaseio.com/seller/sellers.json')
    const sellersData = sellers.data
    await sellersData.forEach((b) => {
      Seller.findOrCreate({
        where: {
          id:b.id,
          name: b.name ? b.name : "It does not contain name",
          description: b.description ? b.description : "It does not contain description",
          mail: b.mail,
          image: b.image ? b.image : "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",
          dni: b.dni
        },
        order:[['id','ASC']]
      })
    })
    const sellersDb = await Seller.findAll()
    if (name) {
      let SellerName = sellersDb.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
      SellerName.length ?
        res.status(200).json(SellerName) :
        res.status(404).send('Seller not found');
    } else {
      const sellersDb = await Seller.findAll()
      res.status(200).send(sellersDb)
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllSellers,
  postSellers
}