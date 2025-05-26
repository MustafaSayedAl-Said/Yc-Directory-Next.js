import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { auth, signIn, signOut } from '@/auth'
import { FiLogOut } from 'react-icons/fi'
import { BadgePlus } from 'lucide-react'

const navbar = async () => {
    const session = await auth()
    return (
        <div className='px-5 py-3 bg-white shadow-sm font-work-sans'>
            <nav className='flex justify-between items-center'>
                <Link href="/">
                    <Image src="/logo.png" alt='logo' width={144} height={30} />
                </Link>

                <div className='flex items-center gap-5 text-black'>
                    {session && session?.user ? (
                        <div className="flex items-center gap-5">
                            <Link href="/startup/create">
                                <span className='max-sm:hidden'>Create</span>
                                <BadgePlus className="size-6 sm:hidden" />
                            </Link>
                            <form action={async () => {
                                "use server";
                                await signOut({ redirectTo: '/' })
                            }}>
                                <button type='submit'>
                                    <span className='max-sm:hidden'>Logout</span>
                                    <FiLogOut className="size-6 sm:hidden text-red-500" />
                                </button>
                            </form>
                            <Link href={`/user/${session?.user?.id}`}>
                                <span>{session?.user?.name}</span>
                            </Link>
                        </div>
                    ) :
                        (
                            <form className="flex items-center gap-5" action={async () => {
                                "use server";
                                await signIn('github')
                            }}>
                                <button type='submit'>
                                    Login
                                </button>
                            </form>
                        )}
                </div>
            </nav>
        </div>
    )
}

export default navbar