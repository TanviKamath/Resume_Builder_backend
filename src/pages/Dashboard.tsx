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
    const [editresumeId, setEditResumeId] = React.useState(false)
    const navigate = useNavigate();
    const loadResumes = () => {
     setAllResumes(dummyResumeData)   
    }
    const CreateResume = (e: React.FormEvent) => {
        e.preventDefault();
        setShowCreateResume(false);
        navigate(`/app/builder/new`)
    }
    const UploadResume = (e: React.FormEvent) => {
        e.preventDefault();
        // If missing required fields, do nothing
        if (!selectedFile || !uploadTitle) return

        // For now pass the uploaded file and title to the builder via route state.
        // Replace with actual upload logic if you have a backend endpoint.
        navigate('/app/builder/new', { state: { uploadedFile: selectedFile, title: uploadTitle } })

        // reset modal state
        setUploadTitle('')
        setSelectedFile(null)
        setShowUploadResume(false)
    }
    const editTitle = (e: React.FormEvent) => {
        e.preventDefault();
    }

    const deleteResume = (id: string) => {
        const confirm = window.confirm("Are you sure you want to delete this resume?");
        if (confirm) {
            setAllResumes(prevResumes => prevResumes.filter((resume: any) => resume._id !== id));
        }
    }

    const [uploadTitle, setUploadTitle] = React.useState('')
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null)

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) setSelectedFile(e.target.files[0])
    }

    const onDropFile = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault()
        if (e.dataTransfer.files && e.dataTransfer.files[0]) setSelectedFile(e.dataTransfer.files[0])
    }

    const preventDefault = (e: React.DragEvent) => e.preventDefault()
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
                    <button onClick={() => setShowUploadResume(true)} type="button" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                        <UploadCloudIcon className="w-4 h-4" />
                        <p className="m-0">Upload Resume</p>
                    </button>
                </div>

                <hr className='border-slate-300 my-6 sm:w-[305px]' />
                <div className="grid grid-cols-2 sm:flex gap-4 flex-wrap">
                    {allResumes.map((resume, index) => (
                        <div onClick={()=> navigate(`/app/builder/${resume._id}`)} key={index} className={`${pastelClasses[index % pastelClasses.length]} w-40 h-52 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm p-4 relative overflow-hidden hover:shadow-md transition-shadow cursor-pointer`}>
                            <div onClick={e=>e.stopPropagation()} className="absolute top-2 right-2 flex gap-2 z-10">
                                <button aria-label="edit" className="p-1 rounded-full bg-white/70 dark:bg-slate-700/60 hover:bg-white text-slate-700 dark:text-slate-200">
                                    <EditIcon onClick={() => { setEditResumeId(resume._id); setNewResumeTitle(resume.title); }} className="w-4 h-4" />
                                </button>
                                <button aria-label="delete" className="p-1 rounded-full bg-white/70 dark:bg-slate-700/60 hover:bg-white text-slate-700 dark:text-slate-200">
                                    <TrashIcon onClick={()=>deleteResume(resume._id)} className="w-4 h-4" />
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

                {showUploadResume && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowUploadResume(false)} />

                        <form onSubmit={UploadResume} action="" className="relative z-10 w-full max-w-md mx-4 border border-gray-300 rounded-lg p-6 bg-white dark:bg-slate-800 shadow-lg">
                            <div onClick={e => e.stopPropagation()} className="relative">
                                <XIcon onClick={() => { setShowUploadResume(false); setUploadTitle(''); setSelectedFile(null); }} className="absolute top-3 right-3 w-5 h-5 cursor-pointer text-slate-600 dark:text-slate-200" />
                                <h2 className="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100">Upload Resume</h2>

                                <input
                                    type="text"
                                    placeholder="Enter resume title"
                                    value={uploadTitle}
                                    onChange={e => setUploadTitle(e.target.value)}
                                    className="w-full px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 mb-4"
                                />

                                <label htmlFor="resumeFileInput" onDrop={onDropFile} onDragOver={preventDefault} className="block cursor-pointer rounded-md border-2 border-dashed border-gray-300 dark:border-slate-600 p-8 text-center text-slate-500 dark:text-slate-300">
                                    <div className="flex flex-col items-center justify-center gap-3">
                                        <UploadCloudIcon className="w-10 h-10 text-slate-400" />
                                        <div className="text-sm font-medium text-slate-700 dark:text-slate-200">Upload resume</div>
                                        <div className="text-xs text-slate-400">PDF, DOC, DOCX</div>
                                        {selectedFile && <div className="text-xs text-slate-600 mt-2">Selected: {selectedFile.name}</div>}
                                    </div>
                                    <input id="resumeFileInput" type="file" name="resumeFile" accept=".pdf,.doc,.docx" onChange={onFileChange} className="hidden" />
                                </label>

                                <button disabled={!selectedFile || !uploadTitle} type="submit" className="mt-4 w-full bg-green-600 disabled:opacity-50 hover:bg-green-700 text-white py-2 rounded-md">Upload resume</button>
                            </div>
                        </form>
                    </div>
                )}

                {editresumeId && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setEditResumeId(false)} />

                        <form onSubmit={editTitle} action="" className="relative z-10 w-full max-w-md mx-4 border border-gray-300 rounded-lg p-6 bg-white dark:bg-slate-800 shadow-lg">
                            <div onClick={e => e.stopPropagation()} className="relative">
                                <h2 className="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100">Edit Resume Title</h2>
                                <input type="text" placeholder='Enter Resume Title' className='w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100' required={true} value={newResumeTitle} onChange={e => setNewResumeTitle(e.target.value)} />
                                <button type="submit" className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md">Update Resume</button>
                                <XIcon onClick={() => { setEditResumeId(false); setNewResumeTitle(''); }} className="absolute top-3 right-3 w-5 h-5 cursor-pointer text-slate-600 dark:text-slate-200" />
                            </div>
                        </form>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Dashboard