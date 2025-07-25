import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ChevronLeft, ChevronRight, Download, Filter } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';

interface TimeBreakdownHeaderProps {
  dateRange: { start: Date; end: Date };
  onDateRangeChange: (type: 'start' | 'end', date: Date | undefined) => void;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  onCurrentWeek: () => void;
  onExportCSV: () => void;
  uniqueProjects: Array<{ projectName: string; subprojects: Set<string> }>;
  selectedProjects: Set<string>;
  onProjectToggle: (projectName: string) => void;
  isProjectFilterOpen: boolean;
  onProjectFilterOpenChange: (open: boolean) => void;
}

const TimeBreakdownHeader: React.FC<TimeBreakdownHeaderProps> = ({
  dateRange,
  onDateRangeChange,
  onPreviousWeek,
  onNextWeek,
  onCurrentWeek,
  onExportCSV,
  uniqueProjects,
  selectedProjects,
  onProjectToggle,
  isProjectFilterOpen,
  onProjectFilterOpenChange
}) => {
  const handleDateRangeChange = (type: 'start' | 'end', date: Date | undefined) => {
    if (!date) return;
    onDateRangeChange(type, date);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-4">
        <Button onClick={onPreviousWeek} variant="outline" size="sm" className="border border-[#B0B0B0] text-black">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <div className="flex items-center gap-2">
            <Label className="text-[#4D4D4D] font-medium">From:</Label>
            <input
              type="date"
              value={format(dateRange.start, 'yyyy-MM-dd')}
              onChange={(e) => handleDateRangeChange('start', new Date(e.target.value))}
              className="border border-[#B0B0B0] rounded px-2 py-1"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Label className="text-[#4D4D4D] font-medium">To:</Label>
            <input
              type="date"
              value={format(dateRange.end, 'yyyy-MM-dd')}
              onChange={(e) => handleDateRangeChange('end', new Date(e.target.value))}
              className="border border-[#B0B0B0] rounded px-2 py-1"
            />
          </div>
        </div>
        
        <Button onClick={onNextWeek} variant="outline" size="sm" className="border border-[#B0B0B0] text-black">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex items-center gap-4">
        <Popover open={isProjectFilterOpen} onOpenChange={onProjectFilterOpenChange}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="border border-[#4D4D4D] text-[#4D4D4D] hover:bg-[#4D4D4D] hover:text-white flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter Projects
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-4 bg-white border border-[#B0B0B0] shadow-lg">
            <div className="space-y-3">
              <h4 className="font-bold text-[#4D4D4D] border-b border-[#E0E0E0] pb-2">Select Projects</h4>
              <div className="max-h-60 overflow-y-auto">
                {uniqueProjects.map(project => (
                  <div key={project.projectName} className="flex items-center gap-2 py-1">
                    <Checkbox
                      id={`project-${project.projectName}`}
                      checked={selectedProjects.has(project.projectName)}
                      onCheckedChange={() => onProjectToggle(project.projectName)}
                    />
                    <Label htmlFor={`project-${project.projectName}`} className="text-[#4D4D4D]">
                      {project.projectName}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="flex justify-end pt-2 border-t border-[#E0E0E0]">
                <Button 
                  size="sm" 
                  onClick={() => onProjectFilterOpenChange(false)}
                  className="bg-[#4D4D4D] text-white hover:bg-[#7D7D7D]"
                >
                  Apply
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <Button 
          onClick={onExportCSV}
          variant="outline" 
          className="border border-[#4D4D4D] text-[#4D4D4D] hover:bg-[#4D4D4D] hover:text-white flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
        
        <Button onClick={onCurrentWeek} className="bg-[#4D4D4D] text-white hover:bg-[#7D7D7D]">
          This Week
        </Button>
      </div>
    </div>
  );
};

export default TimeBreakdownHeader;