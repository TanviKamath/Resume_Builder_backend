import React, { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Resume_Preview from '../components/Resume_Preview'
import { dummyResumeData } from '../../assets/assets'
import { ArrowLeftIcon, ZoomIn, ZoomOut, Maximize2, Share2, Download } from 'lucide-react'

const Preview: React.FC = () => {
    const { resumeId } = useParams<{ resumeId?: string }>()
    // If no resumeId supplied, show the first dummy resume. If resumeId is supplied but not found, show not-found.
    const resume = resumeId ? dummyResumeData.find(r => r._id === resumeId) : dummyResumeData[0]

    if (!resume) {
        return (
            <div className='min-h-screen bg-gray-100 p-6 flex items-center justify-center'>
                <div className='bg-white p-8 rounded-md shadow text-center'>
                    <h2 className='text-2xl font-semibold mb-2'>Resume not found</h2>
                    <p className='text-sm text-gray-600 mb-4'>We couldn't find a resume for the link you followed.</p>
                    <div className='flex justify-center gap-3'>
                        <Link to='/app' className='px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700'>Back to Builder</Link>
                    </div>
                </div>
            </div>
        )
    }

    const containerRef = useRef<HTMLDivElement | null>(null)
    const previewRef = useRef<HTMLDivElement | null>(null)
    const [scale, setScale] = useState<number>(1)
    const [mode, setMode] = useState<'auto' | 'manual'>('auto')
    const baseWidth = 800

    useEffect(() => {
        const compute = () => {
            const container = containerRef.current
            const preview = previewRef.current
            if (!container || !preview) return

            const cw = container.clientWidth
            const ch = container.clientHeight
            const pw = baseWidth
            const ph = preview.scrollHeight

            const sx = cw / pw
            const sy = ch / ph
            const s = Math.min(sx, sy, 1)
            if (mode === 'auto') setScale(s)
        }

        compute()
        const ro = new ResizeObserver(compute)
        if (containerRef.current) ro.observe(containerRef.current)
        window.addEventListener('resize', compute)
        return () => {
            ro.disconnect()
            window.removeEventListener('resize', compute)
        }
    }, [resume, mode])

    const zoomIn = () => {
        setMode('manual')
        setScale((s) => Math.min(s * 1.1, 2))
    }
    const zoomOut = () => {
        setMode('manual')
        setScale((s) => Math.max(s / 1.1, 0.25))
    }
    const fitWidth = () => {
        const container = containerRef.current
        if (!container) return
        const cw = container.clientWidth
        setMode('manual')
        setScale(Math.min(cw / baseWidth, 1))
    }
    const fitHeight = () => {
        const container = containerRef.current
        const preview = previewRef.current
        if (!container || !preview) return
        const ch = container.clientHeight
        const ph = preview.scrollHeight
        setMode('manual')
        setScale(Math.min(ch / ph, 1))
    }
    const fitBoth = () => setMode('auto')

    const handleShare = async () => {
        const idVal = resume._id || 'preview'
        const url = `${window.location.origin}/view/${encodeURIComponent(idVal)}`
        try {
            if ((navigator as any).share) {
                await (navigator as any).share({ title: resume.title || 'Resume', url })
            } else if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(url)
                alert('Link copied to clipboard')
            } else {
                const ta = document.createElement('textarea')
                ta.value = url
                document.body.appendChild(ta)
                ta.select()
                document.execCommand('copy')
                document.body.removeChild(ta)
                alert('Link copied to clipboard')
            }
        } catch (err) {
            alert('Share failed')
        }
    }

    const handleDownload = () => {
        // Use print for download here; Resume_Preview has print CSS to isolate #resume-preview
        window.print()
    }

    return (
        <div className='min-h-screen bg-gray-100 p-6'>
            <div className='mb-4 flex items-center justify-between'>
                <Link to='/app' className='text-sm text-blue-600 hover:underline flex items-center'>
                    <ArrowLeftIcon className='w-4 h-4 mr-1' /> Back
                </Link>

                <div className='flex items-center gap-2'>
                    <div className='text-sm text-gray-600 mr-4'>Preview — full resume view</div>
                    <div className='flex items-center gap-2 bg-white shadow rounded-md px-2 py-1'>
                        <button onClick={zoomOut} title='Zoom out' className='p-1 rounded hover:bg-gray-100'>
                            <ZoomOut className='w-4 h-4' />
                        </button>
                        <button onClick={zoomIn} title='Zoom in' className='p-1 rounded hover:bg-gray-100'>
                            <ZoomIn className='w-4 h-4' />
                        </button>
                        <button onClick={fitWidth} title='Fit width' className='p-1 rounded hover:bg-gray-100'>
                            <Maximize2 className='w-4 h-4' />
                        </button>
                        <button onClick={fitBoth} title='Fit page' className='p-1 rounded hover:bg-gray-100'>
                            <div className='text-xs'>{Math.round(scale * 100)}%</div>
                        </button>
                        <button onClick={handleDownload} title='Download' className='p-1 rounded hover:bg-gray-100'>
                            <Download className='w-4 h-4' />
                        </button>
                        <button onClick={handleShare} title='Share' className='p-1 rounded hover:bg-gray-100'>
                            <Share2 className='w-4 h-4' />
                        </button>
                    </div>
                </div>
            </div>

            <div ref={containerRef} className='w-full h-[calc(100vh-120px)] flex items-start justify-center overflow-auto'>
                <div
                    ref={previewRef}
                    id='resume-preview'
                    style={{ transform: `scale(${scale})`, transformOrigin: 'top center', width: `${baseWidth}px` }}
                    className='shadow-lg bg-white'
                >
                    <Resume_Preview data={resume} template={resume.templates} accent_color={resume.accent_color} />
                </div>
            </div>
        </div>
    )
}

export default Preview