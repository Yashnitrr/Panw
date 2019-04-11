const app = require('express')();
const bodyParser = require('body-parser')
const db = require('./db');

app.use(bodyParser.json())

app.get('/ping', (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'Express application is live and running'
    });
});


app.get('/users', async (req, res) => {
    var users = [];
    try {
        users = await db.getAllFromHash('users');
    } catch (error) {
        console.log(error);
    }
    return res.status(200).json({
        success: true,
        data: users,
        message: 'Successfully Fetched User List'
    });
});

app.get('/users/:email', async (req, res) => {
    let user = {}
    try {
        user = await db.getFromHash('users', req.params.email);
    } catch (error) {
       console.log(error); 
    }
    
    return res.status(200).json({
        success: true,
        data: user,
        message: 'Successfully Fetched User'
    });
});

app.post('/users', (req, res) => {
    db.addToHash('users', req.body.email, req.body.name)
    return res.status(200).json({
        success: true,
        message: 'Successfully Added User'
    });
});

app.listen(3000, () => {
    console.log("Express Application is running on port 3000")
});