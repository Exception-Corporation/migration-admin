import { useRouter } from 'next/router';
import { ReactElement } from 'react';

export default function Link({
  to,
  children
}: {
  to: string;
  children: Array<ReactElement> | ReactElement | string;
}) {
  const router = useRouter();

  const go = (path: string) => {
    router.push(path);
  };
  return (
    <a
      onClick={() => {
        go(to);
      }}
    >
      {children}
    </a>
  );
}
