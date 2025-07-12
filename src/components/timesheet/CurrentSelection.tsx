import React from 'react';
import { Project, Subproject } from '../TimeTracker';
import { generateProjectColor, isColorCodedProjectsEnabled } from '@/lib/projectColors';

interface CurrentSelectionProps {
  selectedProject: Project;
  selectedSubproject: Subproject;
}

const CurrentSelection: React.FC<CurrentSelectionProps> = ({
  selectedProject,
  selectedSubproject
}) => {
  const colorCodedEnabled = isColorCodedProjectsEnabled();

  const getProjectBackgroundStyle = () => {
    if (!colorCodedEnabled) return {};
    return {
      background: `linear-gradient(135deg, ${generateProjectColor(selectedProject.name)}40, ${generateProjectColor(selectedProject.name)}20)`,
      borderLeft: `4px solid ${generateProjectColor(selectedProject.name)}`
    };
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div 
          className="flex items-center justify-between p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200/60 dark:border-gray-700/60"
          style={getProjectBackgroundStyle()}
        >
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-lg"></div>
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                Currently Tracking
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Project</div>
                <div className="text-lg font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                  {selectedProject.name}
                </div>
              </div>
              
              <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
              
              <div className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Subproject</div>
                <div className="text-lg font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                  {selectedSubproject.name}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Ready to Track
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentSelection;