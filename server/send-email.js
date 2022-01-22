let nodemailer = require('nodemailer');
const db = require('./models/asset_db');

const dontenv = require('dotenv');
dontenv.config();

function json2csv(content){
    const { Parser } = require('json2csv');
    var fields = getFields(content);

    const parsedContent =  new Parser({ fields }).parse(content);

    return parsedContent;

    function getFields(content){
        var fields = [];

        for(var i = 0; i < content.length; i++){

            fields = Object.keys(content[i]);

            if(fields.length > 0)
                break;
        };

        return fields;
    }
 }

async function fetchEmailRecepients(memberId) {
    try {        
        const data = await db.raw(`select * from email_recipients where owner_id = ?`, [memberId]);
    
        const emails = data.rows.map(subscriber => (
            subscriber.email
        ));
    
        return emails.join(",");
    } catch (error) {
        console.log(error);
    }
};

async function sendEmail(){

    try {
        const memberData = await db.raw(`select id from members`); 
        const memberIds = memberData.rows;
    
        for (let i = 0 ; i < memberIds.length; i++) {
            const emailRecipients = await fetchEmailRecepients(memberIds[i].id);
    
            if (!emailRecipients) {
                continue;
            }
    
            let assetsOutData = await db.raw(`    
                select 
                    a.id,
                    a.name,
                    a.serial,
                    a.model,
                    u.fname || ' ' || u.lname as checked_out_by,
                    a.last_checkout,
                    EXTRACT(EPOCH FROM (current_timestamp - a.last_checkout ))::integer /3600::integer  as hours_checked_out
                from assets a 
                inner join users u on u.id = a.in_use_by
                where status LIKE 'In Use By %' 
                and a.owner_id = ?
            `, [memberIds[i].id])
    
            const content = assetsOutData.rows;
    
            let mailOptions = {
                attachments: [{filename: 'Assets In Use Report' + '.csv',content:json2csv(content)}],
                from: 'asset_tracker_reports@noreply.com',
                to: emailRecipients,
                subject: 'Assets in use',
                text: 'Assets that are currently checked out.'
            };
            
            let transporter = nodemailer.createTransport({
                host: process.env.SMTP_SERVER || '', 
                port: 25,
                secure: false,
            });
    
            transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                    console.log(error);
                    } else {
                    console.log('Email sent: ' + info.response);
                    }
                });
            
        }
    } catch(error) {
        console.log(error)
    }
}

module.exports = {
    sendEmail
}