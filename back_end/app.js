const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, function (err) {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})

app.use(cors({
    origin: 'https://fullstackrestaurant-frontend.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());



const uri = "mongodb+srv://atlasuserarun:Arun1234@cluster0.43njpnr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run(newUser) {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        
    } catch (err) {
        console.error("An error occurred while running the operations:", err);
    } 
}


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
});
const User = mongoose.model('User', userSchema);

const authenticateAPI = (request, response, next) => {
    let jwtToken;
    const authHeader = request.headers["authorization"];
    if (authHeader !== undefined) {
      jwtToken = authHeader.split(" ")[1];
    }
    if (jwtToken === undefined) {
      response.status(401);
      response.send("Invalid JWT Token");
    } else {
      jwt.verify(jwtToken, "MY_SECRET_KEY", async (error, payload) => {
        if (error) {
          response.status(401);
          response.send("Invalid JWT Token");
        } else {
          request.username = payload.username;
          next();
        }
      });
    }
  };

app.post('/signup', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        console.log(req.body)
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
            email,
        });

        await run();
        const database = client.db("Restaurant");
        const collection = database.collection("user");
        const user = await collection.findOne({ username })
        console.log(user)

        if (!user) {
            await collection.insertOne(newUser);
            //const documents = await collection.find({}).toArray();
            res.status(201).json({ message: 'User registered successfully' });
            await mongoose.connection.close();
            console.log("Connection closed.");
            console.log('rec')
        }else{
            res.status(401).json({ message: 'user already exist' });
            console.log('else')
        }



    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(req.body)

        run();
        const database = client.db("Restaurant");
        const collection = database.collection("user");
        const user = await collection.findOne({ username })
        console.log(user)
        await mongoose.connection.close();
        console.log("Connection closed.");

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        const payload = {
            username: username,
          };
          const jwtToken = jwt.sign(payload, "MY_SECRET_KEY");
          res.send({ jwtToken,message: 'Login successful',type:user.type });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/home", async (req, res) => {
    try{
        run();
        const database = client.db("Restaurant");
        const collection = database.collection("foodlist");
        const data = await collection.find().toArray();
        res.send(data);
        await mongoose.connection.close();
        console.log("Connection closed.");

    }catch(error){
        res.status(500).json({ error: error.message });
    }
    
})

app.get("/admin-panel", async (req,res)=>{
    try{
        run();
        const database = client.db("Restaurant");
        const userCollection = database.collection("user");
        const foodCollection = database.collection("foodlist");
        const userData = await userCollection.find().toArray();
        const foodData = await foodCollection.find().toArray();
        res.send({userData,
        foodData});
        await mongoose.connection.close();
        console.log("Connection closed.");

    }catch(error){
        res.status(500).json({ error: error.message });
    }
})

app.post("/admin-panel/make-admin",async (req,res)=>{
    const {username} = req.body;

    try {
        run();
        const database = client.db("Restaurant");
        const collection = database.collection("user");
        const user = await collection.updateOne(
            { "username": username },
            { "$set": { "type": "admin" } }
          )
        console.log(user)

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User type updated to admin successfully', user });
    } catch (error) {
        console.error('Error updating user type:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
})

app.post("/admin-panel/make-user",async (req,res)=>{
    const {username} = req.body;

    try {
        run();
        const database = client.db("Restaurant");
        const collection = database.collection("user");
        const user = await collection.updateOne(
            { "username": username },
            { "$set": { "type": "user" } }
          )
        console.log(user)

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User type updated to admin successfully', user });
    } catch (error) {
        console.error('Error updating user type:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
})


