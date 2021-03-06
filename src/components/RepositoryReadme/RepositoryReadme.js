import React, { useState, useCallback, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './RepositoryReadme.scss';
import { MdClose } from 'react-icons/md';

export default function RepositoryReadme({ repo, login, closeReadme }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [markdown, setMarkdown] = useState('');

  const loadReadme = useCallback(async (login, repo) => {
    setLoading(true);
    const uri = `https://api.github.com/repos/${login}/${repo}/readme`;
    const { download_url } = await fetch(uri).then((res) => res.json());
    let markdown;
    if (download_url) {
      markdown = await fetch(download_url).then((res) => res.text());
    } else {
      markdown = '## This repository has no README.md';
    }

    setMarkdown(markdown);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!repo || !login) return;
    loadReadme(login, repo).catch(setError);
  }, [repo, login, loadReadme]);

  if (error) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }

  if (loading) return <p className='readmeLoader'>Loading...</p>;

  return (
    <>
      <div className='repoModal__content'>
        <MdClose
          onClick={closeReadme}
          className='repoModal__content__closeIcon'
        />
        <ReactMarkdown source={markdown} />
      </div>
    </>
  );
}
