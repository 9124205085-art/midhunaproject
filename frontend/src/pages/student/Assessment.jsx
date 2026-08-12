import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import { getQuestions, submitAssessment } from '../../services/assessmentService';

export default function Assessment() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getQuestions()
      .then((res) => setQuestions(res.data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load assessment.'))
      .finally(() => setLoading(false));
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const ordered = questions.map((q) => answers[q.id]);
    if (ordered.some((a) => !a)) {
      setError('All questions are mandatory. Please answer every question.');
      return;
    }
    setSubmitting(true);
    try {
      await submitAssessment(ordered);
      navigate('/student/recommendations');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit assessment.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Interest Assessment</h1>
      <p className="text-stone-600 mb-6">Answer all 5 questions so we can recommend the best skill for you.</p>
      <ErrorMessage message={error} />
      <form onSubmit={onSubmit} className="space-y-5">
        {questions.map((q) => (
          <Card key={q.id} title={`Question ${q.id}`}>
            <p className="mb-3 font-medium text-stone-800">{q.question}</p>
            <div className="space-y-2">
              {q.options.map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    checked={answers[q.id] === opt}
                    onChange={() => setAnswers({ ...answers, [q.id]: opt })}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </Card>
        ))}
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Assessment'}
        </Button>
      </form>
    </div>
  );
}
