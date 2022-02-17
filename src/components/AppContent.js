import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

// routes config
import routes from '../routes'

const AppContent = () => {
  return (
    <Container >
      <Suspense fallback={<CircularProgress color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element= <route.component />
                />
              )
            )
          })}
          <Route from="*" to="/dashboard" />
        </Routes>
      </Suspense>
    </Container>
  )
}

export default React.memo(AppContent)
