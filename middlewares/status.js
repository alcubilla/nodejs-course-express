export default (users) => (req, res, next) =>{
    const currentUser= users.find(p=>p.USER === req.body.user)
    if (currentUser.STATUS == 1 )
    {req.currentUser=currentUser;
    next(); 
    }
    else{
        res.status(404).json({msg: "Usuario inactivo"});
    }
}