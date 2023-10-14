import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { fireEvent, render, screen } from '@testing-library/react'
import App from "../../App"
import { Provider } from "react-redux"
import { setupStore } from "../../state/store"
import { setSearchStr } from "../../state/slices/searchSlice"
import { renderWithProviders } from '../../utils/test-utils'
import ResultContainer from './ResultContainer'
// We're using our own custom render function and not RTL's render.



// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
// export const handlers = [
//   rest.get('/api/user', (req, res, ctx) => {
//     return res(ctx.json({
//         kind: 'string',
//         totalItems: 2,
//         items: [{
//           id: '1',
//           title: 'title1',
//           authors: ['author'],
//           categories: ['author'],
//           imageLinks: ['author'],
//         },
//         {
//           id: '2',
//           title: 'title1',
//           authors: ['author'],
//           categories: ['author'],
//           imageLinks: ['author'],
//         }]
//       }), ctx.delay(150))
//   })
// ]

let response = {
  kind: 'string',
  totalItems: 2,
  items: [{
    id: '1',
    title: 'title1',
    authors: ['author'],
    categories: ['author'],
    imageLinks: ['author'],
  },
  {
    id: '2',
    title: 'title1',
    authors: ['author'],
    categories: ['author'],
    imageLinks: ['author'],
  }]
};

const server = setupServer(
  rest.get('/books', (req, res, ctx) => {
    return res(ctx.json(response))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('show books', async () => {

  const store = setupStore()
  render(<Provider store={store}><App/></Provider>)

  store.dispatch(setSearchStr('d'))

  fireEvent.keyDown(screen.getByPlaceholderText('Search...'), {key: 'Enter', code: 'Enter', charCode: 13})

console.log(store.getState())

  renderWithProviders(<Provider store={store}><ResultContainer/></Provider>)

  await screen.findByRole('ul')

  expect(screen.findByRole('ul')).toHaveTextContent('title1')
  // expect(screen.getByRole('button')).toBeDisabled()
})
