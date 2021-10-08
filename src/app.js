const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const path = require('path')
const hbs = require('hbs')
const express = require('express')
const { response } = require('express')
//Documentation: expressjs.comhttps://expressjs.com/en/4x/api.html

const app = express()

//Define paths for Express config
const path_public = path.join(__dirname, '../public')
const view_path = path.join(__dirname, '../templates/views')
const partials_path = path.join(__dirname, '../templates/partials')

//Setup handlebars (hbs) and views(= templates) location
app.set('view engine','hbs')
app.set('views', view_path)
hbs.registerPartials(partials_path)

//Setup static directory to serve
//You would put the HTML files at the public folder
//You'd have to write <name>.html at the browser
app.use(express.static(path_public))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'objects really help us out',
        real_name: 'Ana'
    })
})

//Esse primeiro about serva pra dizer o que o usuário digitou!
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'How to put up an image',
        name : 'Ana ;)',
        real_name: 'Ana'
    }) //Esse about é pra indicar o arquivo que queremos acessar 
})

app.get('/help', (req,res) => {
    res.render ('help', {
        title: 'Do you need help?',
        name: 'Well, then youre in the right place :D ',
        real_name: 'Ana'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address was given'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast (latitude, longitude, (error, castData) => {
            if (error) {
                return res.send({error}) 
            }
            res.send({
                forecast: castData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Pass a search term!'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404 Cant help what cant be saved',
        errorMessage: 'Help page not founded',
        real_name: 'Ana'
    })
})

app.get('*', (req, res )=> {
    res.render('404', {
        title: '404 Generic',
        errorMessage: 'Wrong url >:(',
        real_name: 'Ana'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})