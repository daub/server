import test from 'ava'

import props from '../lib/props'

test('local props', t => {
  t.is(props.name.type, String)
  t.true(props.name.required)

  t.truthy(props.url)

  t.is(props.alternateName, String)
  t.is(props.description, String)
  t.is(props.disambiguatingDescription, String)
})
