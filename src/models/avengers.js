const fs = require('fs')
const path = require('path')
const shortid = require('shortid')


// data store
const file = path.join(__dirname, 'db.json')

function getAll(){
  const content = fs.readFileSync(file, 'utf-8')
  const avengers = JSON.parse(content)
  console.log(avengers)

  return { data: avengers }
}

function getOne(id){
  const content = fs.readFileSync(file, 'utf-8')
  const avengers = JSON.parse(content)


  const avenger = avengers.find(avenger => avenger.id === id)

  if(avenger) {
    return { data: avenger }
  }
  else {
    return { error: 'avenger Not Found'}
  }
}

function create(name){
  const content = fs.readFileSync(file, 'utf-8')
  console.log(req.body)
  const avengers = JSON.parse(content)
  //[]
  const avenger = { id: shortid.generate(), name }
  avengers.push(avenger)
  //[...]
  //write it
  const json = JSON.stringify(avengers)
  fs.writeFileSync(file, json)

  return { data: avenger }
}

function update(id, name){
  const avenger = avengers.find(avenger => avenger.id === id)

  if(avenger){
    avenger.name = name
    return { data: avenger}
  }
  else {
    return { error: 'avenger Not Found'}
  }
}

function remove(id){
  const content = fs.readFileSync(file, 'utf-8')
  let avengers = JSON.parse(content)
  let avenger = avengers.find(avenger => avenger.id === id)

  if(avenger){
    avengers = avengers.filter(avenger => avenger.id !== id)
    delete avenger.id
    const json = JSON.stringify(avengers)
    fs.writeFileSync(file, json)
    return { data: avenger}
  }
  else {
    return { error: "avenger Not Found"}
  }
}

module.exports = { getAll, getOne, create, update, remove }
