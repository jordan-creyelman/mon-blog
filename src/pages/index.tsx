import React from 'react';

type Article = {
  title: string;
  date: string;
  description: string;
};

const articles: Article[] = [
  {
    title: "Article 1",
    date: "2025-05-01",
    description: "Description de l'article 1.",
  },
  {
    title: "Article 2",
    date: "2025-04-28",
    description: "Description de l'article 2.",
  },
  {
    title: "Article 3",
    date: "2025-04-15",
    description: "Description de l'article 3.",
  },
  {
    title: "Article 4",
    date: "2025-04-10",
    description: "Description de l'article 4.",
  },
  {
    title: "Article 5",
    date: "2025-04-05",
    description: "Description de l'article 5.",
  },
  {
    title: "Article 6",
    date: "2025-04-01",
    description: "Description de l'article 6.",
  },
];

export default function Home(): JSX.Element {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Bienvenue sur le Blog</h1>
      <div>
        {articles.map((article, index) => (
          <div key={index} style={{ marginBottom: '1.5rem', borderBottom: '1px solid #ddd', paddingBottom: '1rem' }}>
            <h2>{article.title}</h2>
            <p><strong>Date:</strong> {article.date}</p>
            <p>{article.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
