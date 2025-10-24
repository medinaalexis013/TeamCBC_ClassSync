import { Navigate, useLocation } from 'react-router-dom'

export default function ProtectedRoute({ session, children }) {
  if (session === undefined) {
    return <div>Loading…</div>
  }
  if (!session) {
    return <Navigate to="/" replace />
  }
  return children
}
