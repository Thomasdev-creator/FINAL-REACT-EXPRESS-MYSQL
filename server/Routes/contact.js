const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const router = express.Router();

// Utilisez body-parser pour analyser le corps des requêtes POST
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/send-email', async (req, res) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
        });

        let mailOptions = {
            from: 'no-reply@yourdomain.com', // Vous pouvez utiliser un expéditeur générique
            to: 'destination@example.com',
            subject: `Message de ${req.body.name}`,
            text: req.body.message
        };

        await transporter.sendMail(mailOptions);

        res.status(200).send('Email envoyé avec succès!');
    } catch (error) {
        res.status(500).send('Échec de l\'envoi de l\'email. ' + error.message);
    }
});

module.exports = router;
