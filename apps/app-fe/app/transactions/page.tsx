import { Metadata } from 'next';
import { TransactionsContainer } from './transactions-container';

const Page = async () => {
  return (
    <div>
      <h1 className="prose prose-h1">Transactions</h1>
      <TransactionsContainer />
    </div>
  );
};

export default Page;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Some Title',
  };
}
