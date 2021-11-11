const { auth } = require("../firebase-config/firebaseAdmin-config");


class TokenVerification {
    async decodeToken(req, res, next) {
        const token = req.headers.authorization;

        //console.log("token in verification: " + token);

        if (token) {
            await auth.verifyIdToken(token).then((decodedToken) => {
                if (decodedToken) {
                    req.uid = decodedToken.uid;
                    //console.log("uid: " + req.uid);
                    return next();
                }
                return res.json({ message: 'Not authorized' });
            }).catch((error) => {
                console.log(error.message);
                return res.json({ message: error.message });
            });
        } else {
            return next();
        }
    }
}

module.exports = new TokenVerification();