class variable {
    secretKeyJwt () {
        return process.env.TOKEN_SECRET
    }
}
module.exports =  new variable()

