import { useEffect, useState } from "react";

function App() {
  const [tests, setTests] = useState([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", ""]);
  const [correct, setCorrect] = useState("");
  const [isAdmin, setIsAdmin] = useState(true); // admin true, foydalanuvchi false

  useEffect(() => {
    fetch("http://localhost:3001/tests")
      .then(res => res.json())
      .then(data => setTests(data));
  }, []);

  const addTest = () => {
    fetch("http://localhost:3001/tests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, options, correct })
    })
      .then(res => res.json())
      .then(data => {
        setTests([...tests, data.test]);
        setQuestion("");
        setOptions(["", "", ""]);
        setCorrect("");
      });
  };

  if (isAdmin) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Admin panel — Test qo‘shish</h1>
        <input
          placeholder="Savol"
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />
        {options.map((opt, i) => (
          <input
            key={i}
            placeholder={`Variant ${i + 1}`}
            value={opt}
            onChange={e => {
              const newOpts = [...options];
              newOpts[i] = e.target.value;
              setOptions(newOpts);
            }}
          />
        ))}
        <input
          placeholder="To‘g‘ri javob"
          value={correct}
          onChange={e => setCorrect(e.target.value)}
        />
        <button onClick={addTest}>Qo‘shish</button>

        <h2>Mavjud testlar</h2>
        {tests.map(t => (
          <div key={t.id}>
            {t.question} — {t.correct}
          </div>
        ))}
      </div>
    );
  }

  return <h2>Foydalanuvchi rejimi: testlarni bajarish</h2>;
}

export default App;
