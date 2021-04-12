var express = require("express")
var fs      = require("fs")
var bodyParser = require("body-parser")
var highliter = require("highlight.js")
const Handlebars = require('handlebars');

var folderPastes = "pastes/"

var server = express()

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

function makeUnique(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function newFileCreate(content){
    randName = makeUnique(16);
    
    const filebin = content;

    var toHighLight = highliter.highlightAuto(content)

    fs.writeFileSync(folderPastes + randName + '.txt', filebin,"utf8")

    console.log("----- NEW PASTE -----")
    console.log("ID : " + randName)
    console.log("----- NEW PASTE -----")

    return randName
}

server.get("/", (req, res) => {
    res.sendFile(__dirname + "/src/index.html")
})

server.post("/getPASTE", (req, res) => {
    console.log(req.body)
    if(true){
        console.log("passed")
        var id = req.body.id

        if (fs.existsSync("pastes/" + id + ".txt")) {
            paste = fs.readFileSync("pastes/" + id + ".txt")
            res.send(paste)
            console.log("passed4")
        }else{
            res.sendStatus(404)
        }
}
})

server.get("/display", (req, res) => {
    res.sendFile(__dirname + "/src/display.html")
})

server.post("/new", (req, res) => {
    var content = req.body.content
    var makedId = newFileCreate(content)
    res.send(makedId)
})

const port = process.env.PORT || 3000;
server.listen(port,() => {
    console.log(`Listening on ${port}`)
})
