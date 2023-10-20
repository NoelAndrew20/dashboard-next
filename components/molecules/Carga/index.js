import { useEffect } from 'react';
import { useRouter } from 'next/router';

const LoadingPage = () => {
  const router = useRouter();

  // Redirecciona a la página deseada después de 1 segundo (1000ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('../');
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <div className="loading-container">
      <StaticMeta
        title={title}
        description={description}
        image={image}
      />
      <video autoPlay loop muted className="background-video" playbackRate={3.0}>
        <source src="./images/Constanza.mp4" type="video/mp4" />
      </video>
      <style jsx>{`
        .loading-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .background-video {
          position: absolute;
          top: 0;
          left: 0;
          min-width: 100%;
          min-height: 100%;
          width: auto;
          height: auto;
          z-index: -1;
        }
      `}</style>
    </div>
  );
};

export default LoadingPage;
export const getServerSideProps = async () => {
    const title = "Constanza";
    const description = "Login de Constanza";
    const image = "images/icon/logo-400.png";
    return {
      props: {
        title,
        description,
        image,
      },
    };
};