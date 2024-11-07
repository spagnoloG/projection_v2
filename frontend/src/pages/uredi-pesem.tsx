import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { UrediPesemView } from 'src/routes/uredi-pesem/view';


// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Nova pesem - ${CONFIG.appName}`}</title>
      </Helmet>
      <UrediPesemView />
    </>
  );
}
