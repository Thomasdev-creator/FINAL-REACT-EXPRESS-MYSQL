const bcrypt = require('bcrypt');

const plaintextPassword = 'employeemploye'; // Remplacez par le mot de passe que vous souhaitez utiliser pour l'administrateur

bcrypt.hash(plaintextPassword, 10, function(err, hashedPassword) {
    if (err) {
        console.error('Erreur lors du hachage du mot de passe:', err);
        return;
    }
    console.log(plaintextPassword, hashedPassword);
});
