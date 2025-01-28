import { ReactNode, Suspense, lazy } from 'react';
const Loading = ({ children }: { children: ReactNode }) => <p>{children}</p>;

const ComponentOne = lazy(() => import('./component-one'));
const ComponentTwo = lazy(() => import('./component-two'));

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  return (
    <>
      <p>
        ISR {id} - {new Date().toISOString()}
      </p>
      <Suspense fallback={<Loading>Loading One</Loading>}>
        <ComponentOne />
      </Suspense>
      <ComponentTwo />
    </>
  );
};

export const revalidate = 60;

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const ids = ['pre-built'];

  return ids.map((id) => ({
    id,
  }));
}
export default Page;
