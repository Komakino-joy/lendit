const bcrypt = require('bcrypt-nodejs');
const { numericNanoId } = require('../../utils');

const db = require('../../models/asset_db');

async function handleRegister(req, res) {
    const { fname, lname, email, password} = req.body
    
    if (!fname || !lname || !email || !password) return res.status(400).json('Incorrect form submission.');

        try {
            await db.transaction( async (trx) => {

                const hash = bcrypt.hashSync(password);
                
                const loginEmail = await trx('login').insert({
                    hash: hash,
                    email:email.toLowerCase()
                })
                .returning('email')
  
                const newAccountDetails = await trx('members').insert({
                    id: numericNanoId(),
                    fname: fname,
                    lname: lname,
                    email: loginEmail[0],
                    joined_dttm: new Date()
                })
                .returning('*');

                try {
                    await trx.commit()
                } catch (error) {
                    await trx.rollback()
                }
                
                return res.status(200).json(newAccountDetails[0]);
            })

        
    } catch (error) {

        if (error.code === '23505') {
            return res.status(400).send({ message: `Account with email ${email} already exists.`})
        };

        return res.status(400).send({ 
            message: `Something went wrong, please try again later.`,
            error
        })
    };
};

async function handleSignin(req, res) {
    const { email, password } = req.body;
    
    try {    

        if (!email || !password) {
          return res.status(400).json('incorrect form submission');
        }
    
        const userInput = await db.select('email', 'hash')
                                  .from('login')
                                  .where('email', '=', req.body.email.toLowerCase());
    
        const isValid = bcrypt.compareSync(password, userInput[0].hash);
    
        if (isValid) {
            const memberAccountDetails = await db.select('*').from('members').where('email', '=', req.body.email.toLowerCase());
            return res.status(200).json(memberAccountDetails[0]);
        } else {
            res.status(400).json({
                message: 'Invalid credentials'
            })
        };

    } catch (error) {

        res.status(400).json({
            message: 'Something went wrong, please try again later.',
            error
        })
    }
};

module.exports = {
    handleSignin,
    handleRegister
};
