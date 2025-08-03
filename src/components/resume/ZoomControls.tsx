import React from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2 } from 'lucide-react';

interface ZoomControlsProps {
  currentZoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onToggleFullscreen: () => void;
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({
  currentZoom,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onToggleFullscreen
}) => {
  const zoomLevels = [0.25, 0.33, 0.5, 0.65, 0.75, 0.85, 1.0, 1.25, 1.5, 2.0];
  const currentZoomIndex = zoomLevels.findIndex(level => Math.abs(level - currentZoom) < 0.01);
  
  // Calculate progress for smooth progress bar
  const getZoomProgress = () => {
    const minZoom = zoomLevels[0];
    const maxZoom = zoomLevels[zoomLevels.length - 1];
    return ((currentZoom - minZoom) / (maxZoom - minZoom)) * 100;
  };

  return (
    <div className="sticky top-4 z-20 mb-6">
      <div className="flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-3 flex items-center space-x-3">
          {/* Zoom Out */}
          <button
            onClick={onZoomOut}
            disabled={currentZoom <= zoomLevels[0]}
            className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
            title="Zoom Out (Ctrl + -)"
          >
            <ZoomOut className="w-4 h-4 text-gray-600" />
          </button>

          {/* Zoom Level Display */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700 min-w-[60px] text-center">
              {Math.round(currentZoom * 100)}%
            </span>
            <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden relative">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${getZoomProgress()}%` }}
              />
              {/* Zoom level indicators */}
              {zoomLevels.map((level, index) => (
                <div
                  key={index}
                  className="absolute top-0 w-0.5 h-full bg-white opacity-30"
                  style={{ left: `${((level - zoomLevels[0]) / (zoomLevels[zoomLevels.length - 1] - zoomLevels[0])) * 100}%` }}
                />
              ))}
            </div>
          </div>

          {/* Zoom In */}
          <button
            onClick={onZoomIn}
            disabled={currentZoom >= zoomLevels[zoomLevels.length - 1]}
            className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
            title="Zoom In (Ctrl + +)"
          >
            <ZoomIn className="w-4 h-4 text-gray-600" />
          </button>

          {/* Reset Zoom */}
          <button
            onClick={onResetZoom}
            className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-110"
            title="Reset Zoom (Ctrl + 0)"
          >
            <RotateCcw className="w-4 h-4 text-gray-600" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={onToggleFullscreen}
            className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-110"
            title="Toggle Fullscreen (F11)"
          >
            <Maximize2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="text-center mt-2">
        <p className="text-xs text-gray-500">
          Use <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Ctrl + / -</kbd> to zoom, 
          <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs ml-1">Ctrl + 0</kbd> to reset, 
          or <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs ml-1">Ctrl + Scroll</kbd> for smooth zoom
        </p>
      </div>
    </div>
  );
};