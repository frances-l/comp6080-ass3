import React from 'react';

const AdminStartPage = () => {
  const handleStart = async () => {
    if (session.results.position === -1) {
      setCurrQuestion(session.results.questions[0]);
    }
    const results = await api.get(`admin/session/${sessionId}/status`, { headers: { Authorization: getToken() } });
    console.log(results);
    setStage('preview');
  };
};

export default AdminStartPage;
