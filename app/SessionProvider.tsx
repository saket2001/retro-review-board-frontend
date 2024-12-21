'use client';

import { useSession } from '@/Hooks/useSession';
import { useRouter } from 'next/navigation';

interface Props {
    children?: React.ReactNode;
}

const SessionProvider: React.FC<Props> = ({ children }) => {
    const router = useRouter();
    const isLoggedIn = useSession();

    if (!isLoggedIn) {
        router.replace("/auth")
    }

    return <>{children}</>;
};

export default SessionProvider;