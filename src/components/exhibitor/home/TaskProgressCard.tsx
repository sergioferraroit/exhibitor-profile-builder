import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Task {
  id: string;
  label: string;
  completed: boolean;
  dueDate?: string;
  overdue?: boolean;
  mandatory?: number;
  link?: string;
}

const tasks: Task[] = [
  { id: '1', label: 'Edit company profile', completed: false, dueDate: '24th Jan 2025', overdue: true, link: '/edit-company-profile' },
  { id: '2', label: 'Manage sharers', completed: false, dueDate: '6th Feb 2025', overdue: true, link: '/manage-shares' },
  { id: '3', label: 'Admin, marketing and operations', completed: false, dueDate: '14th Feb 2025', mandatory: 7, link: '/admin-marketing-operations' },
  { id: '4', label: 'Invite customers', completed: true, dueDate: '16th Feb 2025', link: '/invite-customers' },
  { id: '5', label: 'Manage badges', completed: true, dueDate: '24th Jan 2025', link: '/allocate-badges' },
  { id: '6', label: 'Create Offer to capture leads', completed: true, dueDate: '24th Jan 2025', link: '/create-offer' },
  { id: '7', label: 'View Exhibitor manual', completed: false, dueDate: '1st Mar 2025', link: '/exhibitor-manual' },
  { id: '8', label: 'Custom task for operations', completed: false, dueDate: '1st Mar 2025' },
  { id: '9', label: 'Explore the shop', completed: true, dueDate: '3rd Mar 2025', link: '/shop' },
  { id: '10', label: 'Upgrade package', completed: true, dueDate: '3rd Mar 2025', link: '/shop' },
  { id: '11', label: 'Set up meetings', completed: false, dueDate: '10th Mar 2025' },
  { id: '12', label: 'Upload documents for Colleqt', completed: false, dueDate: '10th Mar 2025' },
  { id: '13', label: 'Set up Lead Manager App', completed: false, dueDate: '10th Mar 2025', link: '/lead-manager-app' },
];

export const TaskProgressCard = () => {
  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercentage = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-900">Task progress</h2>
        <span className="text-sm text-gray-600">{progressPercentage}%</span>
      </div>
      
      <Progress value={progressPercentage} className="h-2 mb-2" />
      
      <p className="text-sm text-gray-500 mb-4">
        <span className="inline-flex items-center gap-1">
          <span className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center text-xs">i</span>
          {completedCount} of {tasks.length} tasks completed
        </span>
      </p>

      <div className="space-y-1 max-h-[500px] overflow-y-auto">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

const TaskItem = ({ task }: { task: Task }) => {
  const content = (
    <div className="flex items-center justify-between py-3 px-2 hover:bg-gray-50 rounded-md cursor-pointer group border-b border-gray-100 last:border-0">
      <div className="flex items-start gap-3">
        <Checkbox checked={task.completed} className="mt-0.5" />
        <div>
          <span className="text-sm text-gray-900">{task.label}</span>
          <div className="flex items-center gap-2 mt-0.5">
            {task.completed ? (
              <span className="text-xs text-green-600 flex items-center gap-1">
                <span className="w-3 h-3">✓</span> Completed
              </span>
            ) : task.overdue ? (
              <span className="text-xs text-red-500 flex items-center gap-1">
                ⊗ Overdue {task.dueDate}
              </span>
            ) : (
              <span className="text-xs text-gray-500 flex items-center gap-1">
                ⊙ Due {task.dueDate}
              </span>
            )}
            {task.mandatory && (
              <span className="text-xs text-orange-500">{task.mandatory} mandatory</span>
            )}
          </div>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
    </div>
  );

  if (task.link) {
    return <Link to={task.link}>{content}</Link>;
  }
  return content;
};
