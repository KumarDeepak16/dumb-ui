import { InfoIcon } from "@phosphor-icons/react/ssr"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AlertDemo() {
  return (
    <Alert className="max-w-md">
      <InfoIcon />
      <AlertTitle>Build minutes reset on the 1st</AlertTitle>
      <AlertDescription>
        You have 1,240 of 6,000 minutes left this month.
      </AlertDescription>
    </Alert>
  )
}
