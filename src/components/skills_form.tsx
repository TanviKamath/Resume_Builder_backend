import React from 'react'

type SkillItem = {
  id: string
  name: string
  level?: string
}

type Props = {
  data?: SkillItem[]
  onChange?: (arr: SkillItem[]) => void
}

const emptySkill = (): SkillItem => ({ id: Date.now().toString(), name: '', level: '' })

export default function SkillsForm({ data = [], onChange }: Props) {
  const setSkill = (index: number, update: Partial<SkillItem>) => {
    const copy = Array.isArray(data) ? [...data] : []
    copy[index] = { ...copy[index], ...update }
    onChange && onChange(copy)
  }

  const addSkill = () => {
    const copy = Array.isArray(data) ? [...data] : []
    copy.push(emptySkill())
    onChange && onChange(copy)
  }

  const removeSkill = (index: number) => {
    const copy = Array.isArray(data) ? [...data] : []
    copy.splice(index, 1)
    onChange && onChange(copy)
  }

  return (
    <div className='bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm'>
      <div className='flex items-start justify-between'>
        <div>
          <h3 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>Skills</h3>
          <p className='text-sm text-gray-500 dark:text-gray-300 mt-1'>Add your skills and optionally a proficiency level.</p>
        </div>
        <div className='text-sm text-gray-400'>
          <button
            type='button'
            onClick={addSkill}
            className='px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600'
          >
            + Add
          </button>
        </div>
      </div>

      <div className='mt-4 space-y-3'>
        {(Array.isArray(data) ? data : []).map((s, idx) => (
          <div key={s.id || idx} className='flex items-center gap-3'>
            <input
              type='text'
              placeholder='Skill (e.g., React, Python)'
              value={s.name || ''}
              onChange={(e) => setSkill(idx, { name: e.target.value })}
              className='flex-1 px-2 py-1 border border-gray-300 rounded-md dark:bg-slate-800'
            />

            <select
              value={s.level || ''}
              onChange={(e) => setSkill(idx, { level: e.target.value })}
              className='w-36 px-2 py-1 border border-gray-300 rounded-md dark:bg-slate-800'
            >
              <option value=''>Level</option>
              <option value='Beginner'>Beginner</option>
              <option value='Intermediate'>Intermediate</option>
              <option value='Advanced'>Advanced</option>
              <option value='Expert'>Expert</option>
            </select>

            <button
              type='button'
              onClick={() => removeSkill(idx)}
              className='text-sm text-red-600 hover:underline'
            >
              Remove
            </button>
          </div>
        ))}

        {(!Array.isArray(data) || data.length === 0) && (
          <div className='text-sm text-gray-500'>No skills added yet. Use the Add button to create an entry.</div>
        )}
      </div>
    </div>
  )
}
