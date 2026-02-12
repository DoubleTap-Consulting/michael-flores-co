const tracks = [
  "Workflow orchestration and retries",
  "Sandboxed tool execution",
  "Human-in-the-loop checkpoints",
  "Observability for long-running agents"
];

export default function WorkflowHomePage() {
  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">Experimental Project</p>
        <h1>Agentic Workflow Lab</h1>
        <p>
          This app is the playground for building and validating agentic workflows
          powered by Vercel Sandboxes and workflow primitives.
        </p>
      </section>

      <section className="panel">
        <h2>Initial tracks</h2>
        <ul>
          {tracks.map((track) => (
            <li key={track}>{track}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
