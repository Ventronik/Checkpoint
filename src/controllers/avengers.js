const model = require('../models/avengers')

function getAll(req, res, next){
  const avengers = model.getAll()
  return res.status(200).send({ avengers: avengers.data })
}

function getOne(req, res, next){
  const avenger = model.getOne(req.params.id)
  if(avenger.data){
    return res.status(200).send({ data: avenger.data })
  }
  else if(avenger.error){
    return next({ status: 404, message: avenger.error })
  }
}

function create(req, res, next){
  console.log(req.body)
  if(!req.body.name){
    return next({ status: 400, message:'New characters must have a name'})
  }
  if(!req.body.weapon){
    return next({ status: 400, message:'New Characters must have a weapon'})
  }

  const avenger = model.create(req.body)
  if(avenger.data){
    return res.status(201).send({ data: avenger.data })
  } else if (avenger.error) {
    return next({status: 400, message: "Unable to create Avenger."})
  }
}

function update(req, res, next){
  if(!req.body){
    return next({ status: 400, message: "No value provided to replace existing value" })
  }
  const avenger = model.update(req.params.id, req.body)
  if(avenger.data){
    return res.status(200).send({ data: avenger.data })
  }
  else if(avenger.error) {
    return next({ status: 404, message: avenger.error })
  }
}

function remove(req, res, next){
  const avenger = model.remove(req.params.id)
  if(avenger.data){
    return res.status(200).send({ data: avenger.data })
  }
  else if(avenger.error){
      return next({ status: 404, message: avenger.error })
  }
}

module.exports = { getAll, getOne, create, update, remove }
