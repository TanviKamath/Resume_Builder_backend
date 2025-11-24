import React, { useMemo } from 'react'

type PersonalSummaryFormProps = {
  data: any
  onChange?: (data: any) => void
  maxLength?: number
}

const PersonalSummaryForm: React.FC<PersonalSummaryFormProps> = ({ data, onChange, maxLength = 1000 }) => {
  const handleChange = (value: string) => {
    if (onChange) onChange({ ...data, summary: value })
  }

  const summary = data?.summary ?? ''

  const remaining = useMemo(() => Math.max(0, maxLength - summary.length), [maxLength, summary.length])

  return (
    <div className='bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm'>
      <div className='flex items-start justify-between'>
        <div>
          <h3 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>Professional Summary</h3>
          <p className='text-sm text-gray-500 dark:text-gray-300 mt-1'>A short professional summary highlighting your experience and goals.</p>
        </div>
        <div className='flex items-center gap-1 px-2 py-0.5 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white'>
          <span className='text-sm leading-4'>✨</span>
          <span className='text-xs font-medium'>AI enhancer</span>
        </div>
      </div>

      <div className='mt-4'>
        <label htmlFor='professional-summary' className='sr-only'>Professional summary</label>
        <textarea
          id='professional-summary'
          value={summary}
          onChange={(e) => handleChange(e.target.value)}
          rows={5}
          maxLength={maxLength}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-white'
          placeholder='Write a brief professional summary or elevator pitch that highlights your strengths.'
        />

        <div className='mt-2 text-right text-xs text-gray-500 dark:text-gray-300'>
          <span className='font-medium'>{summary.length}</span>
          <span className='text-slate-400'> / </span>
          <span>{maxLength}</span>
          <span className='ml-2'>({remaining} remaining)</span>
        </div>
      </div>
    </div>
  )
}

export default PersonalSummaryForm
