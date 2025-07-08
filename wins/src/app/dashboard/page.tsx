export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>User dashboard with history of generated guides will be here.</p>
      {/* Placeholder for guide history list */}
      <div className="mt-4">
        <h2 className="text-xl">My Guides</h2>
        <ul className="mt-2">
          <li className="p-2 border-b">Guide 1 - Meeting with Acme Corp - 2024-07-30</li>
          <li className="p-2 border-b">Guide 2 - Follow-up with Stark Industries - 2024-07-28</li>
        </ul>
      </div>
    </div>
  );
}
