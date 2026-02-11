/**
 * TasksTab Component
 * Displays actionable tasks with checkboxes
 */

import React, { useState, useCallback } from 'react';

/**
 * Tasks tab component
 * @param {Object} props - Component props
 * @param {string[]} props.tasks - Array of task strings
 */
export function TasksTab({ tasks = [] }) {
  const [completedTasks, setCompletedTasks] = useState(new Set());

  /**
   * Toggles task completion status
   * @param {number} index - Task index
   */
  const toggleTask = useCallback((index) => {
    setCompletedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  /**
   * Clears all completed tasks
   */
  const clearCompleted = useCallback(() => {
    setCompletedTasks(new Set());
  }, []);

  /**
   * Marks all tasks as completed
   */
  const completeAll = useCallback(() => {
    setCompletedTasks(new Set(tasks.map((_, i) => i)));
  }, [tasks]);

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-8 h-8 text-gray-400" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No se encontraron tareas
        </h3>
        <p className="text-gray-500">
          El audio no contiene acciones específicas para realizar.
        </p>
      </div>
    );
  }

  const completedCount = completedTasks.size;
  const progress = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="space-y-4">
      {/* Header with progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Tareas Detectadas
          </h3>
          <p className="text-sm text-gray-500">
            {completedCount} de {tasks.length} completadas
          </p>
        </div>
        
        {/* Progress bar */}
        <div className="w-full sm:w-48">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-600">Progreso</span>
            <span className="font-medium text-primary-600">{progress}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tasks list */}
      <div className="space-y-2">
        {tasks.map((task, index) => {
          const isCompleted = completedTasks.has(index);
          
          return (
            <label
              key={index}
              className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                isCompleted 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-white border-gray-200 hover:border-primary-300'
              }`}
            >
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={() => toggleTask(index)}
                className="mt-1 w-5 h-5 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
              />
              <span className={`flex-1 ${isCompleted ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                {task}
              </span>
            </label>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
        <button
          onClick={completeAll}
          className="px-3 py-1.5 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
        >
          Marcar todas
        </button>
        <button
          onClick={clearCompleted}
          className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Desmarcar todas
        </button>
      </div>
    </div>
  );
}
