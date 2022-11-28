import GlobalStyles from "../styles/GlobalStyles";
import Layout from "../components/Layout";

function MyApp({Component, pageProps}) {
  return (
    <>
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
