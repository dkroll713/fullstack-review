import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    {props.repos.map(repo => {
      return <div className="repo">
        <div className="title"><a href={repo.url}>{repo.name}</a> <a href={repo.authorUrl}>{repo.author}</a></div>
        <p className="description">{repo.description}</p>
        <div className="times">Created at: {repo.createdAt} Last Updated: {repo.updatedAt}</div>
        <div className="counts">
          <p>Starred: {repo.starred}</p>
          <p>Watching: {repo.watchers}</p>
          <p>Forks: {repo.forks}</p>
        </div>
      </div>
    })}
  </div>
)

export default RepoList;