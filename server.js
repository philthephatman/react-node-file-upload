const express = require('express'),
  multer = require('multer'),
  cors = require('cors');

const app = express();
app.use(cors());

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

// var upload = multer({ storage: storage }).single('file')
var upload = multer({ storage: storage }).array('file')
app.post('/upload',function(req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }
    return res.status(200).send(req.file)
  })
});

app.listen(8000, function() {
  console.log('App running on port 8000');
});
