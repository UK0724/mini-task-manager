import { useForm, Controller } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Checkbox } from '../ui/checkbox'

type TaskFormValues = {
  title: string
  description?: string
  status: boolean
}

interface TaskFormProps {
  initialData?: Partial<TaskFormValues> & { _id?: string }
  onSubmit: (data: TaskFormValues) => void
  onCancel: () => void
  isLoading?: boolean
}

export function TaskForm({ initialData, onSubmit, onCancel, isLoading }: TaskFormProps) {
  const { register, handleSubmit, control, formState: { errors } } = useForm<TaskFormValues>({
    defaultValues: initialData || { title: '', description: '', status: false },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...register('title', { required: 'Title is required' })}
          className={errors.title ? 'border-red-500' : ''}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>
      
      <div>
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          {...register('description')}
          rows={3}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="status"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <Label htmlFor="status">Completed</Label>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Task'}
        </Button>
      </div>
    </form>
  )
}