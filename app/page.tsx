"use client";

import { FormEvent, useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then(setUsers)
      .catch(() => setMessage("Impossible de charger les utilisateurs."));
  }, []);

  async function addUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error);
      return;
    }

    setUsers((currentUsers) => [data, ...currentUsers]);
    setName("");
    setEmail("");
    setMessage("Utilisateur ajouté.");
  }

  return (
    <main className="page-shell">
      <section className="panel">
        <p className="eyebrow">Prisma + SQLite</p>
        <h1>Mes utilisateurs</h1>
        <p className="intro">
          Ajoutez simplement des utilisateurs dans votre base de données locale.
        </p>

        <form onSubmit={addUser} className="user-form">
          <label>
            Nom
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Alice Martin"
              required
            />
          </label>
          <label>
            E-mail
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="alice@example.com"
              required
            />
          </label>
          <button type="submit">Ajouter</button>
        </form>

        {message && <p className="message">{message}</p>}

        <div className="user-list">
          <h2>Utilisateurs enregistrés</h2>
          {users.length === 0 ? (
            <p className="empty">Aucun utilisateur pour le moment.</p>
          ) : (
            users.map((user) => (
              <div className="user-row" key={user.id}>
                <strong>{user.name}</strong>
                <span>{user.email}</span>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
