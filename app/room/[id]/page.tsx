'use client';

import VideoChat from '@/components/VideoChat';
import { UserType } from '@/types/user';
import { getAccessTokenClient } from '@/utils/functions/getAccessTokenClient';
import { getProfile } from '@/utils/functions/getProfile';
import useRequireAuth from '@/utils/hooks/useRequireAuth';
import { useParams } from 'next/navigation';

export default function MeetPage() {
    const params = useParams();
    const profile: UserType = getProfile();
    const token = getAccessTokenClient();
    useRequireAuth(token);
    return (
        <div className="min-h-screen bg-gray-900">
            <VideoChat roomId={params.id as string} userId={profile?._id} />
        </div>
    );
}
