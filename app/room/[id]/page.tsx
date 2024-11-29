'use client';

import VideoChat from '@/components/VideoChat';
import { UserType } from '@/types/user';
import { getProfile } from '@/utils/functions/getProfile';
import { useParams } from 'next/navigation';

export default function MeetPage() {
    const params = useParams();
    const profile: UserType = getProfile();
    return (
        <div className="min-h-screen bg-gray-900">
            <VideoChat roomId={params.id as string} userId={profile?._id} />
        </div>
    );
}
