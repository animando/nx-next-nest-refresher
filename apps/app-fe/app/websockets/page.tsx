import { WebsocketsClient } from './websockets-client';

const Page = async () => {
  return (
    <div>
      <h1 className="prose prose-h1">Websockets</h1>
      <WebsocketsClient />
    </div>
  );
};

export default Page;
