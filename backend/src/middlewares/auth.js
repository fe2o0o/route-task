import jwt from 'jsonwebtoken'

export const auth = (req , res , next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(401).json({message:"un Authorized"})
    }

    jwt.verify(token, process.env.SECRET_KEY, (err , decoded) => {
        if (err) {
            return res.status(401).json({message:"invalid token"})
        }
        req.userId = decoded._id
        req.role = decoded.role
        next()
    })
}


export const isAdmin = (req,res,next) => {
    const { token } = req.headers;

    jwt.verify(token, process.env.SECRET_KEY, (err,decoded) => {
        if (err) {
            return res.status(401).json({ message: "invalid token" })
        }

        if (decoded.role != 'admin') {
            return res.status(401).json({ message: "un Authorized " })
        }

        next()
    })

}



