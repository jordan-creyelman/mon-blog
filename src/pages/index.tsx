import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import BlogPostItems from '@theme/BlogPostItems';
import useBlogPosts from '@docusaurus/theme-classic/lib/theme/hooks/useBlogPosts';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  const {metadata, items} = useBlogPosts();

  return (
    <Layout title={siteConfig.title}>
      <main>
        <h1>Articles récents</h1>
        <BlogPostItems items={items.slice(0, 6)} /> {/* ✅ Affiche les 6 derniers articles */}
      </main>
    </Layout>
  );
}
