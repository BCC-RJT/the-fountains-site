import { createClient } from "@sanity/client";

export default function SanityTest({ success, error, data }) {
  if (error) {
    return (
      <div>
        <h1>❌ Sanity Connection Failed</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>✅ Sanity Connection Successful</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const client = createClient({
      projectId: process.env.SANITY_PROJECT_ID,
      dataset: process.env.SANITY_DATASET,
      apiVersion: "2023-01-01",
      useCdn: false,
      token: process.env.SANITY_API_TOKEN,
    });

    // Basic query - adjust to match something in your Sanity dataset
    const data = await client.fetch(`*[_type == "post"][0...3]`);

    return {
      props: {
        success: true,
        data,
      },
    };
  } catch (err) {
    return {
      props: {
        success: false,
        error: err.message,
      },
    };
  }
}
