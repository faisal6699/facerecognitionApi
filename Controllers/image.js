
const Clarifai = require('clarifai');


const app = new Clarifai.App({
    apiKey: '3c9ff967279b42138e1716361b163e85'
   });


const handleApicall = (req,res) => {
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then( data => {
            res.json(data)
      })
      .catch(err => res.status(400).json('Unable to work with API'))

}


const handleImage = (req,res,db) => {
    const { id } = req.body;

    db('users').where({id})
    .increment('entries',1)
    .returning('entries')
    .then(entries => res.json(entries[0]))
    .catch(err => res.status(400).json('unable to update entries'))


}

module.exports = {
    handleImage,
    handleApicall
}