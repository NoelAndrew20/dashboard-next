import Head from 'next/head';

const StaticMeta = ({ description, image, title }) => {
  return (
    <Head>
      {/* General tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {image !== '' && <meta name="image" content={image} />}
      <link rel="icon" href="images/icon/logo_color.png" />
      {/* OpenGraph tags */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image !== '' && <meta property="og:image" content={image} />}
    </Head>
  );
};

export default StaticMeta;
