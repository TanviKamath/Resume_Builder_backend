import React, { useEffect } from 'react'
import { Plus as PlusIcon, UploadCloud as UploadCloudIcon, FilePen as FilePenIcon, Edit3 as EditIcon, Trash2 as TrashIcon } from 'lucide-react'
import { X as XIcon } from 'lucide-react'
import { set } from 'date-fns'
import { dummyResumeData } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'


const Dashboard: React.FC = () => { 

    const [allResumes, setAllResumes] = React.useState([])
    const [showCreateResume, setShowCreateResume] = React.useState(false)
    const [showUploadResume, setShowUploadResume] = React.useState(false)
    const [newResumeTitle, setNewResumeTitle] = React.useState('')
    const [resume , setResume] = React.useState(null)
    const [editresumeId, setEditResumeId] = React.useState('')
    const navigate = useNavigate();
    const loadResumes = () => {
     setAllResumes(dummyResumeData)   
    }
    const CreateResume = (e: React.FormEvent) => {
        e.preventDefault();
        setShowCreateResume(false);
        navigate(`/app/builder/new`);

    }
    useEffect(() => {
        loadResumes();
    }, []);

    const pastelClasses = [
        'bg-pink-50',
        'bg-rose-50',
        'bg-amber-50',
        'bg-lime-50',
        'bg-cyan-50',
        'bg-violet-50',
        'bg-green-50',
        'bg-indigo-50',
    ]

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-8">
            <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
                <p className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Welcome to the Dashboard</p>
                <div className="flex items-center gap-4">
                    <button onClick={()=>setShowCreateResume(true)} className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                        <PlusIcon className="w-4 h-4" />
                        <p className="m-0">Create New Resume</p>
                    </button>
                    <button className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                        <UploadCloudIcon className="w-4 h-4" />
                        <p className="m-0">Upload Resume</p>
                    </button>
                </div>

                <hr className='border-slate-300 my-6 sm:w-[305px]' />
                <div className="grid grid-cols-2 sm:flex gap-4 flex-wrap">
                    {allResumes.map((resume, index) => (
                        <div key={index} className={`${pastelClasses[index % pastelClasses.length]} w-40 h-52 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm p-4 relative overflow-hidden hover:shadow-md transition-shadow cursor-pointer`}>
                            <div className="absolute top-2 right-2 flex gap-2 z-10">
                                <button aria-label="edit" className="p-1 rounded-full bg-white/70 dark:bg-slate-700/60 hover:bg-white text-slate-700 dark:text-slate-200">
                                    <EditIcon className="w-4 h-4" />
                                </button>
                                <button aria-label="delete" className="p-1 rounded-full bg-white/70 dark:bg-slate-700/60 hover:bg-white text-slate-700 dark:text-slate-200">
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="h-full flex flex-col items-center justify-center text-center gap-3">
                                <FilePenIcon className="w-10 h-10 text-slate-700 dark:text-slate-200" />
                                <h3 className="text-md font-medium text-slate-900 dark:text-slate-100">{resume.title}</h3>
                            </div>

                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 absolute bottom-2 left-4">Updated on {resume.updatedAt ? new Date(resume.updatedAt).toLocaleDateString() : ''}</p>
                        </div>
                    ))}
                </div>

                {showCreateResume && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowCreateResume(false)} />

                        <form onSubmit={CreateResume} action="" className="relative z-10 w-full max-w-md mx-4 border border-gray-300 rounded-lg p-6 bg-white dark:bg-slate-800 shadow-lg">
                            <div onClick={e => e.stopPropagation()} className="relative">
                                <h2 className="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100">Create Resume</h2>
                                <input type="text" placeholder='Enter Resume Title' className='w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100' required={true} value={newResumeTitle} onChange={e => setNewResumeTitle(e.target.value)} />
                                <button type="submit" className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md">Create Resume</button>
                                <XIcon onClick={() => { setShowCreateResume(false); setNewResumeTitle(''); }} className="absolute top-3 right-3 w-5 h-5 cursor-pointer text-slate-600 dark:text-slate-200" />
                            </div>
                        </form>
                    </div>
                )}
                
            </div>
        </div>
    )
}

export default Dashboard