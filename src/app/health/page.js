export const metadata = {
  title: "Health Check | My Portfolio",
  description: "Server-side data fetching demonstration.",
};

export default async function Health() {
  let data = null;
  let error = null;

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
      cache: 'no-store' // Ensure it fetches fresh on every request
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }
    
    data = await res.json();
  } catch (e) {
    error = e.message;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">Health Check</h1>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
          This page demonstrates Server Components and server-side data fetching in Next.js App Router.
        </p>
      </div>

      <div className="bg-card p-8 rounded-2xl border border-border shadow-sm">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-3 text-foreground">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          API Response Status: {error ? 'Error' : 'Healthy'}
        </h2>
        
        <div className="bg-secondary/50 rounded-lg p-6 border border-border/50 overflow-x-auto">
          {error ? (
            <div className="text-red-400">
              <p className="font-mono">Error: {error}</p>
            </div>
          ) : (
            <pre className="text-sm font-mono text-primary/90 whitespace-pre-wrap break-words">
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
