import { useState, useEffect, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import projectService from '../services/projectService';
import { getErrorMessage } from '../utils/helpers';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import EmptyState from '../components/common/EmptyState';
import { SkeletonCard } from '../components/common/Skeleton';
import SearchBar from '../components/ui/SearchBar';
import StatusFilter from '../components/ui/StatusFilter';
import ProjectCard from '../components/ui/ProjectCard';
import Pagination from '../components/ui/Pagination';
import { PROJECT_STATUSES, SORT_OPTIONS, DEFAULT_PAGE_SIZE } from '../utils/constants';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
  });

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState('desc');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', status: 'Pending' });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await projectService.getAll({
        page: pagination.currentPage,
        limit: DEFAULT_PAGE_SIZE,
        search,
        status,
        sort,
        order,
      });
      setProjects(res.data.data.projects);
      setPagination(res.data.data.pagination);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [pagination.currentPage, search, status, sort, order]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleSearch = (term) => {
    setSearch(term);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleStatusChange = (val) => {
    setStatus(val);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const openCreateModal = () => {
    setCurrentProject(null);
    setFormData({ title: '', description: '', status: 'Pending' });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setCurrentProject(project);
    setFormData({
      title: project.title,
      description: project.description || '',
      status: project.status,
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const openDeleteConfirm = (project) => {
    setCurrentProject(project);
    setIsConfirmOpen(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Title is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      if (currentProject) {
        await projectService.update(currentProject._id, formData);
        toast.success('Project updated successfully');
      } else {
        await projectService.create(formData);
        toast.success('Project created successfully');
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setSubmitting(true);
    try {
      await projectService.delete(currentProject._id);
      toast.success('Project deleted successfully');
      setIsConfirmOpen(false);
      if (projects.length === 1 && pagination.currentPage > 1) {
        setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
      } else {
        fetchProjects();
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Projects
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage and track all your projects in one place.
          </p>
        </div>
        <Button onClick={openCreateModal} icon={Plus}>
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div className="sm:col-span-6 lg:col-span-8">
          <SearchBar onSearch={handleSearch} placeholder="Search projects by title..." />
        </div>
        <div className="sm:col-span-3 lg:col-span-2">
          <StatusFilter value={status} onChange={handleStatusChange} />
        </div>
        <div className="sm:col-span-3 lg:col-span-2">
          <select
            value={sort}
            onChange={handleSortChange}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                Sort by {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : projects.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onEdit={openEditModal}
                onDelete={openDeleteConfirm}
              />
            ))}
          </div>
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={(page) => setPagination((prev) => ({ ...prev, currentPage: page }))}
          />
        </>
      ) : (
        <div className="mt-12 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm">
          <EmptyState
            title={search || status ? 'No matching projects found' : 'No projects yet'}
            description={
              search || status
                ? 'Try adjusting your search or filters to find what you are looking for.'
                : 'Get started by creating your first project.'
            }
            actionLabel={!search && !status ? 'Create Project' : 'Clear Filters'}
            onAction={
              !search && !status
                ? openCreateModal
                : () => {
                    setSearch('');
                    setStatus('');
                  }
            }
          />
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentProject ? 'Edit Project' : 'Create New Project'}
      >
        <form onSubmit={handleFormSubmit} className="space-y-5">
          <Input
            id="title"
            label="Project Title"
            value={formData.title}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, title: e.target.value }));
              if (formErrors.title) setFormErrors({ ...formErrors, title: null });
            }}
            error={formErrors.title}
            placeholder="e.g. Website Redesign"
            autoFocus
          />

          <div className="space-y-1.5">
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Description <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 resize-none"
              placeholder="Briefly describe the project goals..."
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="status" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Status
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
            >
              {PROJECT_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={submitting}>
              {currentProject ? 'Save Changes' : 'Create Project'}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Project"
        message={`Are you sure you want to delete "${currentProject?.title}"? This action cannot be undone and will remove all associated data.`}
        loading={submitting}
      />
    </div>
  );
}
