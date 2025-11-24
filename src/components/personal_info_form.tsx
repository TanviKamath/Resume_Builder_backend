import React from 'react' 
import { BriefcaseBusiness, Globe, Linkedin, Mail, MapPin, Phone, User } from 'lucide-react'

type PersonalInfoFormProps = {
    data: any
    onChange?: (data: any) => void
    removeBackground?: boolean
    set?: (value: boolean) => void
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onChange, removeBackground = false, set }) => {
    const getImageSrc = () => {
        if (!data?.image) return undefined
        return typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image as Blob)
    }

    const handleChange = (field: string, value: any) => {
        if (onChange) onChange({ ...data, [field]: value })
    }

    const fields = [
        { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
        { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
        { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
        { key: "location", label: "Location", icon: MapPin, type: "text" },
        { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text" },
        { key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url" },
        { key: "website", label: "Personal Website", icon: Globe, type: "url" }
    ];


    const setRemoveBackground = (value: boolean) => {
        if (set) {
            set(value)
        }
    }

    return (
        <div className='bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm'>
            {/* Header */}
            <div className='flex items-start justify-between'>
                <div>
                    <h3 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>Personal Information</h3>
                    <p className='text-sm text-gray-500 dark:text-gray-300 mt-1'>Get Started with the personal information</p>
                </div>
            </div>

            {/* Avatar row */}
            <div className='mt-4 flex items-center gap-6'>
                <label htmlFor='profile-image' className='relative w-28 h-28 rounded-full overflow-hidden flex-shrink-0 cursor-pointer border-2 border-gray-100 shadow-sm'>
                    {data?.image ? (
                        <img
                            src={getImageSrc()}
                            alt='user-image'
                            className='w-full h-full object-cover'
                        />
                    ) : (
                        <div className='w-full h-full bg-gray-100 flex items-center justify-center'>
                            <User className='w-10 h-10 text-gray-400' />
                        </div>
                    )}

                    <input
                        type='file'
                        name='profile-image'
                        id='profile-image'
                        accept='image/jpeg, image/png'
                        className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const file = e.target.files && e.target.files[0]
                            if (file) handleChange('image', file)
                        }}
                    />
                </label>

                {typeof data?.image === 'object' && (
                    <div className='flex items-center gap-4'>
                        <div className='text-sm text-gray-700 dark:text-gray-200'>Remove Background</div>
                        <label className='relative inline-flex items-center cursor-pointer'>
                            <input
                                type='checkbox'
                                name='remove-background'
                                className='sr-only'
                                onChange={() => setRemoveBackground(!removeBackground)}
                                checked={!!removeBackground}
                                aria-label='Remove background'
                            />
                            <div className={`w-10 h-6 rounded-full transition-colors duration-200 ${removeBackground ? 'bg-green-500' : 'bg-slate-300'}`} />
                            <span
                                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out ${removeBackground ? 'translate-x-4' : ''}`}
                            />
                        </label>
                    </div>
                )}
            </div>

            {/* Fields stacked vertically */}
            <div className='mt-6 space-y-4'>
                {fields.map((field) => {
                    const Icon = field.icon
                    return (
                        <div key={field.key}>
                            <label htmlFor={field.key} className='flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                                <Icon className='w-4 h-4 text-gray-400' />
                                <span>{field.label}</span>
                                {field.required && <span className='text-red-500'>*</span>}
                            </label>
                            <input
                                type={field.type}
                                id={field.key}
                                name={field.key}
                                required={field.required}
                                value={data?.[field.key] ?? ''}
                                onChange={(e) => handleChange(field.key, e.target.value)}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-white'
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PersonalInfoForm