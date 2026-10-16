# Gestion simple d'utilisateurs

Application Next.js avec Prisma et une base MySQL locale fournie par XAMPP.

## Configuration XAMPP en local

1. Démarrez les modules **Apache** et **MySQL** dans XAMPP.
2. Ouvrez `http://localhost/phpmyadmin` et créez une base appelée `users_db`.
3. Vérifiez que `.env` contient :

```env
DATABASE_URL="mysql://root:@127.0.0.1:3306/users_db"
```

Si votre utilisateur MySQL possède un mot de passe, remplacez la partie vide après `root:`.
4. Générez le client Prisma et créez la table `User` :

```bash
npm run db:generate
npm run db:push
```

Pour le déploiement, remplacez ensuite `DATABASE_URL` par l’URL MySQL de votre hébergeur.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
