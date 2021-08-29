import React from "react";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="pageHeader">
      <h1>Tac Ops</h1>
      <ul>
        <li>
          <Link to="/browse">Browse tac ops cards</Link>
        </li>
        <li>
          <Link to="/create">Create new deck</Link>
        </li>
      </ul>
    </div>
  );
}
