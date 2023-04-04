const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser")
let ejs = require("ejs");
const path = require("path");
const app = express();
const userschema = require("./userschema");
let user = mongoose.model('user', userschema)
app.set("view engine", 'ejs')
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }));
let currentpath = path.join(__dirname, "views");
app.use(express.static(currentpath));
app.use(fileUpload());
app.get("/", (req, res) => {
    res.sendFile(`${currentpath}/index.html`)
})
app.get("/login", (req, res) => {
    res.sendFile(`${currentpath}/login.html`);
})
app.get("/signup", (req, res) => {
    res.sendFile(`${currentpath}/signup.html`)
})
app.get("/users", async (req, res) => {
    let datas = await user.find();
    for (let i = 0; i < datas.length; i++) {
        details.push({
            imagepath: datas[i].image,
            id: datas[i].id,
            fname: datas[i].fname,
            lname: datas[i].lname,
            email: datas[i].email,
            phone: datas[i].phone,
            address: datas[i].address,
            password: datas[i].password,
        })
    }
    res.render('users', { data: details })
    details = [];
})
app.post("/signup", async (req, res) => {
    details = [];
    const { image } = req.files;
    if (!image) return res.sendStatus(400);
    image.mv(__dirname + '/views/uploads/' + image.name);
    let id = req.body.id;
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    let phone = req.body.phone;
    let address = req.body.address;
    let password = req.body.password;
    let imagename = `../uploads/${image.name}`;
    let data = await user({ image: imagename, id: id, fname: fname, lname: lname, email: email, phone: phone, address: address, password: password });
    let result = await data.save();
    console.log(result);
    let datas = await user.find();
    for (let i = 0; i < datas.length; i++) {
        details.push({
            imagepath: datas[i].image,
            id: datas[i].id,
            fname: datas[i].fname,
            lname: datas[i].lname,
            email: datas[i].email,
            phone: datas[i].phone,
            address: datas[i].address,
            password: datas[i].password,
        })
    }
    // res.render('users', {data:details})
    details = [];
    res.send("Registration Successful");
})

app.post("/login", async (req, res) => {
    console.log(req.body.username)
    let userbyEmail = await user.findOne({ email: req.body.username });
    let userbyPhone = await user.findOne({ phone: req.body.username });
    if (userbyPhone && req.body.password == userbyPhone.password || userbyEmail && req.body.password == userbyEmail.password) {
        res.send("login successfully completed");
    }
    else {
        res.send("login unsuccessful");
    }
});
app.get("/users/:id", (req, res) => {
    user.findByIdAndDelete(req.params.id).then(() => { console.log("deleted") }).catch((err) => { console.log(err) })
    res.redirect("/users");
})
app.get("/update/:id", async (req, res) => {

    let userData = await user.findOne({ _id: req.params.id });
    console.log(userData.fname);
    let data = {
        fname: userData.fname,
        lname: userData.lname,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        id:userData._id
    };
    // console.log(data.fname);
    res.render('update', { data: data });
    //   user.findByIdAndUpdate(req.params.id).then
})

app.post('/update/:id', async (req,res)=>{
    let {fname, lname,email, phone, address} = req.body;
    let update = await user.findOneAndUpdate({_id:req.params.id},{fname:fname,lname:lname,email:email,phone:phone,address:address});
    res.redirect('/users');
})
let details = [];
let port = 4000;
app.listen(port, () => {
    console.log(`server is running on ${port}`)
})

