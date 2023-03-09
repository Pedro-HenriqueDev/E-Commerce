
export const changePasswordMail = (email: string, token: string, userType: string) => {
    return {
        from: `${process.env.SENDGRID_USER}`,
        to: email,
        subject: "Password recovery!",
        html: `<p>Link to change password: <a href="http://localhost:3000/${userType}/${token}">metodo POSTTT</a> </p>`
    }
}

export const verificationMail = (email: string, token: string, userType: string) => {
    return {
        from: `${process.env.SENDGRID_USER}`,
        to: email,
        subject: "Account verification",
        html: `<p>Complete registration! <a href="http://localhost:3000/verification/${token}?userType=${userType}">Clique aqui!</a></p>`
    }
}