import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { PesemView } from 'src/sections/pesem/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Pesmi - ${CONFIG.appName}`}</title>
      </Helmet>

      <PesemView />
    </>
  );
}
