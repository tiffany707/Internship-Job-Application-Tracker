import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import Google from "next-auth/providers/google"

const GOOGLE_ID = process.env.AUTH_GOOGLE_ID!
const GOOGLE_SECRET = process.env.AUTH_GOOGLE_SECRET!

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers:[
        Google({
            clientId:GOOGLE_ID,
            clientSecret:GOOGLE_SECRET
        }),
        Credentials({
            credentials:{
                email:{label:"email", type:"email"},
                password:{label:"password", type:"password"}
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    return null
                }

                const user = await prisma.users.findUnique({
                    where:{ email:credentials.email as string}
                })

                if(!user ||!user?.password){
                    return null
                }
 
                const isPasswordValid = await bcrypt.compare(credentials.password as string, user.password)

                if(!isPasswordValid){
                    return null
                }

                return{
                    email:user.email,
                    id:user.id.toString(),
                    role:user.role,
                    name:user.name
                }

            }

        },
    ),
    
    ],
    session:{strategy:"jwt"},
    pages:{
        signIn: "/login"
    },
    callbacks:{
        async jwt({ token, user, account }){
            if(user){
                token.id = user.id as string
                token.role = user.role
                token.name = user.name
            }

            if(token.id && token.email){
                console.log("hi")
                const findUser = await prisma.users.findUnique({
                    where:{email:token.email as string}
                })
                if(findUser){
                    token.id = findUser?.id.toString()
                    token.role = findUser?.role 
                    token.name = findUser?.name 
                }
                
            }
            return token
        },

        async session({session, token}){
            session.user.id = token.id
            session.user.role = token.role
            session.user.name = token.name
            return session
        },
        async signIn({user, account, profile}){
            try{
                if(account?.provider === "google"){
                const findUser = await prisma.users.findUnique({
                    where:{email:user?.email as string}
                })

                if(!findUser){
                    const newUser = await prisma.users.create({
                        data:{
                            email:user.email as string,
                            name:user?.name as string
                        }
                    })
                }

                return !!profile?.email_verified
            }
            }
            catch(e){
                return false
            }
            
            return true
        }
    }
    }
)

export const { GET, POST } = handlers;

