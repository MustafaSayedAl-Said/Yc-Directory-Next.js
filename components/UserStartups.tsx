import { client } from '@/sanity/lib/client';
import { STARTUPS_BY_AUTHOR } from '@/sanity/lib/queries';
import React from 'react'
import type { StartupTypeCard } from './StartupCard'; // Adjust the import path as needed
import StartupCard from './StartupCard';

const UserStartups = async ({ id }: { id: string }) => {
    const startups = await client.fetch(STARTUPS_BY_AUTHOR, { id });
    return (
        <div className='py-5'>
            {startups.length > 0 ? (startups.map((startup: StartupTypeCard) => (
                <StartupCard key={startup._id} post={startup} />
            ))) : (
                <p className="no-result">No posts yet</p>
            )}
        </div>
    )
}

export default UserStartups