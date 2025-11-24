import React from 'react'
import { GraduationCap } from 'lucide-react'

type EducationItem = {
  id: string
  school: string
  degree: string
  field_of_study?: string
  start_date?: string
  end_date?: string
  is_current?: boolean
  description?: string
  grade?: string
}

type Props = {
  data?: EducationItem[]
  onChange?: (arr: EducationItem[]) => void
}

const emptyEntry = (): EducationItem => ({
  id: Date.now().toString(),
  school: '',
  degree: '',
  field_of_study: '',
  start_date: '',
  end_date: '',
  is_current: false,
  description: '',
  grade: '',
})

export default function EducationForm({ data = [], onChange }: Props) {
  const setEntry = (index: number, update: Partial<EducationItem>) => {
    const copy = Array.isArray(data) ? [...data] : []
    copy[index] = { ...copy[index], ...update }
    onChange && onChange(copy)
  }

  const addEntry = () => {
    const copy = Array.isArray(data) ? [...data] : []
    copy.push(emptyEntry())
    onChange && onChange(copy)
  }

  const removeEntry = (index: number) => {
    const copy = Array.isArray(data) ? [...data] : []
    copy.splice(index, 1)
    onChange && onChange(copy)
  }

  return (
    <div className='bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm'>
      <div className='flex items-start justify-between'>
        <div>
          <h3 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>Education</h3>
          <p className='text-sm text-gray-500 dark:text-gray-300 mt-1'>Add your schools, degrees and dates.</p>
        </div>
        <div className='text-sm text-gray-400'>
          <button
            type='button'
            onClick={addEntry}
            className='px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600'
          >
            + Add
          </button>
        </div>
      </div>

      <div className='mt-4 space-y-4'>
        {(Array.isArray(data) ? data : []).map((entry, idx) => (
          <div key={entry.id || idx} className='border border-gray-200 rounded-md p-3 bg-gray-50 dark:bg-slate-700'>
            <div className='flex items-start justify-between'>
              <div className='space-y-2 w-full'>
                <div className='flex gap-2'>
                  <input
                    type='text'
                    placeholder='School / Institution'
                    value={entry.school || ''}
                    onChange={(e) => setEntry(idx, { school: e.target.value })}
                    className='w-1/2 px-2 py-1 border border-gray-300 rounded-md dark:bg-slate-800'
                  />
                  <input
                    type='text'
                    placeholder='Degree (e.g., B.Sc, M.A.)'
                    value={entry.degree || ''}
                    onChange={(e) => setEntry(idx, { degree: e.target.value })}
                    className='w-1/2 px-2 py-1 border border-gray-300 rounded-md dark:bg-slate-800'
                  />
                </div>

                <div className='flex gap-2'>
                  <input
                    type='text'
                    placeholder='Field of study'
                    value={entry.field_of_study || ''}
                    onChange={(e) => setEntry(idx, { field_of_study: e.target.value })}
                    className='w-1/2 px-2 py-1 border border-gray-300 rounded-md dark:bg-slate-800'
                  />
                  <input
                    type='text'
                    placeholder='Grade / GPA (optional)'
                    value={entry.grade || ''}
                    onChange={(e) => setEntry(idx, { grade: e.target.value })}
                    className='w-1/2 px-2 py-1 border border-gray-300 rounded-md dark:bg-slate-800'
                  />
                </div>

                <div className='flex gap-2'>
                  <input
                    type='month'
                    placeholder='Start'
                    value={entry.start_date || ''}
                    onChange={(e) => setEntry(idx, { start_date: e.target.value })}
                    className='w-1/2 px-2 py-1 border border-gray-300 rounded-md dark:bg-slate-800'
                  />
                  <input
                    type='month'
                    placeholder='End'
                    value={entry.end_date || ''}
                    onChange={(e) => setEntry(idx, { end_date: e.target.value })}
                    className='w-1/2 px-2 py-1 border border-gray-300 rounded-md dark:bg-slate-800'
                  />
                </div>

                <div className='flex items-center gap-4'>
                  <label className='inline-flex items-center text-sm'>
                    <input
                      type='checkbox'
                      checked={!!entry.is_current}
                      onChange={(e) => setEntry(idx, { is_current: e.target.checked })}
                      className='mr-2'
                    />
                    <span>Currently studying (end date still editable)</span>
                  </label>
                </div>

                <div>
                  <textarea
                    placeholder='Notes (courses, honours, thesis)'
                    value={entry.description || ''}
                    onChange={(e) => setEntry(idx, { description: e.target.value })}
                    className='w-full px-2 py-1 border border-gray-300 rounded-md dark:bg-slate-800'
                    rows={3}
                  />
                </div>
              </div>

              <div className='ml-4'>
                <button
                  type='button'
                  onClick={() => removeEntry(idx)}
                  className='text-sm text-red-600 hover:underline'
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        {(!Array.isArray(data) || data.length === 0) && (
          <div className='text-sm text-gray-500 flex items-center gap-2'>
            <GraduationCap className='w-4 h-4 text-gray-400' />
            <span>No education added yet. Use the Add button to create an entry.</span>
          </div>
        )}
      </div>
    </div>
  )
}
