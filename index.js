const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Games = require("./Games/Games");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.set('view engine', 'ejs');

// database 
connection.authenticate()
.then(() => {
    console.log("OK authentication");
}).catch((err) => {
    console.log(err)
})

app.get("/games", (req,res) => {
    Games.findAll().then(games => {
        res.json(games)
    }).catch((err) => {
        res.sendStatus(400);
    })
})

app.get("/games/:id", (req,res) => {
    let id = req.params.id

    Games.findByPk(id).then(game => {
        if(game == undefined){
            res.sendStatus(404);
        } else {
            res.json(game);
        }
    }).catch(() => {
        res.sendStatus(500);
    });
});

app.post("/games", (req,res) => {
    let conteudo = req.body;
    
        if (conteudo.title == "" || conteudo.price == ""){
           res.sendStatus(400);
        } else {
            Games.create({
                title: conteudo.title,
                year: conteudo.year,
                price: conteudo.price,
                picture: conteudo.picture,
            }).then(() => {
                res.sendStatus(200);
            }).catch((err) => {
                res.sendStatus(400);
            });
        }

});

app.put("/games/:id", (req,res) => {
    let conteudo = req.body;
    let id = req.params.id;

    if(isNaN(id) && id == undefined) {
        res.sendStatus(400);
    };

    Games.findByPk(id).then(game => {
        if(game == undefined) {
            res.sendStatus(404);
        } else {
            
            Games.update({
                title: conteudo.title,
                year: conteudo.year,
                price: conteudo.price,
                picture: conteudo.picture
            },{where: {id: id}}).then(game=> {
                res.sendStatus(200);
            }).catch((err) => {
                res.sendStatus(404);
            });
            
        }
    });
});

app.delete("/games/:id", (req,res) => {
    let id = req.params.id;
        if(isNaN(id)){
            res.sendStatus(400);
        }
    Games.findByPk(id).then(game => {
        if(game != undefined) {
            Games.destroy({where: {id:id}})
                .then(() => {
                    res.sendStatus(200);
                }).catch(() => {
                    res.sendStatus(500);
                });
        } else {
            res.sendStatus(404);
        };
    }).catch(() => {
        res.sendStatus(500);
    });
    
});

app.listen(8080, () => {
    console.log("server is ON!")
})