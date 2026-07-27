type Props = {
  params: Promise<{
    test: string;
  }>
}

export default async function BlogPage({ params }: Props) {
  const { test } = await params;

  return (
    <>
      <h1>Blog</h1>
      <p>{test}</p>
    </>
  );
}