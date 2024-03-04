'use client'
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

import { FC, useEffect, useState, useRef } from 'react'
import { useDraw } from '../../hooks/useDraw'
import { ChromePicker } from 'react-color'

import { io } from 'socket.io-client'
import { drawLine } from '../../utils/drawLine'
const socket = io('http://localhost:5555')


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
  const [color, setColor] = useState<string>('#fff')
  const { canvasRef, onMouseDown, clear } = useDraw(createLine)
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [pickerPosition, setPickerPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const pickerRef = useRef<HTMLDivElement>(null); // Ref for the color picker container

  const username = useSelector((state: RootState) => state.user.username);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')

    // socket.emit('client-ready')

    socket.emit('join-room', { roomId: roomId, username: username }) // Emit join-room event with roomId

    socket.on('get-canvas-state', () => {
      if (!canvasRef.current?.toDataURL()) return
      
      console.log('sending canvas state');
      socket.emit('canvas-state', { roomId: roomId, state: canvasRef.current.toDataURL() });
      // socket.emit('canvas-state', canvasRef.current.toDataURL())
    })

    socket.on('canvas-state-from-server', (data: {roomId:string, state:string}) => {
      if (data.roomId != roomId) return;
      console.log(data.state);
      console.log('I received the state');
      const img = new Image()
      img.src = data.state
      img.onload = () => {
        ctx?.drawImage(img, 0, 0)
      }
    })

    socket.on('draw-line', ({ prevPoint, currentPoint, color }: DrawLineProps) => {
      if (!ctx) return console.log('no ctx here')
      drawLine({ prevPoint, currentPoint, ctx, color })
    })

    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      socket.emit('leave-room', roomId); // Optional: Implement leave-room logic on server
      socket.off('draw-line');
      socket.off('set-canvas-state');
      socket.off('canvas-state-from-server');
      socket.off('clear');
    }
  }, [canvasRef, showPicker, roomId])

  function createLine({ prevPoint, currentPoint, ctx }: Draw) {
    socket.emit('draw-line', { roomId, prevPoint, currentPoint, color })
    drawLine({ prevPoint, currentPoint, ctx, color })
  }

  function handleClearCanvas() {
    socket.emit('clear', { roomId });
    clear();
    console.log("Cleared")
  }

  const onRightClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault(); // Prevent the default context menu from appearing
    setShowPicker(true);
    // Calculate and set the position for the color picker
    setPickerPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };
  
  return (
    <div className='w-screen h-screen bg-white flex justify-center items-center'>
      {showPicker && (
      <div
        ref={pickerRef}
        style={{
          position: 'absolute',
          top: `${pickerPosition.y}px`,
          left: `${pickerPosition.x}px`,
          zIndex: 2,
        }}
      >
        <ChromePicker
          color={color}
          onChangeComplete={(colorResult) => setColor(colorResult.hex)}
          disableAlpha={true} // Note: This might not work as expected without custom CSS
        />
      </div>
      )}
      <div className='flex flex-col gap-10 pr-10'>
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
        onContextMenu={onRightClick}
        width={750}
        height={750}
        className='border border-black rounded-md'
        style={{ backgroundColor: 'lightgray' }}
      />
    </div>
  );
}

export default Canvas;