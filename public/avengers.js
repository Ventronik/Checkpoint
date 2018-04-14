document.querySelector('form.getAll').addEventListener('submit', function(event){
  event.preventDefault()

  const display = document.querySelector('.displayallavengers')

  axios.get('http://localhost:3000/avengers')
  .then(function(response){
    const avengers = response.data.data

    display.innerHTML = `<code>${JSON.stringify(avengers)}</code>`
  })

})

document.querySelector('form.getOne').addEventListener('submit', function(event){
  event.preventDefault()

  const avengerId = event.target.avengerId.value
  const display = document.querySelector('.displayoneavenger')

  axios.get(`http://localhost:3000/avengers/${avengerId}`)
  .then(function(response){
    const avenger = response.data.data

    display.innerHTML = `<code>${JSON.stringify(avenger)}</code>`
  })
  .catch(function(error){
    const { status, message } = error.response.data
    display.innerHTML = `<code>${status} - ${message}</code>`
  })
})

document.querySelector('form.create').addEventListener('submit', function(event){
  event.preventDefault()

  const avengerName = event.target.avengerName.value
  const display = document.querySelector('.createavenger')

  axios.post('http://localhost:3000/avengers',{name: avengerName})
  .then(function(response){
    const avenger = response.data.data

    display.innerHTML = `<code>${JSON.stringify(avenger)}</code>`
  })
  .catch(function(error){
    const { status, message } = error.response.data
    display.innerHTML = `<code>${status} - ${message}</code>`
  })
})

document.querySelector('form.update').addEventListener('submit', function(event){
  event.preventDefault()

  const avengerId = event.target.avengerId.value
  const avengerName = event.target.avengerName.value
  const display = document.querySelector('.updateavenger')

  axios.put(`http://localhost:3000/avengers/${avengerId}`,{name: avengerName})
  .then(function(response){
    const avenger = response.data.data

    display.innerHTML = `<code>${JSON.stringify(avenger)}</code>`
  })
  .catch(function(error){
    const { status, message } = error.response.data

    display.innerHTML = `<code>${status} - ${message}</code>`
  })
})

document.querySelector('form.delete').addEventListener('submit', function(event){
  event.preventDefault()

  const avengerId = event.target.avengerId.value
  const display = document.querySelector('.deleteavenger')

  axios.delete(`http://localhost:3000/avengers/${avengerId}`)
  .then(function(response){
    const avenger = response.data.data

    display.innerHTML = `<code>${JSON.stringify(avenger)}</code>`
  })
  .catch(function(error){
    const { status, message } = error.response.data

    display.innerHTML = `<code>${status} - ${message}</code>`
  })
})
