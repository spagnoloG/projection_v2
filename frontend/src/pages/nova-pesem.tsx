import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { NovaPesemView } from 'src/sections/nova-pesem/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Nova pesem - ${CONFIG.appName}`}</title>
      </Helmet>
      <NovaPesemView />
    </>
  );
}
