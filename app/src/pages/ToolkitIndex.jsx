import { Link } from 'react-router-dom';

export default function ToolkitIndex() {
  const tools = [
    {
      title: 'Liquidity Pool Demo',
      description: 'Interactive AMM simulation with constant product formula',
      path: '/toolkit/liquidity-pool'
    },
    // Add more tools as you build them
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Interactive Toolkit</h1>
        <div className="grid gap-4">
          {tools.map(tool => (
            <Link
              key={tool.path}
              to={tool.path}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-bold mb-2">{tool.title}</h2>
              <p className="text-gray-600">{tool.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}