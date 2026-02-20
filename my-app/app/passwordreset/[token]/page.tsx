import PasswordTokenResetForm from "@/components/PasswordTokenResetForm"


export default async function ResetTokenPage({params}:{params:{token:string}}){
    const { token } = await params
    return(
        <div className="flex justify-center items-center min-h-screen w-full">
            <PasswordTokenResetForm token={token} />
        </div>
    )
}