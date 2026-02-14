import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers:[
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
        async jwt({ token, user }){
            if(user){
                token.id = user.id as string
                token.role = user.role
                token.name = user.name
            }
            return token
        },

        async session({session, token}){
            session.user.id = token.id
            session.user.role = token.role
            session.user.name = token.name
            return session
        }
    }
    }
)

export const { GET, POST } = handlers;

