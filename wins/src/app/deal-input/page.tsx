export default function DealInputPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Create New Conversation Guide</h1>
      <p>Form for deal input and meeting context will be here.</p>
      {/* Basic form structure */}
      <form className="mt-4 space-y-6">
        <div>
          <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">Contact Name</label>
          <input type="text" name="contactName" id="contactName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
          <input type="text" name="companyName" id="companyName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="salesStage" className="block text-sm font-medium text-gray-700">Sales Stage</label>
          <select id="salesStage" name="salesStage" className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option>Discovery</option>
            <option>Qualification</option>
            <option>Proposal</option>
            <option>Negotiation</option>
            <option>Closed Won</option>
            <option>Closed Lost</option>
          </select>
        </div>
        <div>
          <label htmlFor="meetingContext" className="block text-sm font-medium text-gray-700">Meeting Context / Objectives</label>
          <textarea id="meetingContext" name="meetingContext" rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
        </div>
        <div className="mt-6">
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Generate Guide
          </button>
        </div>
      </form>
    </div>
  );
}
