import test from 'ava'

import props from '../lib/props'

test('local props', t => {
  t.is(props.name, String)
  t.is(props.url, String)
  t.is(props.alternateName, String)
  t.is(props.description, String)
  t.is(props.disambiguatingDescription, String)
})
