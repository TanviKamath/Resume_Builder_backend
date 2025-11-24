import React, { useEffect, useRef, useState } from 'react'

type ColorPickerProps = {
  value?: string
  onChange?: (color: string) => void
}

const SWATCHES = [
  '#000000', // black
//   '#10B981', // green
//   '#059669',
//   '#16A34A',
//   '#84CC16',
//   '#F59E0B',
//   '#F97316',
//   '#EF4444',
//   '#3B82F6',
//   '#6366F1',
  '#0EA5A4'
]

function rgbToHex(r: number, g: number, b: number) {
  const toHex = (v: number) => v.toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
}

const ColorPicker: React.FC<ColorPickerProps> = ({ value = '#10B981', onChange }) => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [showPicker, setShowPicker] = useState(false)

  useEffect(() => {
    function handleDocClick(e: MouseEvent) {
      if (!containerRef.current) return
      if (!containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleDocClick)
    return () => document.removeEventListener('mousedown', handleDocClick)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !showPicker) return

    const dpr = window.devicePixelRatio || 1
    const displayWidth = 220
    const displayHeight = 140
    canvas.width = displayWidth * dpr
    canvas.height = displayHeight * dpr
    canvas.style.width = `${displayWidth}px`
    canvas.style.height = `${displayHeight}px`

    const ctx = canvas.getContext('2d')!
    ctx.scale(dpr, dpr)

    // Horizontal hue gradient
    const hueGrad = ctx.createLinearGradient(0, 0, displayWidth, 0)
    hueGrad.addColorStop(0, 'rgb(255,0,0)')
    hueGrad.addColorStop(0.17, 'rgb(255,255,0)')
    hueGrad.addColorStop(0.33, 'rgb(0,255,0)')
    hueGrad.addColorStop(0.5, 'rgb(0,255,255)')
    hueGrad.addColorStop(0.67, 'rgb(0,0,255)')
    hueGrad.addColorStop(0.83, 'rgb(255,0,255)')
    hueGrad.addColorStop(1, 'rgb(255,0,0)')
    ctx.fillStyle = hueGrad
    ctx.fillRect(0, 0, displayWidth, displayHeight)

    // Vertical white -> transparent overlay
    const whiteGrad = ctx.createLinearGradient(0, 0, 0, displayHeight)
    whiteGrad.addColorStop(0, 'rgba(255,255,255,1)')
    whiteGrad.addColorStop(0.5, 'rgba(255,255,255,0)')
    ctx.fillStyle = whiteGrad
    ctx.fillRect(0, 0, displayWidth, displayHeight)

    // Vertical transparent -> black
    const blackGrad = ctx.createLinearGradient(0, 0, 0, displayHeight)
    blackGrad.addColorStop(0, 'rgba(0,0,0,0)')
    blackGrad.addColorStop(1, 'rgba(0,0,0,1)')
    ctx.fillStyle = blackGrad
    ctx.fillRect(0, 0, displayWidth, displayHeight)
  }, [showPicker])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = Math.round((e.clientX - rect.left) * (canvas.width / rect.width))
    const y = Math.round((e.clientY - rect.top) * (canvas.height / rect.height))
    const ctx = canvas.getContext('2d')!
    const pixel = ctx.getImageData(x, y, 1, 1).data
    const hex = rgbToHex(pixel[0], pixel[1], pixel[2])
    onChange && onChange(hex)
    setShowPicker(false)
    setOpen(false)
  }

  

  return (
    <div className='relative inline-block' ref={containerRef}>
      <button
        type='button'
        aria-haspopup='true'
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className='flex items-center justify-center w-9 h-9 rounded-full shadow-sm border border-gray-200'
        title='Pick accent color'
      >
        <div className='w-7 h-7 rounded-full flex items-center justify-center' style={{ backgroundColor: value }}>
          <span role='img' aria-hidden className='text-white text-xs'>🎨</span>
        </div>
      </button>

      {open && (
        <div className='absolute z-50 mt-2 p-3 bg-white rounded-lg shadow-lg w-max' style={{ minWidth: 260 }}>
          <div className='flex flex-col gap-3'>
            <div className='flex items-center gap-3'>
              <div className='flex items-center gap-3'>
                {SWATCHES.map((c) => {
                  const selected = value?.toLowerCase() === c.toLowerCase()
                  return (
                    <button
                      key={c}
                      type='button'
                      onClick={() => {
                        onChange && onChange(c)
                        setOpen(false)
                      }}
                      aria-label={`Select ${c}`}
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${selected ? 'ring-4 ring-offset-1 ring-green-500' : 'border border-gray-200'}`}
                      style={{ backgroundColor: c }}
                    />
                  )
                })}
              </div>

              <div className='ml-1 flex items-center gap-2'>
                <input
                  type='color'
                  value={value}
                  onChange={(e) => onChange && onChange(e.target.value)}
                  className='w-8 h-8 p-0 border-0 bg-transparent rounded-md'
                  aria-label='Custom color'
                />
                <input
                  type='text'
                  value={value}
                  onChange={(e) => onChange && onChange(e.target.value)}
                  className='w-20 text-xs px-2 py-1 border border-gray-200 rounded-md'
                  aria-label='Hex color'
                />
              </div>
            </div>

            {showPicker && (
              <div className='p-2 border border-gray-200 rounded-md bg-white'>
                <canvas
                  ref={canvasRef}
                  onClick={handleCanvasClick}
                  className='cursor-crosshair rounded-md block'
                  style={{ width: 220, height: 140, display: 'block' }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ColorPicker
