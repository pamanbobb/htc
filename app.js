var express = require('express')
var path = require('path')
var Insta = require('@androz2091/insta.js');
var client = new Insta.Client();

var application_ige = express();

application_ige.use(express.json());
application_ige.use(express.urlencoded({ extended: false }));
application_ige.use(express.static(path.join(__dirname, 'public')));

application_ige.use('/login', async(req, res) => {
    const {username, sandine} = req.query;
    try {
        res.setHeader('Content-Type', 'application/json');
        client.login(`${username}`, `${sandine}`);
                client.on('connected', () => {
                    client.fetchUser(`${username}`)
                        .then((user) => {
                            res.status(200).json(user);
            });
        });
    }catch(e) {
        res.status(e.statusCode || 500).json({'status': e.message});
    }
});

application_ige.use('/follow_leng', async(i, v) => {
    const {uid} = i.query;
        try {
            v.setHeader('Content-Type', 'application/json');
            client.fetchUser(`${uid}`)
            .then((user) => {
                user.follow().then(()=>{
                    v.status(200).json(user);
                }).catch((e)=>{
                    v.status(400).json(e.message);
                });
            });
        }catch(e) {
            console.error(`Erorr DM user `, e.message);
            v.status(e.statusCode || 500).json({'Indikasi': e.message});
        }
});

application_ige.use('/dm_asu', async(i, v) => {
    const {uid, kata} = i.query;
    try {
        v.setHeader('Content-Type', 'application/json');
        client.fetchUser(`${uid}`)
            .then((user) => {
                    user.fetchPrivateChat()
                .then((chat)=>{
                    v.status(200).json(chat);
                    chat.sendMessage(`${kata}`);
                }).catch((e)=>{
                    v.status(400).json(e.message);
                });
            });
    }catch(e) {
            console.error(`Erorr DM user `, e.message);
            v.status(e.statusCode || 500).json({'Indikasi': e.message});
    }
});

application_ige.use('/dm_photo', async(i, v) => {
    const {uid, img_url} = i.query;
    try {
        v.setHeader('Content-Type', 'application/json');
        client.fetchUser(`${uid}`)
            .then((user) => {
                    user.fetchPrivateChat()
                .then((chat)=>{
                    v.status(200).json(chat);
                    chat.sendPhoto(`${img_url}`);
                }).catch((e)=>{
                    v.status(400).json(e.message);
                });
            });
        }catch(e) {
            console.error(`Erorr DM img `, e.message);
            v.status(e.statusCode || 500).json({'Indikasi': e.message});
        }
});
application_ige.use('/metu_taek_e', async(i, v) => {
    if(i.method === 'POST'){
        try{
            client.logout().then(()=>{
                v.json({status : 'location.reload()'});
            }).catch((e)=>{
                v.status(400).json(e.message);
            });
        }catch(e){
            console.error(`Erorr Pek Metu `, e.message);
            v.status(e.statusCode || 500).json({'Indikasi': e.message});
        }
    }else {
        v.send({status : "GAK OLEH GET KOPOK DOBOL. BAJINGAN !"});
    }
});

var asu = process.env.PORT || 3000;
application_ige.listen(asu, ()=>{
    console.log("MLAKU LENG TEK PORT : "+asu);
});