import {client} from "@repo/db/client"

export default async function Home(){

  const user = await client.user.findFirst();

  return (<div>
    Hello there
    <div>{user?.username}</div>
    <div>{user?.password}</div>
  </div>)
  
}