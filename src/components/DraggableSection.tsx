import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { GripVertical } from 'lucide-react';

interface DraggableSectionProps {
  id: string;
  index: number;
  children: React.ReactNode;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  title: string;
}

const DraggableSection: React.FC<DraggableSectionProps> = ({
  id,
  index,
  children,
  onMove,
  title
}) => {
  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: 'section',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'section',
    hover: (item: { id: string; index: number }) => {
      if (!item) return;
      
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  return (
    <div
      ref={(node) => dragPreview(drop(node))}
      className={`transition-all duration-200 ${
        isDragging ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div
            ref={drag}
            className="cursor-move p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <GripVertical className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DraggableSection;