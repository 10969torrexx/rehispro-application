import { useState } from 'react';
import { BirthCertificateLatest, DeathCertificateLatest, MarriageCertificateLatest } from '@components';
export default function RecentRecords() {
    const [recentActiveTab, setRecentActiveTab] = useState('birth');
    return (
        <>
            <h3 className="font-semibold mb-4 text-xs text-left m-2">Recent Records</h3>
            <div className='w-full bg-white p-2 rounded-lg shadow-lg'>
                <div className='flex flex-row p-2 justify-start gap-2'>
                    <button className={`btn-${recentActiveTab === 'birth' ? 'primary' : 'secondary'} shadow-lg px-3 py-1 rounded-full text-xs`}
                        onClick={() => setRecentActiveTab('birth')}
                    >Birth</button>
                    <button className={`btn-${recentActiveTab === 'death' ? 'primary' : 'secondary'} shadow-lg px-3 py-1 rounded-full text-xs`}
                        onClick={() => setRecentActiveTab('death')}
                    >Death</button>
                    <button className={`btn-${recentActiveTab === 'marriage' ? 'primary' : 'secondary'} shadow-lg px-3 py-1 rounded-full text-xs`}
                        onClick={() => setRecentActiveTab('marriage')}
                    >Marriage</button>
                    </div>
                    <div className="mt-2">
                    {recentActiveTab === 'birth' && <BirthCertificateLatest />}
                    {recentActiveTab === 'death' && <DeathCertificateLatest />}
                    {recentActiveTab === 'marriage' && <MarriageCertificateLatest />}
                </div>
            </div>
        </>
    );
}