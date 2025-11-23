import React, { useState, useEffect } from 'react'
import { useParams, useLocation , Link } from 'react-router-dom'
import { dummyResumeData } from '../../assets/assets'
import { User, FileText, Briefcase, GraduationCap, Folder, Sparkles, ChevronLeftIcon , ChevronRightIcon} from 'lucide-react'
import { ArrowLeft, ArrowLeftIcon } from 'lucide-react';
import PersonalInfoForm from '../components/personal_info_form'


const sections: Array<{ id: string; name: string; icon: any }> = [
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'summary', name: 'Summary', icon: FileText },
    { id: 'experience', name: 'Experience', icon: Briefcase },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'projects', name: 'Projects', icon: Folder },
    { id: 'skills', name: 'Skills', icon: Sparkles },
]

// top-level helpers removed; section active state is managed inside the component


const Resume_Builder: React.FC = () => { 

    const {resumeId} =  useParams<{ resumeId: string }>();

    const [resumeData, setResumeData] = useState({
        _id: '',
        title: '',
        personal_info: {},
        professional_summary: '',
        experience: [],
        education: [],
        skills: [],
        templates: 'classic',
        accent_color: '#3B82F6',
        public : false,
    })

    const loadExistingResume = (id?: string) => {
        const resume = dummyResumeData.find(r => r._id === id)
        if (resume) {
            setResumeData(prev => ({
                ...prev,
                ...resume
            }))
        }
    }

    useEffect(() => {   
        loadExistingResume()
    }, [])

    // If navigated with route state (upload flow), prefer that
    const location = useLocation()
    useEffect(() => {
        if (resumeId) loadExistingResume(resumeId)
        // If we arrived with uploaded file/title in state, initialize title
        if ((location as any).state?.title) {
            setResumeData(prev => ({ ...prev, title: (location as any).state.title }))
        }
    }, [resumeId, location])

    // Sidebar active section state (controls progress bar)
    const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0)
    const [removeBackground, setRemoveBackground] = useState<boolean>(false);
    const activeSection = sections[activeSectionIndex]

    return (
        <div className="p-6">
            <div className="w-[40%] bg-white dark:bg-slate-800 rounded-md p-6 shadow-sm ">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Resume Builder</h1>
                    <Link to="/app" className="text-sm text-blue-600 hover:underline">
                        <ArrowLeftIcon className="inline-block w-4 h-4 mr-1" /> Back to Dashboard
                    </Link>
                </div>
                <div>
                    <p className="text-sm text-slate-700 dark:text-slate-300">Title: {resumeData.title || '(untitled)'}</p>
                </div>
            </div>

            <div className="w-[40%] bg-white dark:bg-slate-800 rounded-md p-6 shadow-sm ">
                <div className='relative rounded-lg overflow-hidden w-full' >

                    <div className="relative lg:col-span-5 rounded-lg overflow-hidden ">
                        <div className='bg-white rounded-lg shadow-sm border border-gray-200  pt-1 ' >

                            <hr className='absolute top-0 left-0 right-0 border-2 border-gray-200'/>

                            <hr className='absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000' style={{width : `${activeSectionIndex * 100 / (sections.length-1)}%`}} />  


                            <div className='w-full flex justify-between items-center mb-4 px-4 mt-4 border-gray-300 py-1'>
                                <div></div>

                                <div className='flex items-center justify-between'>
                                    {activeSectionIndex > 0 && (
                                        <button 
                                            onClick={() => setActiveSectionIndex(prev => Math.max(prev - 1, 0))}
                                            className='px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 mr-2' disabled={activeSectionIndex === 0}
                                        >
                                            <ChevronLeftIcon className='size-4' /> Previous
                                        </button>
                                    )}

                                        <button 
                                            onClick={() => setActiveSectionIndex(prev => Math.min(prev + 1, sections.length - 1))}
                                            className='px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 mr-2' disabled={activeSectionIndex === sections.length - 1}
                                        >
                                            Next <ChevronRightIcon className='size-4' />
                                        </button> 
                                                                
                                </div>
                            </div>

                            <div>

                            </div>
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className='space-y-6'>
                        {activeSection.id === 'personal' && (
                            <PersonalInfoForm
                                data={resumeData.personal_info}
                                onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))}
                                removeBackground={removeBackground}
                                set={setRemoveBackground}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Resume_Builder 