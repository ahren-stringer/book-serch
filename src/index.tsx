import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { setupStore } from './state/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import DetailPageContainer from './components/DetailPage/DetailPageContainer';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ResultContainer from './components/Result/ResultContainer';

const container = document.getElementById('root')!;
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorMessage errorMessage='404 страница не найдена' />,
    children: [
      {
        index: true,
        element: <ResultContainer />
      },
      {
        path: 'books/:bookId',
        element: <DetailPageContainer />
      },
    ],
  },
])


root.render(
  <React.StrictMode>
    <Provider store={setupStore()}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(  g))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
