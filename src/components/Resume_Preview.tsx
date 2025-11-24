import React from 'react'
import ClassicTemplate from '../../assets/templates/ClassicTemplate'
import MinimalTemplate from '../../assets/templates/MinimalTemplate'
import MinimalImageTemplate from '../../assets/templates/MinimalImageTemplate'
import ModernTemplate from '../../assets/templates/ModernTemplate'

type ResumePreviewProps = {
  data: any
  template?: string
  accent_color?: string
  classes?: string
}

const Resume_Preview: React.FC<ResumePreviewProps> = ({ data, template = 'classic', accent_color = '#3B82F6', classes = '' }) => {
  const renderTemplate = () => {
    switch (template) {
      case 'classic':
        return <ClassicTemplate data={data} accentColor={accent_color} />
      case 'minimal':
        return <MinimalTemplate data={data} accentColor={accent_color} />
      case 'minimal-image':
        return <MinimalImageTemplate data={data} accentColor={accent_color} />
      case 'modern':
        return <ModernTemplate data={data} accentColor={accent_color} />
      default:
        return <ClassicTemplate data={data} accentColor={accent_color} />
    }
  }

  return (
    <div className='w-full bg-gray-100'>
      <div id='resume-preview' className={`max-w-4xl mx-auto p-6 bg-white shadow-md my-6 ${classes}`}>
        {renderTemplate()}
      </div>
      <style>
        {`
          @page { size: letter; margin: 0; }

          @media print {
            html, body {
              width: 8.5in;
              height: 11in;
              overflow: hidden;
            }

            /* hide everything by default */
            body * {
              visibility: hidden;
            }

            /* show only the preview and its children */
            #resume-preview, #resume-preview * {
              visibility: visible;
            }

            /* position the preview at the top-left and remove margins */
            #resume-preview {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              box-shadow: none !important;
              margin: 0 !important;
              background: white;
            }
          }
        `}
      </style>
    </div>
  )
}

export default Resume_Preview