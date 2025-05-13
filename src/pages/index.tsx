import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useGlobalData from '@docusaurus/useGlobalData';
import Link from '@docusaurus/Link';

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const globalData = useGlobalData();
  const blogPosts = globalData['@docusaurus/plugin-content-blog']?.default?.posts || [];

  // Prendre les 6 articles les plus récents
  const latestPosts = blogPosts.slice(0, 6);

  return (
    <Layout title="Accueil" description="Bienvenue sur mon blog">
      <main style={{ padding: '2rem' }}>
        <h1>{siteConfig.title}</h1>
        <h2>Derniers articles</h2>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {latestPosts.map((post) => (
            <li key={post.id} style={{ marginBottom: '1.5rem' }}>
              <Link to={post.permalink}>
                <h3>{post.title}</h3>
              </Link>
              <p>{new Date(post.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>

        <Link to="/blog">Voir tous les articles →</Link>
      </main>
    </Layout>
  );
}
