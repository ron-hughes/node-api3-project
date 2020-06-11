const db = require('./../posts/postDb')
function validatePostId (){
    return function  (req, res, next){
        if(req.params.id){
            db.getById(req.params.id)
            .then(response => {
                if(!response){
                   return res.status(500).send({
                        message: 'Please provide a right id'
                      })
                }else{
                    req.post =response;
                    req.id = response['id'];
                    next();
                }
            }).catch(err => {
                res.status(500).send({
                    message: 'Server Error'
                  });
            });
        }
        
      
    }
}

function validatePost(){
    return (req, res, next) => {
        const id = req.params.id;

        if(req.body.text.length > 1 ){
            req.post = req.body;
            if(id){
                req.id = id;
            }
        }
        next();
    }   
}

module.exports = {
    validatePostId,
    validatePost
}