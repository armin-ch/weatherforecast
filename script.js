//let key = '7737f57b4924159f2e353b4654856253'
let savedCity = JSON.parse(localStorage.getItem('saved')) || []
for (let i=0; i<savedCity.length; i++){
  $('#hist').append(`<div data-value='${savedCity[i]}' class="border row align-items-start"><h3>${savedCity[i]}</h3></div>`)
}
document.getElementById('search').addEventListener('click', function (event) {
  event.preventDefault()
  $('#main').html('<h1></h1>')
  let alreadyExists = false
  let city = document.getElementById('city').value 
  for (let i = 0; i < savedCity.length; i++) {
    if (city == savedCity[i]) {alreadyExists = true}
  }
  if (alreadyExists == false){
  savedCity.push(city)
  }
  localStorage.setItem('saved', JSON.stringify(savedCity))
  let date = new Date()
  $('h1').append(city + ` (${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()})`)
  axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=7737f57b4924159f2e353b4654856253`)
  .then(res => {
    console.log(res.data)
    $('#main').append(`<p>Temperature: ${res.data.main.temp} F</p>
    <p>Humidity: ${res.data.main.humidity}%</p>
    <p>Wind Speed: ${res.data.wind.speed} MPH</p>
    <p>Feels Like: ${res.data.main.feels_like} F</p>
    `)
    document.getElementById('city').value = ''
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${res.data.coord.lat}&lon=${res.data.coord.lon}&units=imperial&appid=7737f57b4924159f2e353b4654856253`)
    .then(res2=>{
      console.log(res2.data)
      $('#main').append(`
     <h2>5-Day Forecast</h2>
     <div class="container">
     <div class="row">
    <div class="col-sm-4">${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}
    </div>
    <div class="col-sm-4">Column</div>
    <div class="col-sm-4">Column</div>
    <div class="col-sm-4">Column</div>
  </div>
</div>

    `)
    })
    .catch(err => console.error(err))
  })
    .catch(err => console.error(err))
})

// $('#search').click(displayForecast())
// function displayForecast() {
//   axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=7737f57b4924159f2e353b4654856253`)
//     .then(res => {
//       console.log(res.data)
//       $('#main').append(`<p>Temperature: ${res.data.main.temp} F</p>
//     <p>Humidity: ${res.data.main.humidity}%</p>
//     <p>Wind Speed: ${res.data.wind.speed} MPH</p>
//     <p>Feels Like: ${res.data.main.feels_like} F</p>
//     `)
//       document.getElementById('city').value = ''
//     })
//     .catch(err => console.error(err))
// })
  
// }