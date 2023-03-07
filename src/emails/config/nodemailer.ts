export const configMail = {
    host: process.env.NODEM_HOST,
        port: Number(process.env.NODEM_PORT),
        secure: Boolean(process.env.NODEM_SECURE),
        auth: {
            user: process.env.NODEM_USER,
            pass: process.env.NODEM_PASS        
        },
        tls: {
            ciphers: process.env.NODEM_TLS
        }
}

export const changePasswordMail = (email: string, token: string, userType: string) => {
    return {
        from: `Consultas Medicas APP <${process.env.NODEM_USER}>`,
        to: email,
        subject: "Password recovery!",
        html: `<p>Link to change password: <a href="http://localhost:3000/${userType}/${token}">metodo POSTTT</a> </p>`
    }
}

export const verificationMail = (email: string, token: string, userType: string) => {
    return {
        from: `Consultas Medicas APP <${process.env.NODEM_USER}>`,
        to: email,
        subject: "Account verification",
        html: `<p>Complete registration! <a href="http://localhost:3000/verification/${token}?userType=${userType}">Clique aqui!</a></p>`
    }
}