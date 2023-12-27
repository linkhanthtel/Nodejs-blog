const express = require('express')
const Article = require('./models/article')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const articleRouter = require('./routes/article')
const app = express()

mongoose.connect('mongodb+srv://linkhanthtel:mynameislin@cluster0.5u2my18.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req,res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', {articles : articles})
})

app.use('/articles', articleRouter)

app.listen(3000, () => {
    console.log('Listening to port 3000')
})