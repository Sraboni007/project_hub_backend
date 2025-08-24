import React, { useEffect, useState } from 'react';
import API from './services/api';

function App() {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [managerId, setManagerId] = useState('');

  // Fetch projects
  useEffect(() => {
    API.get('projects/')
      .then(res => setProjects(res.data))
      .catch(err => console.error('API error:', err));
  }, []);

  // Fetch users for manager dropdown
  useEffect(() => {
    API.get('users/')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Users API error:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !managerId) {
      alert('Please fill all fields.');
      return;
    }

    API.post('projects/', { title, description, manager: managerId })
      .then(res => {
        setProjects([...projects, res.data]);
        setTitle('');
        setDescription('');
        setManagerId('');
      })
      .catch(err => {
        console.error('Create project error:', err);
        alert('Failed to create project. Check console.');
      });
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">Projects</h1>

      {/* Project Form */}
      <form onSubmit={handleSubmit} className="mb-6 border p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Create New Project</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <select
          value={managerId}
          onChange={e => setManagerId(e.target.value)}
          className="border p-2 mb-2 w-full"
        >
          <option value="">Select Manager</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.username}</option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create Project
        </button>
      </form>

      {/* Project List */}
      {projects.length === 0 ? (
        <p>No projects found or API not reachable.</p>
      ) : (
        projects.map(project => (
          <div key={project.id} className="border p-3 mb-2 rounded">
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p>{project.description}</p>
            <p><strong>Manager:</strong> {project.manager_username}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
