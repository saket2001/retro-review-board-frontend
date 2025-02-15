'use client';

import useGuestAutoLogout from '@/Hooks/useGuestAutoLogout';
import { useSession } from '@/Hooks/useSession';
import { useRouter } from 'next/navigation';

interface Props {
    children?: React.ReactNode;
}

const SessionProvider: React.FC<Props> = ({ children }) => {
    useGuestAutoLogout();
    const router = useRouter();
    const isLoggedIn = useSession();

    if (!isLoggedIn) {
        router.replace("/auth")
    }

    return <>{children}</>;
};

export default SessionProvider;