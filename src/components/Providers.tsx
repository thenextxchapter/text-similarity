'use client'

// This is going to allow us to do light and dark mode themese
import { ThemeProvider } from "next-themes" 
import { FC, ReactNode } from 'react'

// This is for client side authentication
import { SessionProvider } from 'next-auth/react'

const Providers = ({ children }: { children: ReactNode}) => {
    return (
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <SessionProvider>{children}</SessionProvider>
        </ThemeProvider>
    )
}
export default Providers