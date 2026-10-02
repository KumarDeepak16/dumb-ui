import {
  CheckCircleIcon,
  InfoIcon,
  WarningIcon,
  XCircleIcon,
} from "@phosphor-icons/react/ssr"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AlertVariants() {
  return (
    <div className="grid w-full max-w-md gap-3">
      <Alert>
        <InfoIcon />
        <AlertTitle>Maintenance on Sunday</AlertTitle>
        <AlertDescription>Builds may queue for up to 10 minutes.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <CheckCircleIcon />
        <AlertTitle>Domain verified</AlertTitle>
        <AlertDescription>ui.1619.in now serves production.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <WarningIcon />
        <AlertTitle>Certificate expires in 6 days</AlertTitle>
        <AlertDescription>Renewal runs automatically unless DNS changed.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <XCircleIcon />
        <AlertTitle>Build failed</AlertTitle>
        <AlertDescription>Type error in app/checkout/page.tsx:42.</AlertDescription>
      </Alert>
    </div>
  )
}
