import React, { useState, useEffect } from 'react'
import { useParams, useLocation , Link } from 'react-router-dom'
import { dummyResumeData } from '../../assets/assets'
import { User, FileText, Briefcase, GraduationCap, Folder, Sparkles, ChevronLeftIcon , ChevronRightIcon, Eye, EyeOff, Share2 } from 'lucide-react'
import { ArrowLeft, ArrowLeftIcon } from 'lucide-react';
import PersonalInfoForm from '../components/personal_info_form'
import PersonalSummaryForm from '../components/personal_summary_form'
import ExperienceForm from '../components/experience_form'
import EducationForm from '../components/education'
import ProjectForm from '../components/project_form'
import Resume_Preview from '../components/Resume_Preview';
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'
import SkillsForm from '../components/skills_form'


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
        project: [],
        education: [],
            skills: [],
        templates: 'classic',
        accent_color: '#3B82F6',
        public : true,
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

    const changeResumeVisibility = () => {
        setResumeData(prev => ({ ...prev, public: !prev.public }))
    }

    const [shareMessage, setShareMessage] = React.useState<string>('')
    const [downloadMessage, setDownloadMessage] = React.useState<string>('')

    const handleShare = async () => {
        // Ensure resume is public before sharing
        if (!resumeData.public) {
            setResumeData(prev => ({ ...prev, public: true }))
        }

        // Build a shareable URL. If resume has an _id, use it; otherwise use a preview path.
        const id = resumeData._id || 'preview'
        const url = `${window.location.origin}/view/${encodeURIComponent(id)}`

        try {
            if ((navigator as any).share) {
                await (navigator as any).share({ title: resumeData.title || 'My Resume', url })
                setShareMessage('Shared via native dialog')
            } else if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(url)
                setShareMessage('Link copied to clipboard')
            } else {
                // fallback: create temporary textarea
                const ta = document.createElement('textarea')
                ta.value = url
                document.body.appendChild(ta)
                ta.select()
                document.execCommand('copy')
                document.body.removeChild(ta)
                setShareMessage('Link copied to clipboard')
            }
        } catch (err) {
            setShareMessage('Failed to share')
        }

        // clear message after 3s
        setTimeout(() => setShareMessage(''), 3000)
    }

    const downloadResume = async () => {
        // Make sure resume is public so preview contains actual resume
        if (!resumeData.public) {
            setResumeData(prev => ({ ...prev, public: true }))
            // wait a tick for render
            await new Promise((r) => setTimeout(r, 60))
        }

        const previewEl = document.getElementById('resume-preview')
        if (!previewEl) {
            setDownloadMessage('Preview not found')
            setTimeout(() => setDownloadMessage(''), 3000)
            return
        }

        // Collect styles (external and style tags) so new window looks similar
        const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style')).map(n => n.outerHTML).join('\n')
        const previewHTML = previewEl.innerHTML

        const newWin = window.open('', '_blank')
        if (!newWin) {
            setDownloadMessage('Popup blocked — allow popups to download')
            setTimeout(() => setDownloadMessage(''), 3000)
            return
        }

        newWin.document.open()
        newWin.document.write(`<!doctype html><html><head><meta charset="utf-8" /><title>${(resumeData.title || 'Resume')}</title>${styles}</head><body>${previewHTML}</body></html>`)
        newWin.document.close()
        newWin.focus()

        // Give the new window a moment to apply styles, then print
        setTimeout(() => {
            try {
                newWin.print()
                // don't close automatically to let user save (some browsers block close after print)
                setDownloadMessage('Print dialog opened')
                setTimeout(() => setDownloadMessage(''), 3000)
            } catch (err) {
                setDownloadMessage('Failed to open print dialog')
                setTimeout(() => setDownloadMessage(''), 3000)
            }
        }, 250)
    }

    return (
        <div className="p-6">
            <div className="mb-6 bg-white dark:bg-slate-800 rounded-md p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Resume Builder</h1>
                    <div className='flex items-center gap-3'>
                        <Link to="/app" className="text-sm text-blue-600 hover:underline flex items-center">
                            <ArrowLeftIcon className="inline-block w-4 h-4 mr-1" /> Back to Dashboard
                        </Link>

                        <button
                            type='button'
                            onClick={changeResumeVisibility}
                            className={`w-28 flex items-center justify-center whitespace-nowrap px-3 py-1 rounded-md text-sm ${resumeData.public ? 'bg-gray-200 text-gray-700' : 'bg-red-600 text-white'}`}
                            title='Toggle private/public'
                        >
                            {resumeData.public ? (
                                <>
                                    <Eye className='inline-block w-4 h-4 mr-1' />
                                    <span className='inline-block'>Public</span>
                                </>
                            ) : (
                                <>
                                    <EyeOff className='inline-block w-4 h-4 mr-1' />
                                    <span className='inline-block'>Private</span>
                                </>
                            )}
                        </button>

                        <button
                            type='button'
                            onClick={downloadResume}
                            className='px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700'
                        >
                            Download
                        </button>
                        <button
                            type='button'
                            onClick={handleShare}
                            className='px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 flex items-center gap-2'
                        >
                            <Share2 className='w-4 h-4' />
                            Share
                        </button>
                        {shareMessage && <div className='text-sm text-gray-600 ml-2'>{shareMessage}</div>}
                        {downloadMessage && <div className='text-sm text-gray-600 ml-2'>{downloadMessage}</div>}
                    </div>
                </div>
                <div>
                    <label htmlFor='resume-title' className='sr-only'>Resume Title</label>
                    <input
                        id='resume-title'
                        type='text'
                        placeholder='Resume title (e.g. Senior Frontend Engineer)'
                        value={resumeData.title || ''}
                        onChange={(e) => setResumeData(prev => ({ ...prev, title: e.target.value }))}
                        className='text-sm text-slate-700 dark:text-slate-300 px-2 py-1 border border-gray-200 rounded-md bg-transparent'
                    />
                </div>
            </div>

            <div className='flex flex-col lg:flex-row gap-6'>
                {/* Left: Form & controls (40% width on large screens) */}
                <div className='w-full lg:w-2/5'>
                    <div className='bg-white dark:bg-slate-800 rounded-md p-6 shadow-sm'>
                        <div className='relative rounded-lg overflow-hidden w-full'>
                            <div className='bg-white rounded-lg shadow-sm border border-gray-200 pt-1'>
                                <hr className='absolute top-0 left-0 right-0 border-2 border-gray-200' />

                                <hr
                                    className='absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000'
                                    style={{ width: `${activeSectionIndex * 100 / (sections.length - 1)}%` }}
                                />

                                <div className='w-full flex justify-between items-center mb-4 px-4 mt-4 border-gray-300 py-0'>
                                        <div>
                                            {activeSectionIndex === 0 && (
                                                    <div className='flex items-center gap-4'>
                                                        <TemplateSelector
                                                            value={resumeData.templates}
                                                            onChange={(t) => setResumeData(prev => ({ ...prev, templates: t }))}
                                                        />

                                                        <ColorPicker
                                                            value={resumeData.accent_color}
                                                            onChange={(c) => setResumeData(prev => ({ ...prev, accent_color: c }))}
                                                        />
                                                    </div>
                                                )}
                                        </div>
                                    <div className='flex items-center justify-between'>
                                        {activeSectionIndex > 0 && (
                                            <button
                                                onClick={() => setActiveSectionIndex(prev => Math.max(prev - 1, 0))}
                                                className='px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 mr-2'
                                                disabled={activeSectionIndex === 0}
                                            >
                                                <ChevronLeftIcon className='size-4' /> Previous
                                            </button>
                                        )}

                                        <button
                                            onClick={() => setActiveSectionIndex(prev => Math.min(prev + 1, sections.length - 1))}
                                            className='px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 mr-2'
                                            disabled={activeSectionIndex === sections.length - 1}
                                        >
                                            Next <ChevronRightIcon className='size-4' />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Form Content */}
                            <div className='mt-6'>
                                {activeSection.id === 'personal' && (
                                    <PersonalInfoForm
                                        data={resumeData.personal_info}
                                        onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))}
                                        removeBackground={removeBackground}
                                        set={setRemoveBackground}
                                    />
                                )}

                                {activeSection.id === 'summary' && (
                                    <PersonalSummaryForm
                                        data={{ summary: resumeData.professional_summary }}
                                        onChange={(d) => setResumeData(prev => ({ ...prev, professional_summary: d.summary }))}
                                    />
                                )}

                                {activeSection.id === 'experience' && (
                                    <ExperienceForm
                                        data={resumeData.experience}
                                        onChange={(arr) => setResumeData(prev => ({ ...prev, experience: arr }))}
                                    />
                                )}

                                {activeSection.id === 'education' && (
                                    <EducationForm
                                        data={resumeData.education}
                                        onChange={(arr) => setResumeData(prev => ({ ...prev, education: arr }))}
                                    />
                                )}

                                {activeSection.id === 'projects' && (
                                    <ProjectForm
                                        data={resumeData.project}
                                        onChange={(arr) => setResumeData(prev => ({ ...prev, project: arr }))}
                                    />
                                )}
                                    {activeSection.id === 'skills' && (
                                        (() => {
                                            const raw = Array.isArray(resumeData.skills) ? resumeData.skills : []
                                            const editorData = raw.map((s: any, i: number) => {
                                                if (typeof s === 'string') return { id: `skill-${i}`, name: s, level: '' }
                                                return { id: s?.id ?? `skill-${i}`, name: s?.name ?? s ?? '', level: s?.level ?? '' }
                                            })

                                            return (
                                                <SkillsForm
                                                    data={editorData}
                                                    onChange={(arr) => setResumeData(prev => ({ ...prev, skills: arr.map(a => a.name) }))}
                                                />
                                            )
                                        })()
                                    )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Preview (60% width on large screens) */}
                <div className='w-full lg:w-3/5'>
                    <div className='bg-white dark:bg-slate-800 rounded-md p-6 shadow-sm'>
                        {resumeData.public ? (
                            <Resume_Preview data={resumeData} template={resumeData.templates} accent_color={resumeData.accent_color} />
                        ) : (
                            <div className='flex flex-col items-center justify-center p-12 text-center'>
                                <EyeOff className='w-12 h-12 text-gray-400 mb-4' />
                                <h3 className='text-lg font-semibold mb-2'>This resume is private</h3>
                                <p className='text-sm text-gray-500 mb-4'>Toggle visibility to preview or download your resume.</p>
                                <div className='flex gap-2'>
                                    <button
                                        type='button'
                                        onClick={changeResumeVisibility}
                                        className='px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700'
                                    >
                                        Make Public
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Resume_Builder 