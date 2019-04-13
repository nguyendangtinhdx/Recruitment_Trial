var checkLogin = false;
var KnexOption= require('./../../knexfile');
const knex= require('knex')(KnexOption.development);
var CONFIG=require('./../../configs/table');

exports.list =(req,res)=>{
    if (checkLogin) {
        knex.from(CONFIG.TABLE).select("*").orderBy('date_created', 'desc').then((users)=>{
            res.render('users', {
                data: users
            });
        }).catch((err)=>{
           res.render('error');
            });
    }else {
        res.redirect('/');
    }
};

exports.delete=(req,res)=>{
    knex.from(CONFIG.TABLE).del().where({id: req.params.id}).then((rows)=>{
        console.log(rows);
        res.redirect('/home')
    }).catch((err)=>{
        res.render('error');
    })
};

exports.insert=(req,res)=>{
    const data = req.body;
    data.date_created = new Date();
    knex.from(CONFIG.TABLE).insert(data).then((data)=>{
        res.redirect('/home');
    }).catch((err)=>{
        throw err;
    })
};

exports.update=(req,res)=>{  
    const newUsers = req.body;
    newUsers.date_created = new Date();
    knex.from(CONFIG.TABLE).where({id : newUsers.id}).update(newUsers ).then(
        (rows)=>{
           res.redirect('/home');
        });
};

exports.login=(req,res)=>{  
    const login = req.body;
    if ( login.username == "admin" && login.password == "admin") {
        res.redirect('/home');
        checkLogin = true;
    } else {
        checkLogin = false;
        res.redirect('/');
    }
};

exports.search=(req,res)=>{  
    let key= req.query.keyword;
    knex.from(CONFIG.TABLE).orWhere('users.name', 'like', `${key}%` || '').then((users)=>{
        res.render('users', {
            data: users
        });
    }).catch((err)=>{
        res.json(err);
    });
};
exports.loginPage=(req,res)=>{  
    res.render('login', {
        errLogin: ''
    });
    checkLogin = false;
};