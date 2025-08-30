import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/settings/application')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/settings/application"!</div>
}
