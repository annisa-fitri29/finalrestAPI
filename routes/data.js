const router = require('express').Router();
const verify = require('./verifyToken');
const Data = require('../model/datamhs')

// GET
router.get('/', async (req, res) => {
    try {
        const data = await Data.find()
        res.json(data)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})

// GET by id
router.get('/:id', getDataMhs, (req, res) => {
  res.json(res.data)
})

// POST
router.post('/', async (req, res) => {
    const data = new Data({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nim: req.body.nim,
      umur: req.body.umur,
      alamat: req.body.alamat
    })
    try {
      const newdata = await data.save()
      res.status(201).json(newdata)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
})

// PUT by id
router.put('/:id', verify, getDataMhs, async (req, res) => {
    if (req.body.firstName != null) {
      res.data.firstName = req.body.firstName
    }
    if (req.body.lastName != null) {
      res.data.lastName = req.body.lastName
    }
    if (req.body.nim != null) {
      res.data.nim = req.body.nim
    }
    if (req.body.umur != null) {
      res.data.umur = req.body.umur
    }
    if (req.body.alamat != null) {
      res.data.alamat = req.body.alamat
    }
    try {
      const updatedData = await res.data.save()
      res.json(updatedData)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

// DELETE
router.delete('/', verify, async (req, res) => {
  try{
    const deleteResult = await data.deleteMany({})
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        "success": true,
        "message":`berhasil menghapus ${deleteResult.n} dokumen`
    });
  }catch(err){
      res.status(500).json({ message: err.message })
  }
})
  
// DELETE by id
  router.delete('/:id', verify, getDataMhs, async (req, res) => {
    try {
      await res.data.remove()
      res.json({ message: 'Menghapus Data Mahasiswa' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

async function getDataMhs(req, res, next) {
    let data
    try {
      data = await Data.findById(req.params.id)
      if (data == null) {
        return res.status(404).json({ message: 'data tidak ditemukan' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.data = data
    next()
  }

module.exports = router;