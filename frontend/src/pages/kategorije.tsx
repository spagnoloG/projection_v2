import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { KategorijaView } from 'src/sections/kategorija/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Kategorije - ${CONFIG.appName}`}</title>
      </Helmet>

      <KategorijaView />
    </>
  );
}
