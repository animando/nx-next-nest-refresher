import { Counter } from './counter';

const Page = async () => {
  return (
    <div>
      <h1 className="prose prose-h1">Counter</h1>
      <Counter />
    </div>
  );
};

export default Page;
