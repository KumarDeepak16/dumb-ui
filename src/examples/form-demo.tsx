"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

const schema = z.object({
  handle: z
    .string()
    .min(3, "At least 3 characters.")
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and dashes only."),
  role: z.string({ error: "Pick a role." }).min(1, "Pick a role."),
  public: z.boolean(),
})

type Values = z.infer<typeof schema>

export default function FormDemo() {
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { handle: "", role: "", public: true },
  })

  function onSubmit(values: Values) {
    toast.success("Profile saved", {
      description: `@${values.handle} · ${values.role}`,
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full max-w-sm gap-5"
        noValidate
      >
        <FormField
          control={form.control}
          name="handle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Handle</FormLabel>
              <FormControl>
                <Input placeholder="deepak-kumar" leading="@" {...field} />
              </FormControl>
              <FormDescription>Shown on your public profile.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Engineer">Engineer</SelectItem>
                  <SelectItem value="Designer">Designer</SelectItem>
                  <SelectItem value="Product">Product</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="public"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between gap-4">
              <div className="grid gap-1.5">
                <FormLabel>Public profile</FormLabel>
                <FormDescription>Anyone with the link can view it.</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" loading={form.formState.isSubmitting}>
          Save profile
        </Button>
      </form>
    </Form>
  )
}
