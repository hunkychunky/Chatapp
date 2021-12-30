const PORT = 8000;
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { v1:uuidv1 } = require('uuid');
const { connect } = require('getstream');
const Streamchat = require('stream-chat');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/signup', async (req, res) => {
    try {
        const { username, password} = req.body;
        // console.log(username, password);
        const hashedPassword = await bcrypt.hash(password, 10);
        const userID = uuidv1();
        const client = connect(process.env.API_KEY, process.env.API_SECRET, process.env.API_ID);
        const token = client.createUserToken(userID);

        res.status(200).json({username, userID, hashedPassword, token});

        console.log(username, password);

    } catch (error){
        console.log(error);
        res.status(500).json({message: error})
    }
})

app.post('/login', async (req, res) => {
    try {
        const { username, password} = req.body;
        // console.log(username, password);
        const client = connect(process.env.API_KEY, process.env.API_SECRET, process.env.API_ID);
        const chatClient = Streamchat.getInstance(process.env.API_KEY, process.env.API_SECRET);
        const {users} = await chatClient.queryUsers({ name: username});


        if(!users.length) 
        return res.json(400).json({message: 'User does not exist'})

        const success = bcrypt.compare(password, users[0].hashedPassword);
        const token = client.createUserToken(users[0].id);
        const confirmedName = users[0].name;
        const userId = user[0].id;
        
        if(success){
            res.json(200).json({ token, username, userId })
        } else {
            res.status(500).res.json({message: 'Login Failed'})
        }
        // console.log(username, password);

    } catch (error){
        console.log(error);
        res.status(500).json({message: error})
    }
})

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
})