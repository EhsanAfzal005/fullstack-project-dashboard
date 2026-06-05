import { useState, useEffect } from 'react';
import { User, Mail, Lock } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';
import userService from '../services/userService';
import { getErrorMessage, formatDate } from '../utils/helpers';
import AvatarInitials from '../components/ui/AvatarInitials';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { FullPageSpinner } from '../components/common/Spinner';

export default function Profile() {
  const { user, updateUser, updateToken } = useAuth();
  
  const [profileData, setProfileData] = useState({ name: '', email: '' });
  const [profileLoading, setProfileLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData({ name: user.name, email: user.email });
    }
  }, [user]);

  if (!user) return <FullPageSpinner />;

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!profileData.name.trim() || !profileData.email.trim()) {
      toast.error('Name and email are required');
      return;
    }

    setProfileLoading(true);
    try {
      const res = await userService.updateProfile({
        name: profileData.name,
        email: profileData.email,
      });
      updateUser(res.data.data.user);
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (err) {
      toast.error(getErrorMessage(err));
      setProfileData({ name: user.name, email: user.email });
    } finally {
      setProfileLoading(false);
    }
  };

  const validatePassword = () => {
    const errors = {};
    if (!passwordData.currentPassword) errors.currentPassword = 'Required';
    if (!passwordData.newPassword) errors.newPassword = 'Required';
    else if (passwordData.newPassword.length < 6) errors.newPassword = 'Must be at least 6 characters';
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;

    setPasswordLoading(true);
    try {
      const res = await userService.updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      updateToken(res.data.data.token);
      toast.success('Password updated successfully');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setPasswordErrors({});
    } catch (err) {
      const msg = getErrorMessage(err);
      toast.error(msg);
      if (msg.toLowerCase().includes('current')) {
        setPasswordErrors({ currentPassword: msg });
      }
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Account Settings
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Manage your profile information and security preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card className="p-6 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <AvatarInitials
                name={user.name}
                profilePicture={user.profilePicture}
                size="xl"
                className="shadow-xl shadow-slate-200/50 dark:shadow-none"
              />
            </div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              {user.name}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              {user.email}
            </p>
            <div className="w-full flex items-center justify-between py-3 border-t border-slate-100 dark:border-slate-700/60 text-sm">
              <span className="text-slate-500 dark:text-slate-400">Member since</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {formatDate(user.createdAt)}
              </span>
            </div>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Personal Information
              </h3>
              {!isEditing && (
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <Input
                id="name"
                label="Full Name"
                icon={User}
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                disabled={!isEditing}
              />
              <Input
                id="email"
                type="email"
                label="Email Address"
                icon={Mail}
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                disabled={!isEditing}
              />
              
              {isEditing && (
                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setIsEditing(false);
                      setProfileData({ name: user.name, email: user.email }); // reset
                    }}
                    disabled={profileLoading}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" loading={profileLoading}>
                    Save Changes
                  </Button>
                </div>
              )}
            </form>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
              Change Password
            </h3>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <Input
                id="currentPassword"
                type="password"
                label="Current Password"
                icon={Lock}
                value={passwordData.currentPassword}
                onChange={(e) => {
                  setPasswordData({ ...passwordData, currentPassword: e.target.value });
                  if (passwordErrors.currentPassword) setPasswordErrors({ ...passwordErrors, currentPassword: null });
                }}
                error={passwordErrors.currentPassword}
              />
              <Input
                id="newPassword"
                type="password"
                label="New Password"
                icon={Lock}
                value={passwordData.newPassword}
                onChange={(e) => {
                  setPasswordData({ ...passwordData, newPassword: e.target.value });
                  if (passwordErrors.newPassword) setPasswordErrors({ ...passwordErrors, newPassword: null });
                }}
                error={passwordErrors.newPassword}
              />
              <Input
                id="confirmPassword"
                type="password"
                label="Confirm New Password"
                icon={Lock}
                value={passwordData.confirmPassword}
                onChange={(e) => {
                  setPasswordData({ ...passwordData, confirmPassword: e.target.value });
                  if (passwordErrors.confirmPassword) setPasswordErrors({ ...passwordErrors, confirmPassword: null });
                }}
                error={passwordErrors.confirmPassword}
              />
              
              <div className="flex justify-end pt-2">
                <Button type="submit" loading={passwordLoading}>
                  Update Password
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
