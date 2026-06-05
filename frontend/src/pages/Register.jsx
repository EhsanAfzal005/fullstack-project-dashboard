import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';
import { isValidEmail, getErrorMessage } from '../utils/helpers';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

export default function Register() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await register(formData.name, formData.email, formData.password);
      toast.success('Account created successfully!');
    } catch (err) {
      const message = getErrorMessage(err);
      toast.error(message);
      if (message.toLowerCase().includes('email')) {
        setErrors((prev) => ({ ...prev, email: message }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Create an account
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Start managing your projects today
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="name"
          type="text"
          label="Full name"
          placeholder="Ehsan Afzal"
          icon={User}
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          autoComplete="name"
        />

        <Input
          id="email"
          type="email"
          label="Email address"
          placeholder="name@example.com"
          icon={Mail}
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          autoComplete="email"
        />

        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="••••••••"
          icon={Lock}
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="new-password"
        />

        <Input
          id="confirmPassword"
          type="password"
          label="Confirm password"
          placeholder="••••••••"
          icon={Lock}
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          autoComplete="new-password"
        />

        <Button
          type="submit"
          className="w-full h-11 mt-6"
          loading={loading}
        >
          Create account
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
        >
          Sign in
        </Link>
      </div>
    </>
  );
}
