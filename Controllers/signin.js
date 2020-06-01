const handleSignin = (req,res,db,bcrypt) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json('incorrect email or password');
    }

    db.select('email','hash').from('login')
    .where({email})
    .then(data => {
        const isvalid = bcrypt.compareSync(password, data[0].hash);

        if(isvalid){
            return db.select('*').from('users')
            .where({email})
            .then(user => {
                res.json(user[0])
            })
            .catch(err => res.status(400).json('unable to connect'))
        }else{
            res.status(400).json('wrong credentials')
        }
    })
    .catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
    handleSignin: handleSignin
}