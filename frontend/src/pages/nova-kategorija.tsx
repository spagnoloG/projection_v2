import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { NovaKategorijaView } from 'src/sections/nova-kategorija/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Nova pesem - ${CONFIG.appName}`}</title>
      </Helmet>
      <NovaKategorijaView />
    </>
  );
}
