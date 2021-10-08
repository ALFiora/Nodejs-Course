
const weatherForm = document.querySelector('form')
const userSearch = document.querySelector('input')
const messageOne = document.querySelector('#message1') //Paragraph ID
const messageTwo = document.querySelector('#message2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault() //Vai impedir que a página recarregue sozinha
    const location = userSearch.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
            messageOne.textContent = data.location

            description = 'Today is ' + data.forecast.description + '.'
            temperature = 'The temperature is ' + data.forecast.temperature + '.'
            feelslike = 'And it feelslike ' + data.forecast.feelslike + '.'
            humidity = 'The humidity is ' + data.forecast.humidity + '.'
            messageTwo.textContent = description + temperature + feelslike + humidity
            }
        })
    })// .catch((reject) => {
    //     reject.json().then((data) => {
    //         console.log(data.error)
    //     })
    // })

})
