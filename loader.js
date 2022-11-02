import { getClient } from './transporter';


async function dispatcher(action) {
    const client = await getClient();
    const { path, payload, headers } = action;
    console.log('sending message...');
    const data = await client.send(path, { context: headers, payload }).toPromise();
    console.log('sent message...', data);
    return data;
}


dispatcher({ path: 'iam:iam:get', payload: 10 }).then((data) => console.log('HERE', data)).catch(console.error);