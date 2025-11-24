import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import ClassicTemplate from '../../assets/templates/ClassicTemplate'
import MinimalTemplate from '../../assets/templates/MinimalTemplate'
import MinimalImageTemplate from '../../assets/templates/MinimalImageTemplate'
import ModernTemplate from '../../assets/templates/ModernTemplate'

type TemplateSelectorProps = {
  value?: string
  onChange?: (template: string) => void
}

const TEMPLATES = [
  { id: 'classic', label: 'Classic' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'minimal-image', label: 'Minimal (Image)' },
  { id: 'modern', label: 'Modern' },
]

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ value = 'classic', onChange }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current) return
      if (!ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

  const handleSelect = (id: string) => {
    onChange && onChange(id)
    setOpen(false)
  }

  const currentLabel = TEMPLATES.find(t => t.id === value)?.label || 'Classic'

  const previewMap: Record<string, React.FC<any>> = {
    classic: ClassicTemplate as any,
    minimal: MinimalTemplate as any,
    'minimal-image': MinimalImageTemplate as any,
    modern: ModernTemplate as any,
  }

  return (
    <div className='relative' ref={ref}>
      <button
        type='button'
        onClick={() => setOpen(prev => !prev)}
        className='inline-flex items-center gap-2 px-3 py-1 rounded-md border border-gray-200 bg-white text-sm'
        aria-expanded={open}
        aria-haspopup='listbox'
      >
        <span className='font-medium'>Template</span>
        <span className='text-gray-600'>{currentLabel}</span>
        <ChevronDown className='w-4 h-4 text-gray-500' />
      </button>

      {open && (
        <div className='absolute z-30 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg p-3'>
          <div className='text-xs text-gray-500 mb-2'>Choose a template</div>
          <ul role='listbox' className='space-y-3'>
            {TEMPLATES.map(t => {
              const selected = value === t.id
              return (
                <li key={t.id}>
                  <button
                    onClick={() => handleSelect(t.id)}
                    className={`w-full text-left p-4 rounded-md border transition-colors flex items-start justify-between ${selected ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
                  >
                    <div>
                      <div className='text-sm font-semibold text-gray-900'>{t.label}</div>
                      <div className='mt-2 text-xs text-gray-500 max-w-xl'>
                        {t.id === 'classic' && 'A clean, traditional resume format with clear sections and professional typography.'}
                        {t.id === 'modern' && 'Sleek design with strategic use of color and modern font choices.'}
                        {t.id === 'minimal-image' && 'Minimal design with a single image and clean typography.'}
                        {t.id === 'minimal' && 'Ultra-clean design that puts your content front and center.'}
                      </div>
                    </div>
                    <div className='ml-4 flex-shrink-0 flex items-center'>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center ${selected ? 'bg-green-600 text-white' : 'bg-white border border-gray-200 text-gray-400'}`}>
                        <Check className='w-4 h-4' />
                      </div>
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default TemplateSelector
