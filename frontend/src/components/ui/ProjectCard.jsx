import { Pencil, Trash2, Calendar } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { formatDate, truncateText } from '../../utils/helpers';

export default function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <Card hover className="p-6 flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white truncate">
          {project.title}
        </h3>
        <Badge status={project.status} />
      </div>

      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 flex-1 leading-relaxed">
        {truncateText(project.description, 120) || (
          <span className="italic text-slate-400 dark:text-slate-500">No description</span>
        )}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700/50">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
          <Calendar className="h-3.5 w-3.5" />
          {formatDate(project.createdAt)}
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => onEdit(project)}
            className="rounded-lg p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-400 transition-colors"
            aria-label="Edit project"
            id={`edit-project-${project._id}`}
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(project)}
            className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 transition-colors"
            aria-label="Delete project"
            id={`delete-project-${project._id}`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}
