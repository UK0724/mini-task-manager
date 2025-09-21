import { Button } from '../ui/button'
import { Check, Edit, Trash2 } from 'lucide-react'
import type { Task } from '../../types'

interface TaskCardProps {
  task: Task
  onToggle: (id: string, status: boolean) => void
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

export function TaskCard({ task, onToggle, onEdit, onDelete }: TaskCardProps) {
  return (
    <div className="border rounded-lg p-4 flex items-start justify-between">
      <div className="flex items-start space-x-3">
        <Button
          variant={task.status ? 'default' : 'outline'}
          size="sm"
          className="h-6 w-6 rounded-full"
          onClick={() => onToggle(task._id, !task.status)}
        >
          {task.status && <Check className="h-4 w-4" />}
        </Button>
        <div>
          <h3 className={`font-medium ${task.status ? 'line-through text-gray-500' : ''}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className={`text-sm text-gray-600 ${task.status ? 'line-through' : ''}`}>
              {task.description}
            </p>
          )}
        </div>
      </div>
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(task)}
          className="h-10 w-10 cursor-pointer"
        >
          <Edit className="h-8 w-8" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(task._id)}
          className="h-10 w-10 text-red-500 cursor-pointer hover:text-red-600"
        >
          <Trash2 className="h-8 w-8" />
        </Button>
      </div>
    </div>
  )
}