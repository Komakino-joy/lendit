const db = require('../../models/asset_db');

function handleAvailableAssetsPost(req, res) {
    return db.raw(`select * from assets where status = 'Available' and owner_id = ?`, [req.body.memberId])
    .then(results => {
        res.json(results.rows)
    }).catch( err => console.log(err))
};

function handleQuarantinedAssetsPost(req, res) {
    return db.raw(`select * from assets where status = 'Quarantine' and owner_id = ?`, [req.body.memberId])
    .then(results => {
        res.json(results.rows)
    }).catch( err => console.log(err))
};

function handleAssetsInUsePost(req, res) {
    return db.raw(`
    select 
        a.*,
        u.fname || ' ' || u.lname as full_name
    from assets a 
    inner join users u on u.id = a.in_use_by
    where status LIKE 'In Use By %' 
    and a.owner_id = ?`, [req.body.memberId])
    .then(results => {
        res.json(results.rows)
    }).catch( err => console.log(err))
};

function handleMultipleAssetsCheckedOutPost(req, res) {
    return db.raw(`
    select 
        a.in_use_by,
        count(a.*),
        u.fname || ' ' || u.lname as full_name
    from assets a
    inner join users u on u.id = a.in_use_by
    where in_use_by is not null
    and a.owner_id = ?
    group by 
        a.in_use_by,
        u.fname, 
        u.lname
    having count(*) > 1`, [req.body.memberId])
    .then(results => {
        res.json(results.rows)
    }).catch( err => console.log(err))
};

function handleActivityTrackingPost(req, res) {
    return db.raw(`
    SELECT 
    id, 
    user_id, 
    asset_id, 
    asset_name, 
    asset_serial, 
    model_name, 
    action, 
    comments, 
    date_trunc('second',created_dttm) AS action_dttm
    FROM 
    activity_tracking 
    WHERE owner_id = ?
    AND (user_id like ? or user_id is null)
    AND (asset_id like ? or asset_id is null)
    AND created_dttm BETWEEN to_timestamp(?)and to_timestamp(?);`,
    [req.body.id, req.body.username, req.body.assetID, req.body.startDate/1000, req.body.endDate/1000])
    .then(results => {
        res.json(results.rows)
    }).catch( err => console.log(err))
};

async function handleEmailDistroPost(req, res) {

    const { memberId } = req.body;

    try {        
        const emails = await db
            .select('email')
            .from('email_recipients').where({
                owner_id: memberId
            });

        return await res.status(200).send(emails)

    } catch (error) {
       return error; 
    }
};


async function getEmailDistro(memberId) {
    return await db.select('email').from('email_recipients').where({owner_id: memberId})
}

async function handleRemoveEmailFromDistroDelete(req, res) {
    const { memberId, email } = req.body;

    try {
        await db('email_recipients')
                .where({
                    email,
                    owner_id: memberId, 
                }).delete();

        const updatedEmailDistro =  await getEmailDistro(memberId);

        return await res.status(200).send( {
            emailDistro: updatedEmailDistro,
            message: `${email} will no longer receive emails.`
        });
        
    } catch (error) {
        console.log(error)
        return res.status(400).send({ 
            message: `Something went wrong, please try again later.`,
            error
        });
    };
};

async function handleAddEmailToDistroPost(req, res) {
    const { memberId, email } = req.body

    try {
        await db.insert({ owner_id: memberId, email }).into('email_recipients');
        
        const updatedEmailDistro =  await getEmailDistro(memberId);

        return await res.status(200).send( {
            emailDistro: updatedEmailDistro,
            message: `${email} will begin receiving emails`
        });
        
    } catch (error) {

        if (error.code === '23505') {
            return res.status(400).send({ message: `${email} is already receiving emails.`})
        };

        return res.status(400).send({ 
            message: `Something went wrong, please try again later.`,
            error
        });
    }
};


module.exports = {
    handleAvailableAssetsPost,
    handleQuarantinedAssetsPost,
    handleAssetsInUsePost,
    handleMultipleAssetsCheckedOutPost,
    handleActivityTrackingPost,
    handleEmailDistroPost,
    handleRemoveEmailFromDistroDelete,
    handleAddEmailToDistroPost
};