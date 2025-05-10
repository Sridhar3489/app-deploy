
### Boostrapping monorepo project
- `npm install -g pnpm` - Installing pnpm
- `npx create-turbo@latest` - Creating a monorepo project

### DB Setup
- Create a `prisma` package (db) in packages folder
- Create `package.json` using `npm init -y` and `tsconfig.json`
- Change the name in `package.json` from `prisma` to `@repo/db`
- In `tsconfig.json`, extend the `base.json` from packages/typescript-config
- Add `@repo/typescript-config` as devDependency / dependency in `package.json`
- `workspace:*` if using pnpm, `*` if using npm or yarn
- `pnpm install` in the prisma package, to include the devDependency
- `pnpm add prisma` - adding prisma
- `npx prisma init` - this will initialize `prisma/schema.prisma` folder, where we configure our db and define all our schemas
- Comment out `output` section in `generator client` section in `prisma/schema.prisma`
- `npx prisma format` - formatting the schema.prisma file
- `npx prisma migrate dev` - migrating prisma db (creating tables) and it also generates prisma client
- `npx prisma generate` - creates prisma client to work with (client is a way to work with db)
- Export the prisma client from the prisma package to be used in backend apps
- Create a `src` folder and create an `index.ts` file to export the prisma client
- Export the prisma client through package.json
```JS
exports : {
    "./client" : "./src/index.ts"
}
```
- This client can be imported in app packages as `import {client} from "@repo/db/client";`


### Backend Setup (http-backend & ws-backend)
- Create 2 packages called `http-backend` and `ws-backend`
- Create empty `tsconfig.json` and `package.json`
- Extend tsconfig.json from @repo/typescript-config/base.json and extend compilerOptions for rootDir and outDir
```JS
{
    "extends" : "@repo/typescript-config/base.json",
    "compilerOptions": {
        "rootDir": "./src",
        "outDir": "./dist"
    }
}
```
- Add prisma as devDependency in package.json
```JS
"@repo/db": "workspace:*",
```
- Add scripts in package.json
```JS
"scripts": {
    "build" : "tsc -b",
    "start": "node dist/index.js",
    "dev": "npm run build && npm run start"
  }
```
- Import prisma client from @repo/db/client
- `pnpm add ws @types/ws`
- Create a basic ws server, such that it creates a new user into DB whenever a user connects to ws

### Frontend
- Fetch the first user details from db and show it in the webpage


### Deployment
- dev and prod environments
- Create a new key pair using ssh-keygen
- Create 2 servers called dev and prod
- SSH into machine - `ssh -i ~/.ssh/do_temp username@IP`
- Copying bash script from local to remote machine - `scp -i ~/.ssh/do_temp sourceDirectory/file username@publicIPv4:pathToSaveTheFile`
- `npm run build`
- `npm run start`
- `pm2` or `forever`
- `pm2 start npm --name "http-server" -- start`
- `pm2 stop http-server`
- `pm2 list` - list of all process running by pm2
- `pm2 logs ${id}` - to check logs
- Create nginx.conf files in both dev and prod environments and reload nginx using - `sudo systemctl reload nginx`
- Deleting stopped or errored pm2 processes - `pm2 ls | awk '/stopped|errored/ {print $2}' | xargs -r pm2 delete`