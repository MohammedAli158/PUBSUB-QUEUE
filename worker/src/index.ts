import { createClient } from 'redis'
const client = createClient();
const publisher = createClient({
    url:"http://localhost:6380/"
});
async function main (){
    await client.connect();
    await publisher.connect()
    while(1){
        const res = await client.brPop("submissions",0);
        await new Promise((resolve)=>setTimeout(resolve,1000))
        console.log(res);
        publisher.publish("publish",JSON.stringify(res))
    }
}
main()