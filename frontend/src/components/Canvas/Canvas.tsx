'use client'

import { FC, useEffect, useState } from 'react'
import { useDraw } from '../../hooks/useDraw'
import { ChromePicker } from 'react-color'

import { io } from 'socket.io-client'
import { drawLine } from '../../utils/drawLine'
const socket = io('http://localhost:5555')

interface pageProps {}

type DrawLineProps = {
  prevPoint: Point | null
  currentPoint: Point
  color: string
}

interface CanvasProps {
  roomId: string; // Add this line
}

// interface ColorResult {
//   hex: string;
// }

const Canvas: FC<CanvasProps> = ({ roomId }) => {
  const [color, setColor] = useState<string>('#000')
  const { canvasRef, onMouseDown, clear } = useDraw(createLine)

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')

    // socket.emit('client-ready')

    socket.emit('join-room', { roomId: roomId }) // Emit join-room event with roomId

    socket.on('get-canvas-state', () => {
      if (!canvasRef.current?.toDataURL()) return
      
      console.log('sending canvas state');
      socket.emit('canvas-state', { roomId: roomId, state: canvasRef.current.toDataURL() });
      // socket.emit('canvas-state', canvasRef.current.toDataURL())
    })

    socket.on('canvas-state-from-server', (state: string) => {
      console.log('I received the state');
      const img = new Image()
      img.src = state
      img.onload = () => {
        ctx?.drawImage(img, 0, 0)
      }
    })

    socket.on('draw-line', ({ prevPoint, currentPoint, color }: DrawLineProps) => {
      if (!ctx) return console.log('no ctx here')
      drawLine({ prevPoint, currentPoint, ctx, color })
    })

    socket.emit('clear', { roomId });

    return () => {
      socket.emit('leave-room', roomId); // Optional: Implement leave-room logic on server
      socket.off('draw-line');
      socket.off('set-canvas-state');
      socket.off('canvas-state-from-server');
      socket.off('clear');
    }
  }, [canvasRef, roomId])

  function createLine({ prevPoint, currentPoint, ctx }: Draw) {
    socket.emit('draw-line', { roomId, prevPoint, currentPoint, color })
    drawLine({ prevPoint, currentPoint, ctx, color })
  }

  function handleClearCanvas() {
    socket.emit('clear', { roomId });
    clear();
  }

  return (
    <div className='w-screen h-screen bg-white flex justify-center items-center'>
      <div className='flex flex-col gap-10 pr-10'>
        <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
        {/* <ChromePicker color={color} onChange={(colorResult: ColorResult) => setColor(colorResult.hex)} /> */}
        <button
          type='button'
          className='p-2 rounded-md border border-black'
          
          onClick={handleClearCanvas}>
          Clear canvas
        </button>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        width={750}
        height={750}
        className='border border-black rounded-md'
      />
    </div>
  )
}

export default Canvas;