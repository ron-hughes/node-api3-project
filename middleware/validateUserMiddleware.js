const db = require('./../users/userDb')
const validateUserId = () => (req, res, next) =>{
    const user_id = req.params.id;
    if(!user_id){
        return res.status(400).json({
            "message" : "Please make sure your id isn't undefined"
        });
    }
    db.getById(user_id)
        .then(userResponse => {
            if(!userResponse){
              return res.status(500).json({
                    "Message": `Couldn't fid user at ${id}`,
                });
            }
            res.body = userResponse;
            next();
        }).catch(error => {
            res.status(200).json({
                "Message": "Server error",
                "error": error
            });
        })
}
const validateUser = () => (req, res, next) => {
    if(req.body.name){
        req.user = req.body
        next();
    } else{
        res.status(500).json({
            "Message" : "Error"
        })
    }
}
module.exports= {
    validateUserId,
    validateUser
}