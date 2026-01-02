import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Scrolly</h1>
      <ul>
        <li><Link href="/examples/pinned">Pinned example</Link></li>
      </ul>
    </main>
  );
}
