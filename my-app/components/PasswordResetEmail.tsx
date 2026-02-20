
interface Props{
    email:string
    token:string
}

export default function PasswordResetEmail({email, token}:Props){
    return(
        <div>
            <p>{`Hello,
            Here is your password reset link that you (hopefully) requested: http://${process.env.DOMAIN}/passwordreset/${token}`}</p>
        </div>
    )
}