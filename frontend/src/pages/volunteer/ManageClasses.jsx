import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import { createClass, deleteClass, getClasses, updateClass } from '../../services/classService';
import { getVolunteerDashboard } from '../../services/volunteerService';
import { DAYS } from '../../utils/constants';

const emptyForm = {
  courseId: '',
  date: '',
  day: 'Saturday',
  time: '',
  communityCentre: '',
  location: '',
  volunteerName: '',
  availableSeats: 10,
};

export default function ManageClasses() {
  const [classes, setClasses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const [classRes, dashRes] = await Promise.all([getClasses(), getVolunteerDashboard()]);
      setClasses(classRes.data);
      setCourses(dashRes.data.courses || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load classes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      if (editingId) {
        await updateClass(editingId, {
          date: form.date,
          day: form.day,
          time: form.time,
          communityCentre: form.communityCentre,
          location: form.location,
          volunteerName: form.volunteerName,
          availableSeats: Number(form.availableSeats),
        });
      } else {
        await createClass({
          ...form,
          availableSeats: Number(form.availableSeats),
        });
      }
      setForm(emptyForm);
      setEditingId(null);
      await load();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save class.');
    } finally {
      setSaving(false);
    }
  };

  const onEdit = (c) => {
    setEditingId(c._id);
    setForm({
      courseId: c.course?._id || c.course || '',
      date: c.date,
      day: c.day,
      time: c.time,
      communityCentre: c.communityCentre,
      location: c.location,
      volunteerName: c.volunteerName,
      availableSeats: c.availableSeats,
    });
  };

  const onDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this class?')) return;
    setError('');
    try {
      await deleteClass(id);
      await load();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete class.');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Community Classes</h1>
      <ErrorMessage message={error} />

      <Card className="mb-8" title={editingId ? 'Edit Class' : 'Add Class'}>
        <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-2">
          {!editingId && (
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium">Course / Skill</label>
              <select
                name="courseId"
                required
                value={form.courseId}
                onChange={onChange}
                className="w-full border border-stone-300 px-3 py-2 text-sm"
              >
                <option value="">Select course</option>
                {courses.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm font-medium">Date</label>
            <input name="date" required type="date" value={form.date} onChange={onChange} className="w-full border border-stone-300 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Day</label>
            <select name="day" value={form.day} onChange={onChange} className="w-full border border-stone-300 px-3 py-2 text-sm">
              {DAYS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Time</label>
            <input name="time" required placeholder="10:00 AM - 11:00 AM" value={form.time} onChange={onChange} className="w-full border border-stone-300 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Community Centre</label>
            <input name="communityCentre" required value={form.communityCentre} onChange={onChange} className="w-full border border-stone-300 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Location</label>
            <input name="location" required value={form.location} onChange={onChange} className="w-full border border-stone-300 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Volunteer Name</label>
            <input name="volunteerName" required value={form.volunteerName} onChange={onChange} className="w-full border border-stone-300 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Available Seats</label>
            <input name="availableSeats" required type="number" min="0" value={form.availableSeats} onChange={onChange} className="w-full border border-stone-300 px-3 py-2 text-sm" />
          </div>
          <div className="sm:col-span-2 flex gap-3">
            <Button type="submit" disabled={saving}>{saving ? 'Saving...' : editingId ? 'Update Class' : 'Add Class'}</Button>
            {editingId && (
              <Button type="button" variant="outline" onClick={() => { setEditingId(null); setForm(emptyForm); }}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Card>

      <div className="space-y-3">
        {classes.map((c) => (
          <Card key={c._id}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg">{c.skill}</h3>
                <p className="text-sm text-stone-600">{c.day} · {c.date} · {c.time}</p>
                <p className="text-sm text-stone-600">{c.communityCentre} ({c.location})</p>
                <p className="text-sm text-stone-600">Volunteer: {c.volunteerName} · Seats: {c.availableSeats}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => onEdit(c)}>Edit</Button>
                <Button variant="danger" onClick={() => onDelete(c._id)}>Delete</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
