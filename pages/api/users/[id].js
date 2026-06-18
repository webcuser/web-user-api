let users = [];

export default function handler(req, res) {
  const { id } = req.query;
  const userIndex = users.findIndex(user => user.id === id);
  if (req.method === 'GET') {
    if (userIndex >= 0) {
      return res.status(200).json(users[userIndex]);
    }
    return res.status(404).json({ message: 'User not found' });
  }
  if (req.method === 'PUT') {
    if (userIndex >= 0) {
      const { username, email, password } = req.body;
      users[userIndex] = { id, username, email, password }; // Update user
      return res.status(200).json(users[userIndex]);
    }
    return res.status(404).json({ message: 'User not found' });
  }
  if (req.method === 'DELETE') {
    if (userIndex >= 0) {
      users.splice(userIndex, 1); // Remove user
      return res.status(204).end();
    }
    return res.status(404).json({ message: 'User not found' });
  }
  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}