const sqlite3 = require("sqlite3").verbose()

const DEMO_PRODUCTS = [
  {
      brand: 'Apple',
      model: 'iPhone 13',
      os: 'iOS 15.0',
      screensize: 6,
      image: 'https://i.cdn.nrholding.net/63563528/1000/1000'
  },
  {
      brand: 'Apple',
      model: 'MacBook Pro 14',
      os: 'macOS 11.6',
      screensize: 14,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgSxgpT72SixqlSOnoSaoyaGmRethsjDBfXQ&usqp=CAU'
  },
  {
      brand: 'Samsung',
      model: 'Galaxy S21 Ultra',
      os: 'Android 11',
      screensize: 7,
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/GalaxyS21.png/440px-GalaxyS21.png'
  },
  {
      brand: 'Apple',
      model: 'Watch Series 7',
      os: 'watchOS 8.3',
      screensize: 2,
      image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MKUQ3_VW_PF+watch-45-alum-midnight-nc-7s_VW_PF_WF_CO?wid=1400&hei=1400&trim=1,0&fmt=p-jpg&qlt=95&.v=1632171068000,1631661680000'
  },
  {
      brand: 'Microsoft',
      model: 'Surface Laptop 4',
      os: 'Windows 11',
      screensize: 15,
      image: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWBrzy?ver=85d4&q=90&m=6&h=270&w=270&b=%23FFFFFFFF&f=jpg&o=f&aim=true'
  }
]

let db = new sqlite3.Database("./private/api.db", err => {
    db.serialize(function () {
        DEMO_PRODUCTS.forEach(product => {
            const { brand, model, os, screensize, image } = product
            const query = `INSERT INTO products (brand, model, os, screensize, image)
            VALUES ('${brand}', '${model}', '${os}', ${screensize ? parseInt(screensize) : null}, '${image || null}')`
            db.run(query)
        })
    })
})