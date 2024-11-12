import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import { PredvajajView } from 'src/sections/predvajaj/predvajaj-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{`Predvajaj - ${CONFIG.appName}`}</title>
        <style>{`
          body {
            background-color: black;
            color: white;
          }
        `}</style>
      </Helmet>
      <PredvajajView />
    </>
  );
}
