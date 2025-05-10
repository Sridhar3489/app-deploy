import {client} from "@repo/db/client"

export default async function Home(){

  const user = await client.user.findFirst();

  return (<div>
    Hello there
    This is CD
    Running from new Server
    <div>{user?.username}</div>
    <div>{user?.password}</div>
  </div>)
  
}