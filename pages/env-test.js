export default function EnvTest({ ok, pid, ds }) {
  return (
    <main style={{padding:20,fontFamily:'system-ui'}}>
      <h1>Env test</h1>
      <p>HAS SANITY_PROJECT_ID: {pid ? 'yes' : 'no'}</p>
      <p>HAS SANITY_DATASET: {ds ? 'yes' : 'no'}</p>
      {!ok && <p style={{color:'crimson'}}>Missing one or more env vars.</p>}
    </main>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      ok: !!(process.env.SANITY_PROJECT_ID && process.env.SANITY_DATASET),
      pid: !!process.env.SANITY_PROJECT_ID,
      ds: !!process.env.SANITY_DATASET,
    }
  };
}
