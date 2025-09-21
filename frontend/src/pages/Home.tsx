import { useState, useEffect } from 'react'
import { Button } from '../components/ui/button'
import { TaskCard } from '../components/task/TaskCard'
import { TaskForm } from '../components/task/TaskForm'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog'
import { taskApi } from '../lib/api'
import type { Task, UpdateTask } from '../types'
import toast from 'react-hot-toast'
import Navbar from '@/components/ui/Navbar'
import { Skeleton } from '@/components/ui/skeleton'

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const fetchTasks = async () => {
    try {
      const { data } = await taskApi.getTasks()
      setTasks(data.data)
    } catch (error) {
      toast.error('Failed to fetch tasks')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleCreateTask = async (data: Task) => {
    try {
      setIsUpdating(true)
      await taskApi.createTask(data)
      await fetchTasks()
      setIsDialogOpen(false)
      setIsUpdating(false)
      toast.success('Task created successfully')
    } catch (error) {
      setIsUpdating(false)
      toast.error('Failed to create task')
    }
  }

  const handleUpdateTask = async (id: string, data: UpdateTask) => {
    try {
      setIsUpdating(true)
      await taskApi.updateTask(id, data)
      await fetchTasks()
      setEditingTask(null)
      setIsDialogOpen(false)
      setIsUpdating(false)
      toast.success('Task updated successfully')
    } catch (error) {
      toast.error('Failed to update task')
    }
  }

  const handleDeleteTask = async (id: string) => {
    try {
      setIsLoading(true)
      await taskApi.deleteTask(id)
      await fetchTasks()
      toast.success('Task deleted successfully')
    } catch (error) {
      toast.error('Failed to delete task')
    }
  }

  const handleToggleStatus = async (id: string, status: boolean) => {
    try {
      await taskApi.updateTask(id, { status: !status })
      await fetchTasks()
    } catch (error) {
      toast.error('Failed to update task status')
    }
  }

  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-[72px] h-[calc(100vh-72px)] overflow-auto hide-scrollbar">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold">My Tasks</h2>
          <Button className=' cursor-pointer' onClick={() => {
            setEditingTask(null)
            setIsDialogOpen(true)
          }}>
            Add Task
          </Button>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <div className='space-y-4'>
              <Skeleton className='w-full h-16'/>
              <Skeleton className='w-full h-16'/>
              <Skeleton className='w-full h-16'/>
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No tasks yet. Create your first task!</p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onToggle={handleToggleStatus}
                onEdit={(task) => {
                  setEditingTask(task)
                  setIsDialogOpen(true)
                }}
                onDelete={handleDeleteTask}
              />
            ))
          )}
        </div>
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingTask ? 'Edit Task' : 'Add New Task'}</DialogTitle>
          </DialogHeader>
          <TaskForm
            initialData={editingTask || undefined}
            onSubmit={async (data) => {
              if (editingTask) {
                await handleUpdateTask(editingTask._id, data)
              } else {
                await handleCreateTask(data as Task)
              }
            }}
            onCancel={() => setIsDialogOpen(false)}
            isLoading={isUpdating}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}