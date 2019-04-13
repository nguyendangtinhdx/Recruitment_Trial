var KnexOption= require('./../../knexfile');
const knex= require('knex')(KnexOption.development);
var CONFIG=require('./../../configs/table');

exports.getAllUser=(req,res)=>{
    knex.from(CONFIG.TABLE).select("*").orderBy('date_created', 'desc').then((response)=>{
       
        res.status(200).json(response);
       
    }).catch((err)=>{
    res.status(400).json({err});
    });
};

exports.deleteUser=(req,res)=>{
    knex.from(CONFIG.TABLE).del().where({id: req.params.id}).then((response)=>{
      
    res.send('X-Frame-Options')
        res.status(200).json({
            status :"200",
            message: 'Delete success!'})
        }).catch((err)=>{
            res.status(400).json(err)
        });
};

exports.updateUser=(req,res)=>{
    let data = req.body;
    knex.from(CONFIG.TABLE).where({id: req.params.id}).update(data).then((page)=>{
        res.set('X-Frame-Options', value)
    res.send('X-Frame-Options: ' + res.get('X-Frame-Options'))
    res.status(200).json({message: 'Update success!'});
    }).catch((err)=>{
        res.status(400).json(err)
    });
};
exports.addUser=(req,res)=>{  
    let data = req.body;
    knex(CONFIG.TABLE).insert(data).then(
        (response)=>{
            res.set('X-Frame-Options', value)
    res.send('X-Frame-Options: ' + res.get('X-Frame-Options'))
            res.status(200).json({message: 'Insert success!'});
        }).catch((err)=>{
            res.status(400).json({err});
        });
};

