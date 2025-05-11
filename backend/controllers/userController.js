const {query} = require('../config/db');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// Helper function to generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, 'examplesecret', { expiresIn: '30d' });
};

const signup = async (req,res) => {
    const{email, password} = req.body;
    if(!email || !password)
    {
        res.status(400);
        //throw new Error('Info not valid');
        res.json("not valid info");
        return;
    }
    //check if user exsists
    const userExsists = await query(`SELECT DISTINCT id FROM users WHERE email = $1`, [email]);
    if(userExsists.rowcount == 1){
        res.status(400);
        //error
        //throw new Error('User exsists');
        res.json(userExsists);
        return;
    }

    //Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password,salt);

    //create user
    const myquery = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id';
    const values = [email, hashedPassword];
    
    try{
        const newuser = await query(myquery,values);
        console.log(newuser.rows[0].id.toString());
        if (newuser.rows && newuser.rows[0]){
        res.status(201).json({
            email: email,
            token: generateToken(newuser.rows[0].id.toString())
        });
    }
    }
    catch(err){
        res.status(400);
        //error message
        //throw new Error('Error on Signup');;
        res.json("error on signup");
    }

    
};

const login = async (req,res) => {
    const {email, password} = req.body;

    if(!email || !password)
    {
        res.status(400).json("invalid info");
        //throw error 
    }
    
    //check for user
    const userCheck = await query('SELECT id, email, password from users where email=$1', [email]);
    if(userCheck.rows.length>0)
      {
        if(userCheck.rows[0].password && (await bcrypt.compare(password, userCheck.rows[0].password)))
          {
            res.status(200)
            res.json(
                {
                    token:  generateToken(newuser.rows[0].id.toString())
                }
            );
          }
        else{
            res.status(400).json('wrong pass');
        }
    }
        
    //     // res.json({
    //     //     _id: user._id,
    //     //     name: user.name,
    //     //     email: user.email,
    //     //     token: generateToken(user._id)
    //     // })}
    else {
         res.status(400).json("User does not exsist")
         //throw new Error('Invalid credentials')
    }
};

const addCourse = async (req,res) => {
    res.status(200).json("hi");
};

const getCourses = async (req,res) => {
    res.status(200).json("hi");
};

module.exports={
    signup,
    login,
    addCourse,
    getCourses,
}
