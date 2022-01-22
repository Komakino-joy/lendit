const db = require('../../models/asset_db');

async function handleAllUsersPost(req, res) {
    const { memberId } = req.body;

    try {
        const allUsers = await db('users').select('*').where({owner_id: memberId});

        res.status(200).json({
            userList: allUsers
        })
    } catch (error) {
        res.status(400).send(error);  
    }
};

async function handleAddUserPost(req, res) {
    const { userid, fname, lname, memberId } = req.body;

    try {
        const newUser = await db('users')
        .insert({ 
            id: userid, 
            fname: fname, 
            lname: lname, 
            owner_id: memberId
        }).returning('*');

        db.commit;

        return await res.status(200).send( {
                newUser: newUser[0],
                message: `${userid} successfully created`
            }
         );

    } catch (error) {
        console.log(error)
        if (error.code === '23505') {
            return res.status(400).send({ message: `User with ID ${userid} already exists.`});
        };

        return res.status(400).send({ message: `Something went wrong, please try again later.`});
    }
};

async function handleDeleteUser(req, res) {
    const { memberId, userId } = req.body;

    try {

        const deletedUserId = await db('users')
            .where({
                owner_id: memberId,
                id: userId
            })
            .delete()
            .returning('id');

        return await res.status(200).send( {
            deletedUserId: deletedUserId[0],
            message: `User ${userId} has been successfully deleted.`
        });

    } catch (error) {

        return res.status(400).send({ 
            message: `Something went wrong, please try again later.`,
            error
        });
    }
}

module.exports = {
    handleAllUsersPost,
    handleAddUserPost,
    handleDeleteUser
};