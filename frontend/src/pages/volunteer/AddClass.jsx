import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import ErrorMessage from '../../components/ErrorMessage';
import { createClass } from '../../services/volunteerService';

const SKILLS = ['Abacus', 'Coding', 'Communication Skills', 'Logical Reasoning'];
const DAYS = ['Saturday', 'Sunday', 'Holiday'];

const initial = {
  skill: 'Abacus',
  date: '',
  day: 'Saturday',
  time: '',
  communityCentre: '',
  volunteerName: '',
  availableSeats: 15,
};

export default function AddClass() {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (
      !form.skill ||
      !form.date ||
      !form.day ||
      !form.time.trim() ||
      !form.communityCentre.trim() ||
      !form.volunteerName.trim() ||
      Number(form.availableSeats) < 1
    ) {
      setError('All fields are required. Seats must be greater than 0.');
      return;
    }

    setLoading(true);
    try {
      await createClass({
        skill: form.skill,
        date: form.date,
        day: form.day,
        time: form.time,
        communityCentre: form.communityCentre,
        volunteerName: form.volunteerName,
        availableSeats: Number(form.availableSeats),
        title: `${form.skill} Workshop`,
      });
      navigate('/volunteer/classes', {
        state: { message: 'Community class created successfully.' },
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create class. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-3xl font-bold text-stone-900 mb-6">Add Community Class</h1>
      <Card className="rounded-xl">
        <ErrorMessage message={error} />
        <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium">Course / Skill</label>
            <select
              name="skill"
              value={form.skill}
              onChange={onChange}
              className="w-full border border-stone-300 px-3 py-2 text-sm"
            >
              {SKILLS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={onChange}
              className="w-full border border-stone-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Day</label>
            <select
              name="day"
              value={form.day}
              onChange={onChange}
              className="w-full border border-stone-300 px-3 py-2 text-sm"
            >
              {DAYS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium">Time</label>
            <input
              name="time"
              placeholder="10:00 AM - 11:00 AM"
              value={form.time}
              onChange={onChange}
              className="w-full border border-stone-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Community Centre</label>
            <input
              name="communityCentre"
              value={form.communityCentre}
              onChange={onChange}
              className="w-full border border-stone-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Volunteer Name</label>
            <input
              name="volunteerName"
              value={form.volunteerName}
              onChange={onChange}
              className="w-full border border-stone-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Available Seats</label>
            <input
              type="number"
              min="1"
              name="availableSeats"
              value={form.availableSeats}
              onChange={onChange}
              className="w-full border border-stone-300 px-3 py-2 text-sm"
            />
          </div>
          <div className="sm:col-span-2 flex flex-wrap gap-3 pt-2">
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating class...' : 'CREATE CLASS'}
            </Button>
            <Link to="/volunteer/classes">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
