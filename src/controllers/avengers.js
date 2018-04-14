const model = require('../models/avengers')

function getAll(req, res, next){
  const avengers = model.getAll()
  return res.status(200).send({ data: avengers.data })
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
  if(!req.body.name){
    return next({ status: 400, message:'Bad Request'})
  }
  const avenger = model.create(req.body.name)
  if(avenger.data){
    return res.status(201).send({ data: avenger.data })
  }
}

function update(req, res, next){
  if(!req.body.name){
    return next({ status: 400, message: "Bad Request" })
  }
  const avenger = model.update(req.params.id, req.body.name)
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
