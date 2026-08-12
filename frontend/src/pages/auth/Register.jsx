import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import ErrorMessage from '../../components/ErrorMessage';
import { registerStudent } from '../../services/authService';
import { validateRegister } from '../../utils/validation';

const initial = {
  fullName: '',
  age: '',
  classGrade: '',
  school: '',
  location: '',
  preferredLanguage: '',
  parentContact: '',
  username: '',
  password: '',
  confirmPassword: '',
};

export default function Register() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    setSuccess('');
    const v = validateRegister(form);
    setErrors(v);
    if (Object.keys(v).length) return;

    setLoading(true);
    try {
      await registerStudent(form);
      setSuccess('Registration successful. Redirecting to login...');
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setApiError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'fullName', label: 'Full Name' },
    { name: 'age', label: 'Age', type: 'number' },
    { name: 'classGrade', label: 'Class' },
    { name: 'school', label: 'School' },
    { name: 'location', label: 'Location' },
    { name: 'preferredLanguage', label: 'Preferred Language' },
    { name: 'parentContact', label: 'Parent/Guardian Contact' },
    { name: 'username', label: 'Username' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Card title="Student Registration" subtitle="Create an account to begin your learning journey.">
        <ErrorMessage message={apiError} />
        {success && (
          <div className="mb-4 border border-teal-300 bg-teal-50 px-4 py-3 text-sm text-teal-900">
            {success}
          </div>
        )}
        <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.name} className={f.name.includes('password') || f.name === 'username' ? 'sm:col-span-1' : ''}>
              <label className="mb-1 block text-sm font-medium text-stone-700">{f.label}</label>
              <input
                name={f.name}
                type={f.type || 'text'}
                value={form[f.name]}
                onChange={onChange}
                className="w-full border border-stone-300 bg-white px-3 py-2 text-sm focus:border-teal-600 focus:outline-none"
              />
              {errors[f.name] && <p className="mt-1 text-xs text-orange-700">{errors[f.name]}</p>}
            </div>
          ))}
          <div className="sm:col-span-2 flex flex-wrap items-center gap-3 pt-2">
            <Button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</Button>
            <Link to="/login" className="text-sm text-teal-800 hover:underline">Already registered? Login</Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
